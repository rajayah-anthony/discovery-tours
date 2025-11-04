"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Region, Tour } from "@/lib/tours";

type BorneoRegion = Extract<Region, "Sabah" | "Sarawak" | "Brunei">;

export default function BorneoGrid({ tours }: { tours: Tour[] }) {
    const [region, setRegion] = useState<"All" | BorneoRegion>("All");

    // count totals per region
    const counts = useMemo(() => {
        const base: Record<BorneoRegion, number> = { Sabah: 0, Sarawak: 0, Brunei: 0 };
        tours.forEach((t) => {
            const r = t.region as BorneoRegion | undefined;
            if (r && base[r] !== undefined) base[r] += 1;
        });
        return base;
    }, [tours]);

    const filtered = useMemo(
        () => (region === "All" ? tours : tours.filter((t) => t.region === region)),
        [region, tours]
    );

    const Chip = ({
        r,
        label,
        count,
    }: {
        r: "All" | BorneoRegion;
        label: string;
        count?: number;
    }) => (
        <button
            onClick={() => setRegion(r)}
            className={[
                "px-4 h-10 rounded-full text-sm font-medium border transition focus:outline-none focus:ring-2 focus:ring-emerald-500",
                region === r
                    ? "bg-emerald-600 border-emerald-600 text-white shadow-sm"
                    : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50",
            ].join(" ")}
            aria-pressed={region === r}
        >
            {label}{" "}
            {typeof count === "number" && (
                <span className="opacity-70">({count})</span>
            )}
        </button>
    );

    return (
        <>
            {/* Filter chips */}
            <section className="max-w-6xl mx-auto px-6 pb-4">
                <div className="flex flex-wrap gap-2">
                    <Chip r="All" label="All" count={tours.length} />
                    <Chip r="Sabah" label="Sabah 🏝️" count={counts.Sabah} />
                    <Chip r="Sarawak" label="Sarawak 🌳" count={counts.Sarawak} />
                    <Chip r="Brunei" label="Brunei 🇧🇳" count={counts.Brunei} />
                </div>
                <p className="mt-2 text-sm text-slate-500">
                    {region === "All"
                        ? "Showing all Borneo trips."
                        : `Filtered by ${region}.`}
                </p>
            </section>

            {/* Tour cards */}
            <section className="max-w-6xl mx-auto px-6 pb-14">
                {filtered.length === 0 ? (
                    <div className="rounded-2xl border border-dashed p-8 text-center text-slate-600 bg-white">
                        <p className="text-base">
                            No packages in <span className="font-semibold">{region}</span> yet.
                        </p>
                        <p className="mt-1 text-sm">
                            Tell us what you’re looking for — we’ll craft a custom itinerary.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800"
                        >
                            Request itinerary →
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-6">
                        {filtered.map((p) => (
                            <Link
                                key={p.slug}
                                href={`/packages/${p.slug}`}
                                className="group rounded-2xl overflow-hidden border bg-white hover:shadow-lg transition"
                            >
                                <div className="relative aspect-[4/3]">
                                    <Image
                                        src={p.image}
                                        alt={p.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform"
                                        sizes="(min-width: 768px) 33vw, 100vw"
                                    />
                                </div>
                                <div className="p-4">
                                    <div className="mb-2">
                                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                                            {p.region ?? "Borneo"}
                                        </span>
                                    </div>
                                    <h3 className="font-semibold text-slate-900">{p.title}</h3>
                                    {p.description && (
                                        <p className="text-sm text-slate-600 mt-1 line-clamp-2">
                                            {p.description}
                                        </p>
                                    )}
                                    <p className="mt-1 text-sm text-slate-500">
                                        {p.duration && <>{p.duration} • </>}
                                        {p.price}
                                    </p>
                                    <span className="inline-flex items-center mt-3 text-sky-700 text-sm font-medium">
                                        View details →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </section>
        </>
    );
}
