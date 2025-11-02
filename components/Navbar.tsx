"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { MouseEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/* =======================
   Portal for modal/drawer
======================= */
function ClientPortal({ children }: { children: React.ReactNode }) {
    const elRef = useRef<HTMLDivElement | null>(null);
    if (!elRef.current && typeof document !== "undefined") {
        elRef.current = document.createElement("div");
    }
    useEffect(() => {
        if (!elRef.current) return;
        document.body.appendChild(elRef.current);
        return () => {
            if (elRef.current?.parentNode) document.body.removeChild(elRef.current);
        };
    }, []);
    return elRef.current ? createPortal(children, elRef.current) : null;
}

/* =======================
   Navbar
======================= */
export default function Navbar() {
    const pathname = usePathname() ?? "";

    const [isAdmin, setIsAdmin] = useState(false);
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [lang, setLang] = useState<"en" | "bm">("en");
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] =
        useState<null | "dest" | "exp" | "about" | "help">(null);
    const [mSection, setMSection] =
        useState<null | "dest" | "exp" | "about" | "help">(null);

    const modalRef = useRef<HTMLDivElement | null>(null);
    const firstFieldRef = useRef<HTMLInputElement | null>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);
    const scrollYRef = useRef<number>(0);
    const drawerRef = useRef<HTMLDivElement | null>(null);

    /* Scroll background */
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Prevent layout jump */
    useEffect(() => {
        document.documentElement.style.scrollbarGutter = "stable both-edges";
    }, []);

    const linkBase =
        "relative group transition-colors text-sm text-slate-700 hover:text-sky-700";
    const underline =
        "after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-sky-600 after:transition-transform group-hover:after:scale-x-100";

    const homeHref = (hash: string) => (pathname === "/" ? `#${hash}` : `/#${hash}`);
    const handleHomeHashClick =
        (hash: string) => (e: MouseEvent<HTMLAnchorElement>) => {
            if (pathname === "/") {
                e.preventDefault();
                const el = document.getElementById(hash);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        };

    useEffect(() => {
        const readFlag = () =>
            setIsAdmin(localStorage.getItem("admin_demo_auth") === "true");
        readFlag();
        window.addEventListener("storage", readFlag);
        return () => window.removeEventListener("storage", readFlag);
    }, []);

    const lockBody = () => {
        scrollYRef.current = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollYRef.current}px`;
        document.body.style.width = "100%";
    };
    const unlockBody = () => {
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollYRef.current || 0);
    };

    const openModal = () => {
        previouslyFocused.current = document.activeElement as HTMLElement;
        lockBody();
        setOpen(true);
    };
    const closeModal = () => {
        setOpen(false);
        setError(null);
        setSubmitting(false);
        unlockBody();
        previouslyFocused.current?.focus();
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        await new Promise((r) => setTimeout(r, 600));
        if (
            email.trim().toLowerCase() === "admin@demo.com" &&
            password === "demo123"
        ) {
            localStorage.setItem("admin_demo_auth", "true");
            setIsAdmin(true);
            window.location.href = "/admin";
            return;
        }
        setError("Invalid credentials. Try admin@demo.com / demo123");
        setSubmitting(false);
    };

    const signOut = () => {
        localStorage.removeItem("admin_demo_auth");
        setIsAdmin(false);
        if (pathname.startsWith("/admin")) window.location.href = "/";
    };

    const openDrawer = () => {
        lockBody();
        setDrawerOpen(true);
        setTimeout(() => {
            drawerRef.current?.querySelector<HTMLElement>("a,button")?.focus();
        }, 0);
    };
    const closeDrawer = () => {
        setDrawerOpen(false);
        unlockBody();
        setMSection(null);
    };

    /* Dropdown reusable pattern */
    const dropdown = (
        key: "dest" | "exp" | "about" | "help",
        label: string,
        content: React.ReactNode
    ) => (
        <div
            className="relative"
            onMouseEnter={() => setOpenMenu(key)}
            onMouseLeave={() => setOpenMenu(null)}
        >
            <button
                className={`${linkBase} ${underline} inline-flex items-center gap-2`}
                onFocus={() => setOpenMenu(key)}
                onBlur={() => setOpenMenu(null)}
                aria-haspopup="true"
                aria-expanded={openMenu === key}
            >
                <span>{label}</span>
                <svg width="14" height="14" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
            </button>

            <div className="pointer-events-none absolute left-0 top-full">
                <div
                    className={[
                        "pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl shadow-xl",
                        "transition-all duration-200 ease-out transform origin-top",
                        openMenu === key
                            ? "opacity-100 translate-y-2 visible"
                            : "opacity-0 -translate-y-1 invisible",
                    ].join(" ")}
                    onClick={() => setOpenMenu(null)}
                >
                    {content}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* ===== Desktop Navbar + Centered Mobile Logo ===== */}
            <header
                className={[
                    "sticky top-0 z-40 w-full border-b transition-colors will-change-[background-color,box-shadow]",
                    scrolled
                        ? "bg-white shadow-sm border-slate-200"
                        : "bg-gradient-to-b from-white/80 via-white/50 to-transparent backdrop-blur-md border-white/20",
                ].join(" ")}
            >
                {/* wrapper is relative to anchor the centered mobile logo */}
                <div className="relative max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-6">
                    {/* Left: hamburger + (desktop logo only) */}
                    <div className="flex items-center gap-3">
                        <button
                            aria-label="Open menu"
                            className="md:hidden inline-flex items-center justify-center rounded-md border border-slate-200 p-2 text-slate-600"
                            onClick={openDrawer}
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24">
                                <path
                                    d="M4 6h16M4 12h16M4 18h16"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>

                        {/* Desktop logo (hidden on mobile) */}
                        <Link href="/" className="hidden md:flex items-center">
                            <Image
                                src="/images/logo.png"
                                alt="Discovery Tours Logo"
                                width={140}
                                height={56}
                                className="h-12 w-auto object-contain md:h-14"
                                priority
                            />
                        </Link>
                    </div>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {dropdown(
                            "dest",
                            "Destinations",
                            <div className="p-6 w-[640px] grid grid-cols-2 gap-4">
                                {[
                                    {
                                        name: "Kota Kinabalu",
                                        href: "/destinations/kota-kinabalu",
                                        img: "/images/kk-heritage.jpg",
                                    },
                                    {
                                        name: "Kundasang",
                                        href: "/destinations/kundasang",
                                        img: "/images/kundasang-farm.jpg",
                                    },
                                    {
                                        name: "Sandakan",
                                        href: "/destinations/sandakan",
                                        img: "/images/klias-river.jpg",
                                    },
                                    {
                                        name: "Semporna",
                                        href: "/destinations/semporna",
                                        img: "/images/island-hopping.jpg",
                                    },
                                ].map((d) => (
                                    <Link
                                        key={d.name}
                                        href={d.href}
                                        className="relative overflow-hidden rounded-xl group"
                                    >
                                        <Image
                                            src={d.img}
                                            alt={d.name}
                                            width={320}
                                            height={200}
                                            className="object-cover h-36 w-full group-hover:scale-105 transition-transform"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        <div className="absolute bottom-2 left-3 text-white text-sm font-semibold">
                                            {d.name}
                                        </div>
                                    </Link>
                                ))}

                                {/* All Destinations link */}
                                <Link
                                    href="/destinations"
                                    className="col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-xl border bg-white px-4 py-3 hover:bg-slate-50"
                                >
                                    View all destinations
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-5 w-5"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path d="M5 12h14M13 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        )}

                        {dropdown(
                            "exp",
                            "Experiences",
                            <ul className="text-sm text-slate-700 p-4 w-64">
                                {[
                                    { name: "Adventure", href: "/experiences/adventure" },
                                    { name: "Islands & Beaches", href: "/experiences/islands" },
                                    { name: "Wildlife", href: "/experiences/wildlife" },
                                    { name: "Culture", href: "/experiences/culture" },
                                ].map((x) => (
                                    <li key={x.name}>
                                        <Link
                                            href={x.href}
                                            className="block px-2 py-2 rounded hover:bg-slate-50"
                                        >
                                            {x.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}

                        {dropdown(
                            "about",
                            "About",
                            <ul className="text-sm text-slate-700 p-4 w-64">
                                <li>
                                    <Link
                                        href="/why-choose-us"
                                        className="block px-2 py-2 hover:bg-slate-50 rounded"
                                    >
                                        Why Choose Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/our-story"
                                        className="block px-2 py-2 hover:bg-slate-50 rounded"
                                    >
                                        Our Story
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/meet-the-team"
                                        className="block px-2 py-2 hover:bg-slate-50 rounded"
                                    >
                                        Meet the Team
                                    </Link>
                                </li>
                            </ul>
                        )}

                        {dropdown(
                            "help",
                            "Help",
                            <ul className="text-sm text-slate-700 p-4 w-64">
                                <li>
                                    <Link
                                        href="/faq"
                                        className="block px-2 py-2 hover:bg-slate-50 rounded"
                                    >
                                        FAQ
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/contact"
                                        className="block px-2 py-2 hover:bg-slate-50 rounded"
                                    >
                                        Contact
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </nav>

                    {/* Right side (desktop only) */}
                    <div className="hidden md:flex items-center gap-3">
                        <button
                            onClick={() => setLang((l) => (l === "en" ? "bm" : "en"))}
                            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                            <span className="uppercase">{lang}</span>
                        </button>

                        {!isAdmin ? (
                            <button
                                onClick={openModal}
                                className="inline-flex items-center px-4 py-2 rounded-xl bg-slate-900 text-white text-sm hover:bg-slate-800 transition"
                            >
                                Admin Login
                            </button>
                        ) : (
                            <button
                                onClick={signOut}
                                className="inline-flex items-center px-4 py-2 rounded-xl border border-slate-300 text-sm hover:bg-slate-50"
                            >
                                Sign out
                            </button>
                        )}
                    </div>

                    {/* NEW: Centered mobile logo */}
                    <Link
                        href="/"
                        className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        aria-label="Home"
                    >
                        <Image
                            src="/images/logo.png"
                            alt="Discovery Tours Logo"
                            width={120}
                            height={48}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>
            </header>

            {/* ===== Mobile Drawer with Accordion ===== */}
            {drawerOpen && (
                <ClientPortal>
                    <div className="fixed inset-0 z-[90]" role="dialog" aria-modal="true">
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                            onClick={closeDrawer}
                        />
                        <div
                            ref={drawerRef}
                            className="absolute left-0 top-0 h-full w-[84%] max-w-sm bg-white shadow-2xl rounded-r-3xl p-5 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-5">
                                <Link href="/" onClick={closeDrawer}>
                                    <Image src="/images/logo.png" alt="Discovery Tours" width={120} height={48} />
                                </Link>
                                <button
                                    onClick={closeDrawer}
                                    className="p-2 rounded-md hover:bg-slate-100"
                                    aria-label="Close menu"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Scrollable accordion area */}
                            <div className="space-y-2 overflow-y-auto pr-1">
                                {["dest", "exp", "about", "help"].map((id) => {
                                    const open = mSection === id;
                                    const toggle = () => setMSection(open ? null : (id as any));
                                    const titleMap: Record<string, string> = {
                                        dest: "Destinations",
                                        exp: "Experiences",
                                        about: "About",
                                        help: "Help",
                                    };
                                    return (
                                        <div key={id} className="rounded-xl">
                                            <button
                                                onClick={toggle}
                                                className="flex justify-between items-center w-full px-2 py-3 text-left font-medium text-slate-800 rounded-lg hover:bg-slate-50"
                                                aria-expanded={open}
                                                aria-controls={`sec-${id}`}
                                            >
                                                {titleMap[id]}
                                                <svg
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 24 24"
                                                    className={`transition-transform ${open ? "rotate-180" : ""}`}
                                                >
                                                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" fill="none" />
                                                </svg>
                                            </button>
                                            <div
                                                id={`sec-${id}`}
                                                className={`grid transition-[grid-template-rows,opacity] duration-200 ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                    }`}
                                            >
                                                <div className="overflow-hidden">
                                                    {id === "dest" && (
                                                        <nav className="flex flex-col pb-3 pl-3">
                                                            <Link href="/destinations/kota-kinabalu" onClick={closeDrawer} className="py-2 hover:text-sky-700">Kota Kinabalu</Link>
                                                            <Link href="/destinations/kundasang" onClick={closeDrawer} className="py-2 hover:text-sky-700">Kundasang</Link>
                                                            <Link href="/destinations/sandakan" onClick={closeDrawer} className="py-2 hover:text-sky-700">Sandakan</Link>
                                                            <Link href="/destinations/semporna" onClick={closeDrawer} className="py-2 hover:text-sky-700">Semporna</Link>
                                                            <Link href="/destinations" onClick={closeDrawer} className="py-2 hover:text-sky-700">All Destinations</Link>
                                                        </nav>
                                                    )}
                                                    {id === "exp" && (
                                                        <nav className="flex flex-col pb-3 pl-3">
                                                            <Link href="/experiences/adventure" onClick={closeDrawer} className="py-2 hover:text-sky-700">Adventure</Link>
                                                            <Link href="/experiences/islands" onClick={closeDrawer} className="py-2 hover:text-sky-700">Islands & Beaches</Link>
                                                            <Link href="/experiences/wildlife" onClick={closeDrawer} className="py-2 hover:text-sky-700">Wildlife</Link>
                                                            <Link href="/experiences/culture" onClick={closeDrawer} className="py-2 hover:text-sky-700">Culture</Link>
                                                        </nav>
                                                    )}
                                                    {id === "about" && (
                                                        <nav className="flex flex-col pb-3 pl-3">
                                                            <Link href="/why-choose-us" onClick={closeDrawer} className="py-2 hover:text-sky-700">Why Choose Us</Link>
                                                            <Link href="/our-story" onClick={closeDrawer} className="py-2 hover:text-sky-700">Our Story</Link>
                                                            <Link href="/meet-the-team" onClick={closeDrawer} className="py-2 hover:text-sky-700">Meet the Team</Link>
                                                        </nav>
                                                    )}
                                                    {id === "help" && (
                                                        <nav className="flex flex-col pb-3 pl-3">
                                                            <Link href="/faq" onClick={closeDrawer} className="py-2 hover:text-sky-700">FAQ</Link>
                                                            <Link href="/contact" onClick={closeDrawer} className="py-2 hover:text-sky-700">Contact</Link>
                                                        </nav>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                {/* Language + Admin */}
                                <div className="flex items-center gap-3 pt-4 px-2">
                                    <button
                                        onClick={() => setLang((l) => (l === "en" ? "bm" : "en"))}
                                        className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm"
                                    >
                                        Lang: <span className="uppercase">{lang}</span>
                                    </button>

                                    {!isAdmin ? (
                                        <button
                                            onClick={() => {
                                                closeDrawer();
                                                openModal();
                                            }}
                                            className="inline-flex items-center px-4 py-2 rounded-xl border border-slate-300 text-sm"
                                        >
                                            Admin Login
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                closeDrawer();
                                                signOut();
                                            }}
                                            className="inline-flex items-center px-4 py-2 rounded-xl border border-slate-300 text-sm"
                                        >
                                            Sign out
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </ClientPortal>
            )}

            {/* ===== Admin Login Modal ===== */}
            {open && !isAdmin && (
                <ClientPortal>
                    <div
                        aria-modal="true"
                        role="dialog"
                        aria-labelledby="admin-login-title"
                        className="fixed inset-0 z-[100]"
                    >
                        <div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={closeModal}
                        />
                        <div
                            ref={modalRef}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[92vw] max-w-md max-h-[85vh] overflow-auto
                     rounded-2xl bg-white shadow-2xl border border-slate-200"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <h2 id="admin-login-title" className="text-lg font-semibold">
                                        Admin Login
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="rounded-md p-1 text-slate-500 hover:bg-slate-100"
                                        aria-label="Close"
                                    >
                                        ✕
                                    </button>
                                </div>

                                <form onSubmit={onSubmit} className="mt-4 space-y-4">
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                            Email
                                        </label>
                                        <input
                                            ref={firstFieldRef}
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            autoComplete="username"
                                            required
                                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                                            placeholder="admin@demo.com"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                            Password
                                        </label>
                                        <input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            autoComplete="current-password"
                                            required
                                            className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-sky-500"
                                            placeholder="********"
                                        />
                                    </div>

                                    {error && <p className="text-sm text-red-600">{error}</p>}

                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full inline-flex items-center justify-center rounded-xl bg-sky-600 text-white px-4 py-2 font-medium hover:bg-sky-700 disabled:opacity-60"
                                    >
                                        {submitting ? "Signing in..." : "Sign In"}
                                    </button>

                                    <p className="text-xs text-slate-500 text-center">
                                        Demo login: <span className="font-medium">admin@demo.com / demo123</span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </ClientPortal>
            )}
        </>
    );
}
