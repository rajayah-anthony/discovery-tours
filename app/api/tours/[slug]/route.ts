// app/api/tours/[slug]/route.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
    _req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    const { slug } = await context.params; // 👈 await because validator types params as a Promise

    // Demo payload
    const tour = {
        slug,
        title: "Kinabalu Sunrise Hike",
        location: "Kundasang, Sabah",
        duration: "Full Day",
        price: "RM350",
    };

    return NextResponse.json(tour);
}
