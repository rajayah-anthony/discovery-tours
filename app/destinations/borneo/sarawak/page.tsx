import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getToursByRegion } from "@/lib/tours";
import BorneoGrid from "@/components/BorneoGrid";

export const metadata: Metadata = {
    title: "Sarawak Discoveries | Discovery Tours",
    description:
        "Discover Sarawak’s caves, longhouses, and rainforests — adventure, culture and nature at its best.",
    alternates: { canonical: "/destinations/borneo/sarawak" },
};

export default function SarawakPage() {
    // ✅ fetch Sarawak-only packages
    const sarawakTours = getToursByRegion("Sarawak");

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/sarawak-banner.jpg"
                    alt="Sarawak Adventures"
                    width={1600}
                    height={900}
                    className="h-[48vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        Sarawak Discoveries
                    </h1>
                    <p className="text-white/90 mt-2 max-w-xl">
                        Venture deep into Sarawak’s lush rainforests, ancient caves and
                        indigenous culture.
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mt-6">
                <ol className="flex items-center gap-2 text-sm text-slate-500">
                    <li>
                        <Link href="/" className="hover:text-slate-700">
                            Home
                        </Link>
                    </li>
                    <li>›</li>
                    <li>
                        <Link href="/destinations" className="hover:text-slate-700">
                            Destinations
                        </Link>
                    </li>
                    <li>›</li>
                    <li>
                        <Link href="/destinations/borneo" className="hover:text-slate-700">
                            Borneo
                        </Link>
                    </li>
                    <li>›</li>
                    <li className="text-slate-700 font-medium">Sarawak</li>
                </ol>
            </nav>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-8 text-slate-700">
                <p className="text-lg">
                    From the majestic Mulu Caves to the rivers of Kuching and the warmth
                    of longhouse hospitality, Sarawak offers an unforgettable mix of
                    nature, heritage, and adventure.
                </p>
            </section>

            {/* Grid */}
            <BorneoGrid tours={sarawakTours} />

            {/* Empty state suggestion */}
            {sarawakTours.length === 0 && (
                <section className="max-w-6xl mx-auto px-6 pb-16">
                    <div className="rounded-2xl border border-dashed p-8 text-center bg-white text-slate-600">
                        <p className="text-base">
                            We’re crafting new Sarawak packages — stay tuned!
                        </p>
                        <p className="mt-1 text-sm">
                            Meanwhile, contact us to plan a custom trip to Mulu, Kuching or
                            the interior highlands.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Plan my trip →
                        </Link>
                    </div>
                </section>
            )}
        </main>
    );
}
