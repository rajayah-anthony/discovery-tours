"use client";
import { deals, isActiveDeal } from "../lib/deals";
import DealCard from "./DealCard";

export default function FeaturedDeals() {
    const items = deals.filter(d => d.featured && isActiveDeal(d)).slice(0, 6);
    if (!items.length) return null;

    return (
        <section className="mx-auto max-w-7xl px-6 py-14">
            <div className="flex items-end justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wider text-emerald-700">Featured</p>
                    <h2 className="text-2xl md:text-3xl font-bold">Hot Deals this week</h2>
                </div>
                <a href="/deals" className="text-sm text-emerald-700 hover:underline">See all deals →</a>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {items.map(d => <DealCard key={d.slug} deal={d} />)}
            </div>
        </section>
    );
}
