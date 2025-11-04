"use client";
import Image from "next/image";
import Link from "next/link";
import { isActiveDeal, getDiscountPercent } from "../lib/deals";
import type { Deal } from "../lib/deals";
import DiscountBadge from "./DiscountBadge";

export default function DealCard({ deal }: { deal: Deal }) {
    const active = isActiveDeal(deal);
    const pct = getDiscountPercent(deal);

    return (
        <div className="group overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200 hover:shadow-lg transition">
            <div className="relative aspect-[16/10]">
                <Image src={deal.image} alt={deal.title} fill className="object-cover" />
                <div className="absolute left-3 top-3 flex gap-2">
                    <DiscountBadge deal={deal} />
                    {deal.source && (
                        <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs ring-1 ring-slate-200">
                            {deal.source}
                        </span>
                    )}
                </div>
            </div>

            <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                    <h3 className="text-base font-semibold leading-tight">
                        <Link href={`/deals/${deal.slug}`} className="hover:underline">{deal.title}</Link>
                    </h3>
                    {deal.quotaLeft != null && (
                        <span className="text-xs text-amber-700 bg-amber-50 ring-1 ring-amber-200 px-2 py-0.5 rounded">
                            {deal.quotaLeft} left
                        </span>
                    )}
                </div>

                <p className="mt-1 text-sm text-slate-600">{deal.location} • {deal.duration}</p>
                {deal.highlight && <p className="mt-2 text-sm">{deal.highlight}</p>}

                <div className="mt-4 flex items-end gap-2">
                    <span className="text-lg font-bold">RM{deal.salePrice}</span>
                    <span className="text-sm line-through text-slate-500">RM{deal.originalPrice}</span>
                    {pct > 0 && <span className="text-xs text-emerald-700">Save {pct}%</span>}
                </div>

                <div className="mt-5 flex items-center justify-between">
                    <Link
                        href={`/deals/${deal.slug}`}
                        className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-white font-medium hover:bg-emerald-700"
                    >
                        View Deal
                    </Link>
                    {active ? (
                        deal.promoCode ? <span className="text-xs">Code: <b>{deal.promoCode}</b></span> : null
                    ) : (
                        <span className="text-xs text-slate-500">Expired</span>
                    )}
                </div>
            </div>
        </div>
    );
}
