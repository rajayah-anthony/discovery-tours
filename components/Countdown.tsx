"use client";

import { useEffect, useMemo, useState } from "react";

function pad(n: number) {
    return n.toString().padStart(2, "0");
}

export default function Countdown({ endsAt }: { endsAt: Date }) {
    const [now, setNow] = useState<Date>(new Date());

    useEffect(() => {
        const t = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const diff = useMemo(() => {
        const ms = endsAt.getTime() - now.getTime();
        if (ms <= 0) return { d: 0, h: 0, m: 0, s: 0, expired: true };
        const d = Math.floor(ms / (1000 * 60 * 60 * 24));
        const h = Math.floor((ms / (1000 * 60 * 60)) % 24);
        const m = Math.floor((ms / (1000 * 60)) % 60);
        const s = Math.floor((ms / 1000) % 60);
        return { d, h, m, s, expired: false };
    }, [now, endsAt]);

    if (diff.expired) {
        return (
            <span className="text-sm font-semibold text-slate-600">
                Promo ended
            </span>
        );
    }

    return (
        <div className="inline-flex items-center gap-2 rounded-xl bg-emerald-50 ring-1 ring-emerald-200 px-3 py-1.5">
            <span className="text-xs uppercase tracking-wide text-emerald-700">Ends in</span>
            <span className="font-mono text-sm text-emerald-900">
                {diff.d}d {pad(diff.h)}:{pad(diff.m)}:{pad(diff.s)}
            </span>
        </div>
    );
}
