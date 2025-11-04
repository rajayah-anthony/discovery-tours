// components/StickyDealBar.tsx
"use client";

import * as React from "react";

type Props = {
    active: boolean;
    price: number;
    original: number;
    href: string;
    expiredLabel?: string;
    className?: string;
};

export default function StickyDealBar({
    active,
    price,
    original,
    href,
    expiredLabel = "Deal expired",
    className = "",
}: Props) {
    return (
        <div className={`md:hidden fixed inset-x-0 bottom-0 z-40 ${className}`}>
            <div className="mx-auto max-w-7xl px-4 pb-4">
                <div className="rounded-2xl shadow-lg ring-1 ring-slate-200 bg-white p-4 flex items-center justify-between gap-3">
                    <div>
                        <div className="text-xs text-slate-500 line-through">RM{original}</div>
                        <div className="text-xl font-extrabold">RM{price}</div>
                    </div>

                    {active ? (
                        <a
                            href={href}
                            className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700"
                        >
                            Book on WhatsApp
                        </a>
                    ) : (
                        <button
                            disabled
                            className="inline-flex items-center justify-center px-4 py-3 rounded-xl bg-slate-400 text-white font-medium cursor-not-allowed"
                        >
                            {expiredLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
