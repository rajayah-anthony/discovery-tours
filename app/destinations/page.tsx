// app/destinations/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS } from "@/lib/destinations";

export const metadata: Metadata = {
    title: "Destinations | Discovery Tours",
    description:
        "Explore Sabah’s top destinations — Kota Kinabalu, Kundasang, Sandakan, Semporna, and more.",
};

export default function DestinationsIndexPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-teal-600 to-emerald-600 text-white">
                <div className="mx-auto max-w-7xl px-6 py-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Destinations
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/90">
                        Highlands, islands, wildlife and more — pick a base and let us craft
                        your Sabah story.
                    </p>
                </div>
            </section>

            {/* Grid */}
            <section className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {DESTINATIONS.map((d) => (
                        <Link
                            href={`/destinations/${d.slug}`}
                            key={d.slug}
                            className="group rounded-2xl overflow-hidden border bg-white hover:shadow-xl transition-all"
                        >
                            <div className="relative h-56 w-full">
                                <Image
                                    src={d.hero}
                                    alt={d.name}
                                    fill
                                    priority={false}
                                    className="object-cover group-hover:scale-[1.03] transition-transform"
                                />
                            </div>
                            <div className="p-5">
                                <h3 className="text-xl font-semibold">{d.name}</h3>
                                <p className="text-sm text-gray-600 mt-1">{d.tagline}</p>
                                <div className="mt-4 inline-flex items-center text-teal-700 font-medium">
                                    Explore
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="ml-1 h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
