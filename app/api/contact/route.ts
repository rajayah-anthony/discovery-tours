// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

const SITE_NAME = process.env.SITE_NAME ?? "Discovery Tours";
const CONTACT_TO = process.env.CONTACT_TO ?? "hello@example.com";
const CONTACT_FROM = process.env.CONTACT_FROM ?? "no-reply@example.com";

// Basic memory limiter (per process). For stronger limits, use upstash-ratelimit.
const recent = new Map<string, number>(); // ip -> timestamp

export async function POST(req: Request) {
    try {
        const ip =
            (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() ||
            "unknown";

        // 1 request / 15s per IP (very light)
        const now = Date.now();
        const last = recent.get(ip) ?? 0;
        if (now - last < 15_000) {
            return NextResponse.json(
                { ok: false, error: "Please wait a moment before trying again." },
                { status: 429 }
            );
        }

        const data = await req.json();
        const parsed = contactSchema.safeParse(data);

        if (!parsed.success) {
            return NextResponse.json(
                { ok: false, error: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { name, email, phone, tour, date, message, honeypot, startedAt } =
            parsed.data;

        // Honeypot + time trap (form should take > 3s to fill)
        if (honeypot && honeypot.length > 0) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }
        if (startedAt && now - startedAt < 3000) {
            return NextResponse.json({ ok: true }, { status: 200 });
        }

        const subject = `[${SITE_NAME}] New enquiry${tour ? `: ${tour}` : ""}`;
        const html = `
      <div style="font-family:ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial;">
        <h2 style="margin:0 0 8px">${SITE_NAME} — Contact Form</h2>
        <p style="margin:0 0 16px;color:#444">You have a new enquiry.</p>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse;background:#fafafa;width:100%">
          <tr><td style="width:160px;font-weight:600">Name</td><td>${escapeHtml(name)}</td></tr>
          <tr><td style="font-weight:600">Email</td><td>${escapeHtml(email)}</td></tr>
          ${phone ? `<tr><td style="font-weight:600">Phone</td><td>${escapeHtml(phone)}</td></tr>` : ""}
          ${tour ? `<tr><td style="font-weight:600">Tour</td><td>${escapeHtml(tour)}</td></tr>` : ""}
          ${date ? `<tr><td style="font-weight:600">Preferred Date</td><td>${escapeHtml(date)}</td></tr>` : ""}
          <tr><td style="font-weight:600;vertical-align:top">Message</td><td><pre style="white-space:pre-wrap;margin:0">${escapeHtml(
            message
        )}</pre></td></tr>
          <tr><td style="font-weight:600">Submitted</td><td>${new Date().toLocaleString()}</td></tr>
          <tr><td style="font-weight:600">IP</td><td>${escapeHtml(ip)}</td></tr>
        </table>
      </div>
    `;

        await sendContactEmail({
            to: CONTACT_TO,
            from: CONTACT_FROM,
            subject,
            html,
            replyTo: email,
        });

        recent.set(ip, now);
        return NextResponse.json({ ok: true });
    } catch (err: any) {
        console.error("Contact error:", err);
        return NextResponse.json(
            { ok: false, error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}

function escapeHtml(s: string) {
    return s
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}
