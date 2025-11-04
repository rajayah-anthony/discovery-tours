import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getToursByRegion } from "@/lib/tours";
import BorneoGrid from "@/components/BorneoGrid";

export const metadata: Metadata = {
    title: "Brunei Highlights | Discovery Tours",
    description:
        "Discover Brunei’s heritage, royal landmarks, and mosques — where tradition meets tranquility.",
    alternates: { canonical: "/destinations/borneo/brunei" },
};

export default function BruneiPage() {
    // ✅ Fetch Brunei-only packages
    const bruneiTours = getToursByRegion("Brunei");

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/brunei-banner.jpg"
                    alt="Brunei Adventures"
                    width={1600}
                    height={900}
                    className="h-[48vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        Brunei Highlights
                    </h1>
                    <p className="text-white/90 mt-2 max-w-xl">
                        Explore the royal city of Bandar Seri Begawan — mosques, museums,
                        and mangrove adventures await.
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
                    <li className="text-slate-700 font-medium">Brunei</li>
                </ol>
            </nav>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-8 text-slate-700">
                <p className="text-lg">
                    Brunei offers a unique blend of Malay culture, Islamic heritage, and
                    modern serenity. Visit the Sultan Omar Ali Saifuddien Mosque, cruise
                    the mangrove rivers, and experience the charm of Kampong Ayer — the
                    world’s largest water village.
                </p>
            </section>

            {/* Grid */}
            <BorneoGrid tours={bruneiTours} />

            {/* Empty state (if no packages yet) */}
            {bruneiTours.length === 0 && (
                <section className="max-w-6xl mx-auto px-6 pb-16">
                    <div className="rounded-2xl border border-dashed p-8 text-center bg-white text-slate-600">
                        <p className="text-base">
                            Brunei packages are coming soon — we’re curating new cultural and
                            heritage experiences.
                        </p>
                        <p className="mt-1 text-sm">
                            Contact us to plan a personalized Brunei itinerary or cross-border
                            tour with Sabah or Sarawak.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Plan my Brunei trip →
                        </Link>
                    </div>
                </section>
            )}
        </main>
    );
}
