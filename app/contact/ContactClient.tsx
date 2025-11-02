"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import ContactForm from "@/components/ContactForm";

export default function ContactClient() {
    // Next.js App Router guarantees this exists at runtime
    const searchParams = useSearchParams()!;
    const defaultTour = searchParams.get("tour") ?? "";

    const tours = useMemo(
        () => [
            { label: "Kinabalu Sunrise Hike", value: "kinabalu-sunrise-hike" },
            { label: "Klias River Cruise (Proboscis)", value: "klias-river-cruise" },
            // Add more tours as needed
        ],
        []
    );

    return (
        <ContactForm
            tours={tours}
            defaultTour={defaultTour}
            className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200"
        />
    );
}
