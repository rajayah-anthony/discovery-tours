// app/api/tours/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * GET /api/tours — list all tours (demo data)
 */
export async function GET(
    _req: NextRequest,
    context: { params: Promise<Record<string, never>> }
) {
    // The generator expects params as a Promise; await it to satisfy typing
    await context.params;

    const tours = [
        {
            slug: "kinabalu-sunrise-hike",
            title: "Kinabalu Sunrise Hike",
            location: "Kundasang, Sabah",
            duration: "Full Day",
            price: "RM350",
            tags: ["Adventure", "Nature"],
        },
        {
            slug: "klias-river-cruise",
            title: "Klias River Cruise (Proboscis Monkey)",
            location: "Beaufort, Sabah",
            duration: "Half Day (PM)",
            price: "RM180",
            tags: ["Wildlife", "Family"],
        },
    ];

    return NextResponse.json(tours);
}

/**
 * POST /api/tours — create new tour (demo echo)
 */
export async function POST(
    req: NextRequest,
    context: { params: Promise<Record<string, never>> }
) {
    await context.params;

    const data = await req.json().catch(() => ({}));
    return NextResponse.json({ message: "New tour created (demo)", data });
}
