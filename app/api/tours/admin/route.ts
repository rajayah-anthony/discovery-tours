// app/api/tours/admin/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/** GET /api/tours/admin — demo admin list */
export async function GET(
    _req: NextRequest,
    context: { params: Promise<Record<string, never>> }
) {
    // The generator types params as a Promise — await it to satisfy types.
    await context.params;

    const items = [
        {
            slug: "kinabalu-sunrise-hike",
            title: "Kinabalu Sunrise Hike",
            location: "Kundasang, Sabah",
            duration: "Full Day",
            price: "RM350",
            status: "active",
        },
        {
            slug: "klias-river-cruise",
            title: "Klias River Cruise (Proboscis)",
            location: "Beaufort, Sabah",
            duration: "Half Day (PM)",
            price: "RM180",
            status: "draft",
        },
    ];

    return NextResponse.json({ ok: true, count: items.length, items });
}

/** POST /api/tours/admin — demo create (echo) */
export async function POST(
    req: NextRequest,
    context: { params: Promise<Record<string, never>> }
) {
    await context.params;

    const body = await req.json().catch(() => ({}));
    // In a real app you’d validate & write to DB. Here we just echo back.
    return NextResponse.json({ ok: true, created: body }, { status: 201 });
}
