"use client";

import { useMemo, useState } from "react";
import { deals, isActiveDeal, getDiscountPercent } from "../../lib/deals";
import DealCard from "../../components/DealCard";

export default function DealsPage() {
    const [q, setQ] = useState("");
    const [type, setType] = useState<string>("");
    const [minOff, setMinOff] = useState<number>(0);
    const [sort, setSort] = useState<"popular" | "highOff" | "priceLow" | "priceHigh">("popular");

    const filtered = useMemo(() => {
        // ✅ wrap isActiveDeal so filter's (value, index) signature is respected
        let arr = deals.filter(d => isActiveDeal(d));

        if (q) {
            const s = q.toLowerCase();
            arr = arr.filter(
                d =>
                    d.title.toLowerCase().includes(s) ||
                    d.location.toLowerCase().includes(s) ||
                    (d.tags ?? []).some(t => t.toLowerCase().includes(s))
            );
        }

        if (type) arr = arr.filter(d => d.type === type);
        if (minOff > 0) arr = arr.filter(d => getDiscountPercent(d) >= minOff);

        // sort on a shallow copy to avoid any accidental mutations later
        const sorted = [...arr];
        switch (sort) {
            case "highOff":
                sorted.sort((a, b) => getDiscountPercent(b) - getDiscountPercent(a));
                break;
            case "priceLow":
                sorted.sort((a, b) => a.salePrice - b.salePrice);
                break;
            case "priceHigh":
                sorted.sort((a, b) => b.salePrice - a.salePrice);
                break;
            default:
                break; // "popular" stub
        }
        return sorted;
    }, [q, type, minOff, sort]);

    const types = Array.from(new Set(deals.map(d => d.type)));

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-slate-50/70">
            <section className="mx-auto max-w-7xl px-6 py-10">
                <h1 className="text-3xl md:text-4xl font-extrabold">Deals & Promotions</h1>
                <p className="mt-2 text-slate-600">
                    MATTA Fair specials, seasonal promos, and partner offers. Book while stocks last.
                </p>

                {/* Controls */}
                <div className="mt-6 grid gap-3 md:grid-cols-4">
                    <input
                        className="h-12 rounded-xl border border-slate-300 px-4"
                        placeholder="Search destinations or keywords…"
                        value={q}
                        onChange={e => setQ(e.target.value)}
                    />
                    <select
                        className="h-12 rounded-xl border border-slate-300 px-4"
                        value={type}
                        onChange={e => setType(e.target.value)}
                    >
                        <option value="">All types</option>
                        {types.map(t => (
                            <option key={t} value={t}>
                                {t}
                            </option>
                        ))}
                    </select>
                    <select
                        className="h-12 rounded-xl border border-slate-300 px-4"
                        value={String(minOff)}
                        onChange={e => setMinOff(Number(e.target.value))}
                    >
                        <option value={0}>Any discount</option>
                        <option value={10}>Min 10% off</option>
                        <option value={15}>Min 15% off</option>
                        <option value={20}>Min 20% off</option>
                        <option value={30}>Min 30% off</option>
                    </select>
                    <select
                        className="h-12 rounded-xl border border-slate-300 px-4"
                        value={sort}
                        onChange={e => setSort(e.target.value as any)}
                    >
                        <option value="popular">Sort: Popular</option>
                        <option value="highOff">Sort: Highest % off</option>
                        <option value="priceLow">Sort: Price low → high</option>
                        <option value="priceHigh">Sort: Price high → low</option>
                    </select>
                </div>

                {/* Grid */}
                <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filtered.map(d => (
                        <DealCard key={d.slug} deal={d} />
                    ))}
                    {!filtered.length && (
                        <div className="col-span-full rounded-xl border border-dashed p-10 text-center text-slate-600">
                            No deals match your filters.
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
