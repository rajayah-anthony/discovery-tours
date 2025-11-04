// components/BorneoSection.tsx
"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type BorneoTour = {
    slug: string;
    title: string;
    blurb?: string;
    image: string;
    region: "Sabah" | "Sarawak" | "Brunei";
    tagline?: string;
};

const CHIP_BASE =
    "px-4 h-9 rounded-full text-sm font-medium transition border";
const CHIP_IDLE =
    "bg-white border-slate-200 text-slate-700 hover:bg-slate-50";
const CHIP_ACTIVE =
    "bg-emerald-600 border-emerald-600 text-white shadow-sm";

export default function BorneoSection() {
    // --- Demo data (annotated with region) ---
    const borneoTours: BorneoTour[] = useMemo(
        () => [
            {
                slug: "maliau-basin-4d3n",
                title: "4D3N Maliau Basin (Matta Fair)",
                image: "/images/borneo/maliau.jpg",
                region: "Sabah",
                tagline: "Sabah Adventures",
            },
            {
                slug: "trusmadi-3d2n",
                title: "3D2N Explore Trusmadi (Matta Fair)",
                image: "/images/borneo/trusmadi.jpg",
                region: "Sabah",
                tagline: "Sabah Adventures",
            },
            {
                slug: "nexus-karambunai-3d2n",
                title: "3D2N Nexus Karambunai (Matta Fair)",
                image: "/images/borneo/karambunai.jpg",
                region: "Sabah",
                tagline: "Resort & Leisure",
            },
            // You can add Sarawak/Brunei items anytime:
            // { slug:"mulu-3d2n", title:"3D2N Mulu Caves", image:"/images/borneo/mulu.jpg", region:"Sarawak", tagline:"UNESCO Caves" },
            // { slug:"brunei-daytour", title:"Brunei Day Tour", image:"/images/borneo/brunei.jpg", region:"Brunei", tagline:"Culture & Heritage" },
        ],
        []
    );

    // --- Region filter state ---
    const [region, setRegion] = useState<"All" | "Sabah" | "Sarawak" | "Brunei">(
        "All"
    );

    const filtered = useMemo(() => {
        if (region === "All") return borneoTours;
        return borneoTours.filter((t) => t.region === region);
    }, [region, borneoTours]);

    return (
        <section className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-slate-900">
                        Borneo <span className="align-middle">🌴</span>
                    </h3>
                    <p className="text-sm text-slate-500">Discover Sabah, Sarawak & Brunei</p>
                </div>
                <Link
                    href="/destinations/borneo"
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
                >
                    View all →
                </Link>
            </div>

            {/* Region chips */}
            <div className="flex flex-wrap gap-8">
                <div className="flex gap-2">
                    <button
                        onClick={() => setRegion("All")}
                        className={`${CHIP_BASE} ${region === "All" ? CHIP_ACTIVE : CHIP_IDLE}`}
                    >
                        All
                    </button>
                    <button
                        onClick={() => setRegion("Sabah")}
                        className={`${CHIP_BASE} ${region === "Sabah" ? CHIP_ACTIVE : CHIP_IDLE}`}
                        aria-pressed={region === "Sabah"}
                        title="Sabah"
                    >
                        Sabah 🏝️
                    </button>
                    <button
                        onClick={() => setRegion("Sarawak")}
                        className={`${CHIP_BASE} ${region === "Sarawak" ? CHIP_ACTIVE : CHIP_IDLE}`}
                        aria-pressed={region === "Sarawak"}
                        title="Sarawak"
                    >
                        Sarawak 🌳
                    </button>
                    <button
                        onClick={() => setRegion("Brunei")}
                        className={`${CHIP_BASE} ${region === "Brunei" ? CHIP_ACTIVE : CHIP_IDLE}`}
                        aria-pressed={region === "Brunei"}
                        title="Brunei"
                    >
                        Brunei 🇧🇳
                    </button>
                </div>

                {/* Small helper text */}
                <div className="text-sm text-slate-500">
                    {region === "All" ? "Showing all Borneo trips" : `Filtered by ${region}`}
                </div>
            </div>

            {/* Cards */}
            <div className="space-y-3">
                {filtered.map((t) => (
                    <Link
                        key={t.slug}
                        href={`/tours/${t.slug}`}
                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-3 transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                        <div className="relative h-20 w-28 overflow-hidden rounded-lg">
                            <Image
                                src={t.image}
                                alt={t.title}
                                fill
                                className="object-cover transition group-hover:scale-105"
                                sizes="112px"
                            />
                        </div>
                        <div className="min-w-0">
                            <h4 className="truncate font-semibold text-slate-900">{t.title}</h4>
                            <p className="text-sm text-slate-500">{t.tagline}</p>
                            <div className="mt-1 inline-flex items-center gap-2 text-xs">
                                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-slate-600">
                                    {t.region}
                                </span>
                            </div>
                        </div>
                        <span className="ml-auto shrink-0 text-slate-400 group-hover:text-slate-600">
                            →
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}
