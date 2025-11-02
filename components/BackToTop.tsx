"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    if (!visible) return null;

    return (
        <>
            {/* Mobile-only button (above ComboCTA mobile bar) */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-24 right-4 z-50 rounded-full bg-slate-700 text-white p-3 shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 md:hidden"
                aria-label="Back to top"
                title="Back to top"
            >
                ↑
            </button>

            {/* Desktop-only button (shifted up/right to avoid desktop ComboCTA) */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hidden md:inline-flex fixed bottom-24 right-6 z-50 rounded-full bg-slate-700 text-white p-3 shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400"
                aria-label="Back to top"
                title="Back to top"
            >
                ↑
            </button>
        </>
    );
}
