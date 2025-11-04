"use client";
import { getDiscountPercent } from "../lib/deals";
import type { Deal } from "../lib/deals";

export default function DiscountBadge({ deal }: { deal: Deal }) {
    const pct = getDiscountPercent(deal);
    if (pct <= 0) return null;
    return (
        <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2.5 py-1 text-xs font-semibold">
            {pct}% OFF
        </span>
    );
}
