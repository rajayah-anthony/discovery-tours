// app/destinations/borneo/sabah/page.tsx
import { getToursByRegion } from "@/lib/tours";
import BorneoGrid from "@/components/BorneoGrid";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sabah Adventures | Discovery Tours",
    description:
        "Explore Sabah — Mount Kinabalu, islands, and wildlife tours in Borneo's most iconic region.",
};

export default function SabahPage() {
    const sabahTours = getToursByRegion("Sabah");

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/sabah-banner.jpg"
                    alt="Sabah Adventures"
                    width={1600}
                    height={900}
                    className="h-[48vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold">Sabah Adventures</h1>
                    <p className="text-white/90 mt-2 max-w-xl">
                        From Kinabalu to Klias — explore Sabah’s breathtaking peaks, rivers and islands.
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mt-6">
                <ol className="flex items-center gap-2 text-sm text-slate-500">
                    <li><Link href="/" className="hover:text-slate-700">Home</Link></li>
                    <li>›</li>
                    <li><Link href="/destinations" className="hover:text-slate-700">Destinations</Link></li>
                    <li>›</li>
                    <li><Link href="/destinations/borneo" className="hover:text-slate-700">Borneo</Link></li>
                    <li>›</li>
                    <li className="text-slate-700 font-medium">Sabah</li>
                </ol>
            </nav>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-8 text-slate-700">
                <p className="text-lg">
                    Sabah is Malaysia’s eco-adventure capital — from Mount Kinabalu’s summit to island reefs,
                    river safaris, and cultural experiences.
                </p>
            </section>

            {/* Grid */}
            <BorneoGrid tours={sabahTours} />
        </main>
    );
}
