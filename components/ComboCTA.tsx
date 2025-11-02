// app/components/ComboCTA.tsx
"use client";

import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa"; // ✅ Add this at the top of ComboCTA.tsx


type ComboCTAProps = {
    bookingHref?: string;                // where the Book button goes (e.g. "/contact" or "/#contact")
    phoneE164?: string;                  // tel: value, e.g. "+60123456789"
    whatsappPhone?: string;              // WhatsApp number WITHOUT '+', e.g. "60123456789"
    defaultMessage?: string;             // default WhatsApp message
    label?: string;                      // desktop floating button label
    showOnDesktop?: boolean;
    showOnMobileBar?: boolean;
    autoHideOnRoutes?: string[];         // e.g. ["/tours/"]
    observePrimarySelector?: string;     // e.g. "#primary-tour-cta" (to auto-hide when visible)
};

function addQueryParam(href: string, key: string, value?: string | null) {
    if (!value) return href;
    try {
        // Handle anchors and relative paths safely
        const hasOrigin = href.startsWith("http");
        const url = new URL(hasOrigin ? href : `https://x.local${href}`);
        url.searchParams.set(key, value);
        const final = hasOrigin ? url.toString() : url.pathname + (url.search || "") + (url.hash || "");
        return final;
    } catch {
        return href;
    }
}

export default function ComboCTA({
    bookingHref = "/contact", // change to "/#contact" if your form is on the homepage
    phoneE164 = "+60123456789",
    whatsappPhone = "60123456789",
    defaultMessage = "Hi! I'm interested in your tours. Could you share dates and prices?",
    label = "Book / Chat",
    showOnDesktop = true,
    showOnMobileBar = true,
    autoHideOnRoutes = ["/tours/"],
    observePrimarySelector = "#primary-tour-cta",
}: ComboCTAProps) {
    const pathname = usePathname() ?? "/";
    const searchParams = useSearchParams();
    const currentTour = searchParams?.get("tour") ?? "";

    const [shouldHide, setShouldHide] = useState(false);
    const [contextMsg, setContextMsg] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const menuRef = useRef<HTMLDivElement | null>(null);

    const onTourRoute = autoHideOnRoutes.some((p) => pathname.startsWith(p));

    // Auto-hide when the primary tour CTA is visible
    useEffect(() => {
        if (!onTourRoute) {
            setShouldHide(false);
            return;
        }
        const el = document.querySelector(observePrimarySelector);
        if (!el) {
            setShouldHide(false);
            return;
        }
        observerRef.current?.disconnect();
        observerRef.current = new IntersectionObserver(
            (entries) => setShouldHide(entries[0]?.isIntersecting ?? false),
            { threshold: 0.2 }
        );
        observerRef.current.observe(el);
        return () => observerRef.current?.disconnect();
    }, [onTourRoute, observePrimarySelector]);

    // Read data attributes for contextual WhatsApp message
    useEffect(() => {
        const el = document.querySelector(observePrimarySelector) as
            | (HTMLAnchorElement & {
                dataset: { tourTitle?: string; tourSlug?: string; tourPrice?: string };
            })
            | null;
        if (!el) {
            setContextMsg(null);
            return;
        }
        const title = el.dataset.tourTitle;
        const slug = el.dataset.tourSlug;
        const price = el.dataset.tourPrice;
        if (title) {
            const msg = `Hi! I'd like to book the tour "${title}"${price ? ` (from ${price})` : ""
                }${slug ? ` [${slug}]` : ""}. Are there available dates?`;
            setContextMsg(msg);
        } else {
            setContextMsg(null);
        }
    }, [pathname, observePrimarySelector]);

    // Build WhatsApp URL (include tour context if we have it)
    const waUrl = useMemo(() => {
        const base = contextMsg || defaultMessage;
        const withTour = currentTour ? `${base} (tour: ${currentTour})` : base;
        return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(withTour)}`;
    }, [whatsappPhone, contextMsg, defaultMessage, currentTour]);

    // Build booking href with ?tour= when relevant
    const bookingHrefWithParams = useMemo(
        () => addQueryParam(bookingHref, "tour", currentTour || undefined),
        [bookingHref, currentTour]
    );

    // Desktop menu open/close handlers
    const toggleMenu = useCallback(() => setOpen((v) => !v), []);
    const closeMenu = useCallback(() => setOpen(false), []);
    useEffect(() => {
        function onDocClick(e: MouseEvent) {
            if (!menuRef.current) return;
            if (!menuRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        function onEsc(e: KeyboardEvent) {
            if (e.key === "Escape") setOpen(false);
        }
        document.addEventListener("mousedown", onDocClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDocClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    // If we’re on a tours page and the primary CTA is visible, don’t render:
    if (onTourRoute && shouldHide) return null;

    return (
        <>
            {/* Mobile sticky footer bar */}
            {showOnMobileBar && (
                <div className="fixed bottom-0 left-0 right-0 z-40 flex items-stretch gap-2 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 p-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] md:hidden">
                    {/* Call */}
                    <a
                        href={`tel:${phoneE164}`}
                        className="flex-1 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-neutral-200 px-3 py-2.5 text-sm font-semibold"
                        aria-label="Call us"
                    >
                        <span className="text-base leading-none">📞</span>
                        <span>Call</span>
                    </a>

                    {/* WhatsApp */}
                    <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-neutral-200 px-3 py-2.5 text-sm font-semibold text-green-600"
                        aria-label="Chat on WhatsApp"
                    >
                        <FaWhatsapp size={18} className="text-green-600" />
                        <span>WhatsApp</span>
                    </a>

                    {/* Book Now */}
                    <Link
                        href={bookingHref}
                        className="flex-1 flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl bg-amber-500 px-3 py-2.5 text-sm font-semibold text-white"
                        aria-label="Book now"
                    >
                        <span className="text-base leading-none">🗓️</span>
                        <span>Book&nbsp;Now</span>
                    </Link>
                </div>
            )}



            {/* Desktop floating pill with popover menu */}
            {showOnDesktop && (
                <div className="hidden md:block">
                    <div className="fixed bottom-6 right-6 z-40" ref={menuRef}>
                        <button
                            type="button"
                            onClick={toggleMenu}
                            className="rounded-full bg-amber-500 px-5 py-3 text-white font-semibold shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
                            aria-haspopup="menu"
                            aria-expanded={open}
                            title={contextMsg ?? defaultMessage}
                        >
                            {label}
                        </button>

                        {open && (
                            <div
                                role="menu"
                                aria-label="Contact options"
                                className="mt-2 w-56 rounded-2xl border border-neutral-200 bg-white shadow-xl p-1"
                            >
                                <a
                                    role="menuitem"
                                    href={`tel:${phoneE164}`}
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-neutral-50"
                                    onClick={closeMenu}
                                >
                                    <span>📞</span>
                                    <span className="font-medium">Call</span>
                                </a>
                                <a
                                    role="menuitem"
                                    href={waUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-neutral-50"
                                    onClick={closeMenu}
                                >
                                    <FaWhatsapp size={18} className="text-green-600" />
                                    <span className="font-medium">WhatsApp</span>
                                </a>
                                <Link
                                    role="menuitem"
                                    href={bookingHrefWithParams}
                                    className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-neutral-50"
                                    onClick={closeMenu}
                                >
                                    <span>🗓️</span>
                                    <span className="font-medium">Book Now</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
