// app/components/TourCard.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import type { Tour } from "../lib/tours"; // ✅ RELATIVE PATH// 👈 use relative path to avoid alias issues

export default function TourCard({ tour }: { tour: Tour }) {
    return (
        <Link
            href={`/tours/${tour.slug}`}
            className="group block rounded-xl overflow-hidden border border-gray-200 hover:shadow-md transition"
            aria-label={`Open ${tour.title} details`}
        >
            <div className="relative h-56 w-full">
                <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    priority
                />
                <div className="absolute bottom-2 right-2 rounded bg-black/50 px-2 py-1 text-xs text-white">
                    Tap to view details
                </div>
            </div>

            <div className="p-4">
                <h3 className="text-lg font-semibold">{tour.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                    {tour.location} • {tour.duration}
                </p>
                <p className="mt-2 font-medium">{tour.price}</p>
            </div>
        </Link>
    );
}
