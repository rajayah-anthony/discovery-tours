// app/tours/[slug]/page.tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import type { Tour } from "../../../lib/tours";
import { tourData } from "../../../lib/tours";
import Gallery from "../../../components/Gallery";
import Lightbox from "../../../components/Lightbox";
import dynamic from "next/dynamic";
import BackToTop from "../../../components/BackToTop";

// Use the Google Maps implementation; SSR must be off
const Map = dynamic(() => import("../../../components/MapGoogle"), { ssr: false });

// Helper (only used here) if a marker lacks href, generate a Maps link
function gmapsHref(lat: number, lng: number) {
    return `https://www.google.com/maps?q=${lat},${lng}`;
}

export default function TourDetailPage() {
    const params = useParams(); // may be null in your typings
    const router = useRouter();

    // ✅ Normalize slug from params (handles null / array / undefined)
    const rawSlug = (params as any)?.slug as string | string[] | undefined;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    // If slug is missing, bail out cleanly
    if (!slug) {
        return (
            <main className="mx-auto max-w-5xl p-6">
                <p className="text-gray-700">Invalid tour URL.</p>
                <button className="mt-4 underline text-blue-600" onClick={() => router.back()}>
                    Go back
                </button>
            </main>
        );
    }

    // ✅ Type predicate: when it matches, it's definitely a Tour
    const found = tourData.find((t): t is Tour => t.slug === slug);

    if (!found) {
        return (
            <main className="mx-auto max-w-5xl p-6">
                <p className="text-gray-700">Tour not found.</p>
                <button className="mt-4 underline text-blue-600" onClick={() => router.back()}>
                    Go back
                </button>
            </main>
        );
    }

    const tour: Tour = found;

    const {
        title,
        slug: tourSlug,
        location,
        duration,
        tags = [],
        price,
        gallery,
        image,
        map,
        itinerary = [],
        includes = [],
        description,
    } = tour;

    const [open, setOpen] = React.useState(false);
    const [startIndex, setStartIndex] = React.useState(0);
    const [active, setActive] = React.useState(0);
    const [openDays, setOpenDays] = React.useState<number[]>([]);

    const images = gallery?.length ? gallery : [image];

    function toggleDay(idx: number) {
        setOpenDays((prev) =>
            prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
        );
    }

    return (
        <main className="mx-auto max-w-5xl p-6">
            {/* Back to homepage Tours section */}
            <Link
                href={{ pathname: "/", hash: "tours" }}
                className="inline-block mb-6 text-blue-600 underline"
                prefetch={false}
            >
                ← Back to all tours
            </Link>

            {/* Header */}
            <header className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold leading-tight">{title}</h1>
                    <div className="text-gray-600 mt-1">
                        <span>{location}</span> • <span>{duration}</span>
                    </div>

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Price + PRIMARY CTA (observed by ComboCTA to auto-hide) */}
                <div className="shrink-0 grid gap-2 text-right">
                    <div className="inline-flex items-baseline justify-end gap-1">
                        <span className="text-sm text-slate-500">from</span>
                        <span className="text-2xl font-bold text-slate-900">{price}</span>
                    </div>
                    <Link
                        id="primary-tour-cta"
                        data-tour-title={title}
                        data-tour-slug={tourSlug}
                        data-tour-price={price}
                        href={{
                            pathname: "/",
                            hash: "contact",
                            query: { tour: tourSlug, title, price },
                        }}
                        prefetch={false}
                        className="inline-flex justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow hover:bg-blue-700 transition"
                        aria-label="Book this tour now"
                    >
                        Book Now
                    </Link>

                </div>
            </header>

            {/* Media */}
            <div className="mt-6">
                <Gallery
                    images={images}
                    active={active}
                    setActive={setActive}
                    onOpenLightbox={(i) => {
                        setStartIndex(i);
                        setOpen(true);
                    }}
                />
            </div>

            {/* Overview */}
            {description && (
                <section className="prose max-w-none mb-8 mt-8">
                    <h2>Overview</h2>
                    <p className="whitespace-pre-line">{description.trim()}</p>
                </section>
            )}

            {/* Map & Meeting Points */}
            {map && (
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-3">Map &amp; Meeting Points</h3>
                    <div className="rounded-2xl border border-slate-200 bg-white p-3">
                        <Map
                            center={map.center}
                            markers={map.markers}
                            route={map.route}
                            routeGeoJson={map.routeGeoJson as any}
                            height={420}
                            boundsPadding={28}
                            disableDefaultUI={false}
                        />
                    </div>

                    {/* Quick links to open marker points in Google Maps */}
                    {map.markers?.length ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                            {map.markers.map((m, i) => {
                                const href = m.href ?? gmapsHref(m.position[0], m.position[1]);
                                return (
                                    <a
                                        key={i}
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:bg-slate-50"
                                    >
                                        Open {m.label ?? `Point ${i + 1}`} in Google Maps
                                    </a>
                                );
                            })}
                        </div>
                    ) : null}
                </section>
            )}

            {/* Itinerary (accordion) */}
            {Array.isArray(itinerary) && itinerary.length > 0 && (
                <section className="mb-10">
                    <h3 className="text-xl font-semibold mb-3">Itinerary</h3>
                    <div className="divide-y rounded-xl border border-slate-200 overflow-hidden bg-white">
                        {itinerary.map((day, idx) => {
                            const isOpen = openDays.includes(idx);
                            return (
                                <div key={idx} className="p-4">
                                    <button
                                        type="button"
                                        onClick={() => toggleDay(idx)}
                                        className="w-full flex items-center justify-between text-left"
                                        aria-expanded={isOpen}
                                        aria-controls={`day-panel-${idx}`}
                                    >
                                        <span className="font-medium">
                                            Day {idx + 1}
                                            <span className="sr-only"> itinerary</span>
                                        </span>
                                        <span className={`transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden>
                                            ▾
                                        </span>
                                    </button>
                                    <div id={`day-panel-${idx}`} className={`mt-2 text-slate-700 ${isOpen ? "block" : "hidden"}`}>
                                        {day}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* What's Included */}
            {Array.isArray(includes) && includes.length > 0 && (
                <section className="mb-12">
                    <h3 className="text-xl font-semibold mb-3">What&apos;s Included</h3>
                    <ul className="list-disc pl-6 space-y-1">
                        {includes.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}

            {/* No page-local sticky footer CTA; ComboCTA handles sticky booking/chat site-wide. */}
            <BackToTop />

            {open && <Lightbox images={images} startIndex={startIndex} onClose={() => setOpen(false)} />}
        </main>
    );
}
