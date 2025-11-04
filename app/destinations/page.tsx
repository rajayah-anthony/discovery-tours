// app/destinations/page.tsx
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { DESTINATIONS } from "@/lib/destinations";


export const metadata: Metadata = {
    title: "Destinations | Discovery Tours",
    description:
        "Browse destinations by region — Malaysia and Borneo. Explore islands, culture, cities, and rainforests.",
};

export default function DestinationsGateway() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-white" />
                <div className="mx-auto max-w-7xl px-6 pt-12 pb-6">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900">
                        Destinations
                    </h1>
                    <p className="mt-3 max-w-2xl text-slate-600">
                        Start with a region and discover curated journeys across islands, cities, culture and
                        rainforests.
                    </p>
                </div>
            </section>

            {/* Region cards */}
            <section className="mx-auto max-w-7xl px-6 pb-16 grid md:grid-cols-2 gap-8">
                {/* Malaysia */}
                <article className="group overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-lg transition relative">
                    {/* Full-card overlay link (click anywhere) */}
                    <Link
                        href="/destinations/malaysia"
                        aria-label="Open Malaysia destination"
                        className="absolute inset-0 z-10"
                    />
                    {/* Content is above the overlay, but non-interactive by default.
              We'll re-enable pointer events only where needed (quick links). */}
                    <div className="relative z-20 pointer-events-none">
                        <div className="relative">
                            <Image
                                src="/images/malaysia-banner.jpg"
                                alt="Malaysia"
                                width={1400}
                                height={800}
                                className="h-64 w-full object-cover object-center group-hover:scale-[1.02] transition-transform"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            <h2 className="absolute bottom-4 left-5 text-white text-2xl md:text-3xl font-extrabold drop-shadow">
                                Malaysia 🇲🇾
                            </h2>
                        </div>

                        <div className="p-5">
                            <p className="text-slate-700">
                                Peninsular highlights, cultural heritage, highlands and island escapes.
                            </p>

                            {/* Quick links (re-enable clicks) */}
                            <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto">
                                <Link
                                    href="/packages/langkawi-island-4d3n"
                                    className="text-xs rounded-full px-3 py-1 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    4D3N Langkawi Island
                                </Link>
                                <Link
                                    href="/packages/cultural-heritage-7d6n"
                                    className="text-xs rounded-full px-3 py-1 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    7D6N Cultural Heritage
                                </Link>
                                <Link
                                    href="/packages/peninsular-highlights-10d9n"
                                    className="text-xs rounded-full px-3 py-1 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    10D9N Peninsular Highlights
                                </Link>
                            </div>

                            <div className="mt-6">
                                <span className="inline-flex items-center gap-2 text-sky-700 font-medium">
                                    Explore Malaysia
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </article>

                {/* Borneo */}
                <article className="group overflow-hidden rounded-3xl border bg-white shadow-sm hover:shadow-lg transition relative">
                    {/* Full-card overlay link */}
                    <Link
                        href="/destinations/borneo"
                        aria-label="Open Borneo destination"
                        className="absolute inset-0 z-10"
                    />
                    <div className="relative z-20 pointer-events-none">
                        <div className="relative">
                            <Image
                                src="/images/borneo-banner.jpg"
                                alt="Borneo"
                                width={1400}
                                height={800}
                                className="h-64 w-full object-cover object-center group-hover:scale-[1.02] transition-transform"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
                            <h2 className="absolute bottom-4 left-5 text-white text-2xl md:text-3xl font-extrabold drop-shadow">
                                Borneo 🌴
                            </h2>
                        </div>

                        <div className="p-5">
                            <p className="text-slate-700">
                                Sabah adventures, Sarawak discoveries and Brunei extensions in the wild heart of
                                Borneo.
                            </p>

                            {/* Quick links (re-enable clicks) */}
                            <div className="mt-4 flex flex-wrap gap-2 pointer-events-auto">
                                <Link
                                    href="/packages/maliau-basin-4d3n-matta"
                                    className="text-xs rounded-full px-3 py-1 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    4D3N Maliau Basin
                                </Link>
                                <Link
                                    href="/packages/trusmadi-3d2n-matta"
                                    className="text-xs rounded-full px-3 py-1 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    3D2N Explore Trusmadi
                                </Link>
                                <Link
                                    href="/packages/nexus-karambunai-3d2n-matta"
                                    className="text-xs rounded-full px-3 py-1 ring-1 ring-slate-200 hover:bg-slate-50"
                                >
                                    3D2N Nexus Karambunai
                                </Link>
                            </div>

                            <div className="mt-6">
                                <span className="inline-flex items-center gap-2 text-sky-700 font-medium">
                                    Explore Borneo
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    );
}
