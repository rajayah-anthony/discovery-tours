// app/components/HeroSection.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";

type Slide = {
    image: string;
    badge?: string;
    title: string;
    desc: string;
};

type Props = {
    /** Optional: override slides (must be exactly 4 if you pass) */
    slides?: Slide[];
    /** Autoplay interval in ms */
    background?: string;
    intervalMs?: number;
};

export default function HeroSection({
    slides,
    intervalMs = 6500,
}: Props) {
    const pathname = usePathname();

    // Default 4 slides (swap images with your own under /public)
    const SLIDES = useMemo<Slide[]>(
        () =>
            slides ?? [
                {
                    image: "/images/klias-river.jpg",
                    badge: "River Cruise • Wildlife",
                    title: "Discover Sabah, your way.",
                    desc:
                        "Sunrise hikes, river cruises, island hopping, and cultural trails — curated by locals for unforgettable days.",
                },
                {
                    image: "/images/island-hopping.jpg",
                    badge: "Islands & Beaches",
                    title: "Turquoise seas, easy day trips.",
                    desc:
                        "Hop between Manukan, Mamutik, and Sapi for lazy sands, snorkels, and sunset views a short boat ride away.",
                },
                {
                    image: "/images/kundasang-farm.jpg",
                    badge: "Kundasang Highlands",
                    title: "Cool air & mountain mornings.",
                    desc:
                        "Wake to Mt. Kinabalu’s silhouette, visit farms and flower gardens, and chase golden-hour photo spots.",
                },
                {
                    image: "/images/klias-river.jpg", // reuse or change to sepilok/kinabatangan
                    badge: "East Coast Wildlife",
                    title: "Sandakan & Kinabatangan magic.",
                    desc:
                        "Orangutans, sun bears, and proboscis monkeys on serene river cruises through Borneo’s lush corridors.",
                },
            ],
        [slides]
    );

    // Routing helpers (keep your smooth scroll behaviour)
    const homeHref = (hash: string) => (pathname === "/" ? `#${hash}` : `/#${hash}`);
    const handleHomeHashClick =
        (hash: string) =>
            (e: MouseEvent<HTMLAnchorElement>) => {
                if (pathname === "/") {
                    e.preventDefault();
                    const el = document.getElementById(hash);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            };

    // Slider state
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const reduceMotionRef = useRef<boolean>(false);

    // Respect prefers-reduced-motion
    useEffect(() => {
        if (typeof window !== "undefined") {
            reduceMotionRef.current =
                window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
        }
    }, []);

    // Autoplay
    useEffect(() => {
        if (paused) return;
        const id = setInterval(() => {
            setIndex((i) => (i + 1) % SLIDES.length);
        }, intervalMs);
        return () => clearInterval(id);
    }, [paused, intervalMs, SLIDES.length]);

    const go = (i: number) => setIndex(((i % SLIDES.length) + SLIDES.length) % SLIDES.length);
    const next = () => go(index + 1);
    const prev = () => go(index - 1);

    const current = SLIDES[index];

    return (
        <section
            className="relative overflow-hidden rounded-2xl shadow-sm"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            {/* Background stack */}
            <div className="absolute inset-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current.image + index} // force fade on index change
                        className="absolute inset-0 bg-center bg-cover"
                        style={{ backgroundImage: `url(${current.image})` }}
                        initial={{ opacity: 0, scale: reduceMotionRef.current ? 1 : 1.03 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0.0 }}
                        transition={{ duration: reduceMotionRef.current ? 0.2 : 0.9, ease: "easeOut" }}
                    />
                </AnimatePresence>
                {/* Overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/60" />
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-6 lg:px-10 min-h-[48vh] sm:min-h-[54vh] lg:min-h-[62vh] py-12 sm:py-16 flex items-end md:items-center">
                <div className="max-w-3xl text-white">
                    {current.badge && (
                        <motion.p
                            key={`badge-${index}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45, ease: "easeOut" }}
                            className="mb-3 inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur"
                        >
                            {current.badge}
                        </motion.p>
                    )}

                    <motion.h1
                        key={`title-${index}`}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="text-3xl sm:text-5xl font-semibold leading-tight drop-shadow-md"
                    >
                        {current.title}
                    </motion.h1>

                    <motion.p
                        key={`desc-${index}`}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
                        className="mt-4 max-w-2xl text-white/90 sm:text-lg"
                    >
                        {current.desc}
                    </motion.p>

                    <div className="mt-8 flex flex-wrap items-center gap-3">
                        <Link
                            href={homeHref("tours")}
                            onClick={handleHomeHashClick("tours")}
                            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-gray-900 shadow hover:bg-white/95"
                            prefetch={false}
                        >
                            Browse Tours
                        </Link>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg border border-white/40 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white hover:bg-white/15"
                            prefetch={false}
                        >
                            Contact Us
                        </Link>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-white/80">
                        <span>Licensed guides</span>
                        <span className="hidden text-white/40 sm:inline">•</span>
                        <span>Local operators</span>
                        <span className="hidden text-white/40 sm:inline">•</span>
                        <span>Flexible scheduling</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="absolute inset-x-0 bottom-3 sm:bottom-6 flex items-center justify-between px-4">
                    {/* Prev / Next on md+ */}
                    <div className="hidden md:flex gap-2">
                        <button
                            aria-label="Previous"
                            onClick={prev}
                            className="rounded-full bg-white/15 hover:bg-white/25 backdrop-blur p-2 text-white"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </button>
                        <button
                            aria-label="Next"
                            onClick={next}
                            className="rounded-full bg-white/15 hover:bg-white/25 backdrop-blur p-2 text-white"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24">
                                <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" fill="none" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots */}
                    <div className="mx-auto md:mx-0 flex items-center gap-2">
                        {SLIDES.map((_, i) => {
                            const active = i === index;
                            return (
                                <button
                                    key={i}
                                    onClick={() => go(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={[
                                        "h-[9px] w-[9px] rounded-full transition-all",
                                        active
                                            ? "bg-white shadow ring-2 ring-white/60 scale-110"
                                            : "bg-white/50 hover:bg-white/70",
                                    ].join(" ")}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
