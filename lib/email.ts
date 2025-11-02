// lib/email.ts
import nodemailer from "nodemailer";

/**
 * Create or return a Nodemailer transport.
 * In demo mode or when SMTP vars are missing, it will simulate sending.
 */
export function getTransport() {
    // 🧩 DEMO / DEV MODE: disable real email sending
    if (process.env.NEXT_PUBLIC_IS_DEMO === "true") {
        console.log("🧩 Demo mode: emails will not be sent (simulated).");
        return {
            sendMail: async (opts: any) => {
                console.log("📩 Simulated email:", {
                    subject: opts.subject,
                    to: opts.to,
                    replyTo: opts.replyTo,
                });
                return Promise.resolve();
            },
        } as any;
    }

    // 🧩 Validate SMTP credentials
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.warn("⚠️ SMTP environment variables are missing – emails disabled.");
        return {
            sendMail: async () => {
                console.log("📩 Simulated email (no SMTP vars set).");
                return Promise.resolve();
            },
        } as any;
    }

    // 🧩 Create actual transport for production
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true", // use true for 465, false for 587
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
}

/**
 * Send a contact email. Will gracefully no-op in demo/dev mode.
 */
export async function sendContactEmail({
    to,
    from,
    subject,
    html,
    replyTo,
}: {
    to: string;
    from: string;
    subject: string;
    html: string;
    replyTo?: string;
}) {
    const transporter = getTransport();

    try {
        await transporter.sendMail({
            to,
            from,
            subject,
            html,
            replyTo,
        });
        console.log(`✅ Email sent: ${subject}`);
    } catch (err) {
        console.error("❌ Email send failed:", err);
        throw err;
    }
}
