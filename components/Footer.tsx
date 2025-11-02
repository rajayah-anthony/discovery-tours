"use client";
import Link from "next/link";
import Image from "next/image";

const nav = [
    { href: "/", label: "Home" },
    { href: "/contact", label: "Contact" },
    { href: "/tours/kinabalu-sunrise-hike", label: "Kinabalu Hike" },
    { href: "/tours/klias-river-cruise", label: "Klias River Cruise" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="mt-16 border-t bg-white/60 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Top */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
                    {/* Brand */}
                    <div className="space-y-3">
                        <Link href="/" className="inline-flex items-center gap-2">
                            <Image
                                src="/images/logo.png"
                                alt="Discovery Tours"
                                width={36}
                                height={36}
                                className="rounded"
                            />
                            <span className="text-lg font-semibold tracking-tight">
                                Discovery Tours
                            </span>
                        </Link>
                        <p className="text-sm text-gray-600">
                            Sabah-based adventures, day trips, and island escapes—curated for locals and visitors.
                        </p>

                        {/* Socials */}
                        <div className="flex items-center gap-3 pt-1">
                            <Link
                                href="https://facebook.com/"
                                aria-label="Facebook"
                                className="rounded p-2 hover:bg-gray-100"
                            >
                                {/* Facebook icon */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                                    <path d="M22 12.06C22 6.52 17.52 2 12 2S2 6.52 2 12.06c0 4.99 3.66 9.13 8.44 9.94v-7.03H7.9v-2.91h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34v7.03C18.34 21.19 22 17.05 22 12.06z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://instagram.com/"
                                aria-label="Instagram"
                                className="rounded p-2 hover:bg-gray-100"
                            >
                                {/* Instagram icon */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                                    <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2.2A2.8 2.8 0 1 0 14.8 12 2.8 2.8 0 0 0 12 9.2zM18.5 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://tiktok.com/"
                                aria-label="TikTok"
                                className="rounded p-2 hover:bg-gray-100"
                            >
                                {/* TikTok icon */}
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-gray-700">
                                    <path d="M21 8.5a7.5 7.5 0 0 1-4.4-1.4v6.34A6.46 6.46 0 1 1 9.1 7.1v2.72a3.74 3.74 0 1 0 2.59 3.56V2h2.88A4.61 4.61 0 0 0 18 5.73 4.6 4.6 0 0 0 21 6.6z" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                            Quick Links
                        </h4>
                        <ul className="space-y-2 text-sm">
                            {nav.map((n) => (
                                <li key={n.href}>
                                    <Link href={n.href} className="text-gray-700 hover:text-gray-900">
                                        {n.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                            Contact
                        </h4>
                        <ul className="space-y-2 text-sm text-gray-700">
                            <li>Kota Kinabalu, Sabah, MY</li>
                            <li><a href="tel:+60123456789" className="hover:text-gray-900">+60 12-345 6789</a></li>
                            <li><a href="mailto:hello@discoverytours.my" className="hover:text-gray-900">hello@discoverytours.my</a></li>
                        </ul>
                    </div>

                    {/* Newsletter (demo only) */}
                    <div>
                        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-800">
                            Get Updates
                        </h4>
                        <p className="mb-3 text-sm text-gray-600">
                            New tours, promos, and tips—straight to your inbox.
                        </p>
                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex w-full max-w-sm items-center gap-2"
                        >
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-gray-900"
                            />
                            <button
                                type="submit"
                                className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:opacity-90"
                            >
                                Subscribe
                            </button>
                        </form>
                        <p className="mt-2 text-xs text-gray-500">Demo only — no emails sent.</p>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-gray-600 sm:flex-row">
                    <p>© {year} Discovery Tours. All rights reserved.</p>
                    <div className="flex items-center gap-4">
                        <Link href="/terms" className="hover:text-gray-900">Terms</Link>
                        <span className="text-gray-300">•</span>
                        <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
