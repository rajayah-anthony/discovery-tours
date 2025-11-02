"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react"; // 🔄 Reset icon
import HeroSection from "../components/HeroSection";
import { tourData } from "../lib/tours";

export default function Home() {
  // --- Destination Search state ---
  const [query, setQuery] = useState("");
  const [destination, setDestination] = useState("");
  const [type, setType] = useState("");
  const [duration, setDuration] = useState("");
  const resultsRef = useRef<HTMLDivElement | null>(null);

  // --- Shared select styling ---
  const selectBase =
    "md:col-span-2 h-12 px-4 pr-10 rounded-xl border border-slate-300 text-slate-700 " +
    "bg-white appearance-none " +
    "bg-[url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='gray' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/></svg>\")] " +
    "bg-[length:16px_16px] bg-[right_1rem_center] bg-no-repeat " +
    "focus:ring-2 focus:ring-sky-500 focus:border-sky-500";

  const cityFromLocation = (loc?: string) => (loc ?? "").split(",")[0]?.trim();

  // --- Build popular tours ---
  const popular = useMemo(() => {
    const byFeatured = tourData.filter((t: any) => t.featured).slice(0, 6);
    if (byFeatured.length) return byFeatured;

    const byTags = tourData
      .filter((t: any) =>
        t.tags?.some((tag: string) =>
          ["Promotion", "Package", "Popular"].includes(tag)
        )
      )
      .slice(0, 6);
    if (byTags.length) return byTags;

    return tourData.slice(0, 6);
  }, []);

  // --- Dropdown option lists ---
  const destinationOptions = useMemo(() => {
    const set = new Set<string>();
    tourData.forEach((t: any) => set.add(cityFromLocation(t.location)));
    return Array.from(set).filter(Boolean).sort();
  }, []);

  const typeOptions = useMemo(() => {
    const set = new Set<string>();
    tourData.forEach((t: any) => t.tags?.forEach((tag: string) => set.add(tag)));
    return Array.from(set).filter(Boolean).sort();
  }, []);

  const durationOptions = useMemo(() => {
    const set = new Set<string>();
    tourData.forEach((t: any) => t.duration && set.add(t.duration));
    return Array.from(set).filter(Boolean).sort();
  }, []);

  // --- Featured tour to promote (with sensible fallbacks) ---
  const featuredTour = useMemo(() => {
    // Prefer a specific slug if available
    const bySlug = tourData.find((t: any) => t.slug === "island-hopping");
    if (bySlug) return bySlug;

    // Else, pick one with Islands tag, or first 'featured', or first in list
    return (
      tourData.find((t: any) => t.tags?.includes("Islands")) ||
      tourData.find((t: any) => t.featured) ||
      tourData[0]
    );
  }, []);

  // --- Filter logic ---
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    return tourData.filter((t: any) => {
      const haystack = `${t.title} ${t.location} ${t.duration} ${t.description ?? ""} ${(t.tags ?? []).join(" ")}`.toLowerCase();
      if (q && !haystack.includes(q)) return false;
      if (destination && cityFromLocation(t.location) !== destination) return false;
      if (type && !t.tags?.includes(type)) return false;
      if (duration && t.duration !== duration) return false;
      return true;
    });
  }, [query, destination, type, duration]);

  const searchActive = query.trim().length > 0 || destination || type || duration;
  const canReset = searchActive;
  const listToShow = searchActive ? filtered : popular;
  const listTitle = searchActive ? "Search Results" : "Popular Tours";

  // --- Scroll to results (mobile only) ---
  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      searchActive &&
      window.innerWidth < 768 && // mobile only
      resultsRef.current
    ) {
      resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [searchActive]);

  // --- Reset filters ---
  const resetFilters = () => {
    setQuery("");
    setDestination("");
    setType("");
    setDuration("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <HeroSection background="/images/klias-river.jpg" />
      </div>

      {/* DESTINATION SEARCH BAR */}
      <section className="mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 sm:p-6"
          >
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
              Where do you want to go?
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              Search by destination, type of package, duration, or any keywords.
            </p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-3">
              {/* Keyword */}
              <input
                className="md:col-span-4 h-12 px-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
                placeholder="Try 'Kundasang', 'island', 'cultural'…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && window.innerWidth < 768) scrollToResults();
                }}
              />

              {/* Destination */}
              <select
                className={`${selectBase} md:col-span-2`}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="">Destination</option>
                {destinationOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Type */}
              <select
                className={`${selectBase} md:col-span-2`}
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">Type</option>
                {typeOptions.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>

              {/* Duration */}
              <select
                className={`${selectBase} md:col-span-2`}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="">Duration</option>
                {durationOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              {/* Search + Reset buttons */}
              <div className="md:col-span-2 flex gap-2 items-center">
                {/* Search */}
                <button
                  type="button"
                  className="h-12 flex-1 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-medium transition-colors"
                  onClick={() => {
                    if (window.innerWidth < 768) scrollToResults();
                  }}
                >
                  Search
                </button>

                {/* Reset (icon) */}
                <button
                  type="button"
                  className={`hidden md:inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-all ${canReset
                      ? "border-slate-300 text-slate-500 hover:text-sky-700 hover:border-sky-400 hover:bg-slate-100"
                      : "border-slate-200 text-slate-300 cursor-not-allowed"
                    }`}
                  onClick={resetFilters}
                  aria-label="Reset filters"
                  title="Reset filters"
                  disabled={!canReset}
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Full-width Reset (mobile only) */}
            <button
              type="button"
              className={`mt-3 md:hidden w-full h-12 px-4 rounded-xl border text-sm transition ${canReset
                  ? "border-slate-300 text-slate-600 hover:border-slate-400 hover:bg-slate-100"
                  : "border-slate-200 text-slate-300 cursor-not-allowed"
                }`}
              onClick={resetFilters}
              disabled={!canReset}
            >
              <div className="flex items-center justify-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Reset Filters</span>
              </div>
            </button>
          </motion.div>
        </div>
      </section>

      {/* FEATURED IMAGE (hidden when searching) */}
      <AnimatePresence mode="wait">
        {!searchActive && featuredTour && (
          <motion.section
            key="featured"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-8"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl group">
                {/* Image */}
                <Image
                  src={featuredTour.image ?? "/images/island-hopping.jpg"}
                  alt={featuredTour.title ?? "Featured tour"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  priority
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />

                {/* Caption + small CTA */}
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                  <div className="text-white">
                    <div className="text-sm uppercase tracking-wide opacity-90">Featured</div>
                    <div className="font-semibold">
                      {featuredTour.title ?? "Island Hopping — Tunku Abdul Rahman Park"}
                    </div>
                  </div>

                  <Link
                    href={`/tours/${featuredTour.slug}`}
                    className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1.5 text-sm font-medium text-slate-900 shadow hover:bg-white"
                    prefetch={false}
                    aria-label={`Open ${featuredTour.title} details`}
                  >
                    View Package
                    <svg width="18" height="18" viewBox="0 0 24 24" className="ml-0.5">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </Link>
                </div>

                {/* Full-card link target */}
                <Link
                  href={`/tours/${featuredTour.slug}`}
                  className="absolute inset-0"
                  aria-label={`Open ${featuredTour.title} details`}
                  prefetch={false}
                />
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* TOURS GRID */}
      <section
        ref={resultsRef}
        id="tours"
        className="py-12 md:py-16 bg-slate-50 border-y mt-10 scroll-mt-28 md:scroll-mt-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <h2 className="text-2xl md:text-3xl font-bold">{listTitle}</h2>
            <Link href="/#contact" className="text-sm text-sky-700 hover:underline" prefetch={false}>
              Need help choosing? Contact us →
            </Link>
          </div>

          {searchActive && listToShow.length === 0 ? (
            <p className="mt-6 text-slate-600">
              No tours matched your filters. Try clearing filters or using a broader keyword.
            </p>
          ) : (
            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {listToShow.map((t: any) => (
                <article
                  key={t.slug}
                  className="group rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm"
                >
                  <Link
                    href={`/tours/${t.slug}`}
                    className="relative aspect-video overflow-hidden block"
                    aria-label={`Open ${t.title} details`}
                    prefetch={false}
                  >
                    <Image
                      src={t.image}
                      alt={t.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 1024px) 50vw, 33vw"
                    />
                    {t.tags?.length ? (
                      <div className="absolute top-3 left-3 inline-flex gap-2">
                        {t.tags.slice(0, 3).map((tag: string) => (
                          <span key={tag} className="text-[10px] px-2 py-1 rounded-full bg-black/70 text-white">
                            {tag}
                          </span>
                        ))}
                      </div>
                    ) : null}
                  </Link>

                  <div className="p-4">
                    <Link href={`/tours/${t.slug}`} className="block" prefetch={false}>
                      <h3 className="font-semibold leading-snug line-clamp-2 group-hover:text-sky-700">
                        {t.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-slate-500 mt-1">
                      {t.location} • {t.duration}
                    </p>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="font-bold">{t.price}</div>
                      <Link href={`/tours/${t.slug}`} className="text-sm hover:text-sky-700" prefetch={false}>
                        View Details →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-12 md:py-16 scroll-mt-28 md:scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">Get a personalised quote</h2>
            <p className="mt-2 text-slate-600 text-sm md:text-base">
              Share your preferred dates, group size, and interests. We’ll reply with options &amp; pricing.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-slate-700">
              <li>• WhatsApp: +60 12-345 6789</li>
              <li>• Email: hello@discoverytours.my</li>
              <li>• Office hours: Mon–Sat, 9:00–18:00</li>
            </ul>
          </div>

          <form className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200 grid gap-3">
            <input className="px-4 py-3 rounded-xl border" placeholder="Your name" />
            <input className="px-4 py-3 rounded-xl border" placeholder="Email or phone" />
            <textarea className="px-4 py-3 rounded-xl border min-h-28" placeholder="Dates, group size, interests…" />
            <button type="button" className="px-4 py-3 rounded-xl bg-sky-600 text-white font-medium">
              Send enquiry
            </button>
            <p className="text-xs text-slate-500">Demo only. Hook this to your email/CRM in Phase 1.</p>
          </form>
        </div>
      </section>
    </div>
  );
}
