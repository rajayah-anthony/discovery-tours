// app/experiences/family/page.tsx
import Link from "next/link";
import { MapPin, Clock, Users, Sun, BookOpen, Sparkles } from "lucide-react";

export const metadata = {
    title: "Family Friendly | Discovery Tours",
    description:
        "Easy-paced, kid-approved experiences—islands, wildlife, and gentle scenic days (demo).",
};

type FamilyCard = {
    slug: string;
    title: string;
    location: string;
    duration: string;
    theme: "Easy" | "Learning" | "Playtime";
    blurb: string;
    priceFrom?: string;
    tags?: string[];
};

const experiencesNav = [
    { label: "Adventure", href: "/experiences/adventure" },
    { label: "Wildlife", href: "/experiences/wildlife" },
    { label: "Islands & Beaches", href: "/experiences/islands" },
    { label: "Culture & Heritage", href: "/experiences/culture" },
    { label: "Nature & Scenic", href: "/experiences/nature" },
    { label: "Family Friendly", href: "/experiences/family", active: true },
];

const cards: FamilyCard[] = [
    {
        slug: "tarp-family-island-day",
        title: "TARP Family Island Day (Demo)",
        location: "KK — Manukan / Mamutik / Sapi",
        duration: "Full Day",
        theme: "Playtime",
        blurb:
            "Shallow lagoons, beginner-friendly snorkel spots, and plenty of shade. Great for mixed ages.",
        priceFrom: "RM220",
        tags: ["Snorkel", "Beach Time", "Boat"],
    },
    {
        slug: "desa-dairy-family",
        title: "Desa Dairy + Kundasang Easy Day (Demo)",
        location: "Kundasang",
        duration: "Full Day",
        theme: "Easy",
        blurb:
            "Alpine-style pastures, fresh dairy treats, and short scenic stops—zero rushing, maximum smiles.",
        priceFrom: "RM180",
        tags: ["Views", "Treats", "Photo Spots"],
    },
    {
        slug: "lok-kawi-zoo-museum",
        title: "Lok Kawi & Marine Museum Combo (Demo)",
        location: "KK / UMS",
        duration: "Half / Full Day",
        theme: "Learning",
        blurb:
            "A gentle wildlife stop plus aquaria & touch-and-learn exhibits—fun, educational, and close to town.",
        priceFrom: "RM190",
        tags: ["Wildlife", "Aquaria", "Easy"],
    },
    {
        slug: "sunset-cruise-family",
        title: "KK Sunset Cruise (Family) (Demo)",
        location: "KK Waterfront",
        duration: "2 Hours",
        theme: "Easy",
        blurb:
            "Golden hour views, light music, and comfy seating. Stroller-friendly with deck railings.",
        priceFrom: "RM160",
        tags: ["Sunset", "City Skyline", "Music"],
    },
    {
        slug: "mari-mari-kids",
        title: "Mari Mari Cultural Village (Kids Focus) (Demo)",
        location: "Inanam / KK Outskirts",
        duration: "Half Day",
        theme: "Learning",
        blurb:
            "Hands-on demos (fire-making, blowpipe) and bite-size culture stories designed to keep kids engaged.",
        priceFrom: "RM220",
        tags: ["Hands-on", "Snacks", "Culture"],
    },
    {
        slug: "poring-canopy-easy",
        title: "Poring Hot Springs + Easy Canopy (Demo)",
        location: "Poring / Ranau",
        duration: "Full Day",
        theme: "Playtime",
        blurb:
            "Short canopy walk options, shallow soak pools, and plenty of rest areas—doable with little ones.",
        priceFrom: "RM220",
        tags: ["Soak", "Shade", "Short Walks"],
    },
];

function ThemeBadge({ theme }: { theme: FamilyCard["theme"] }) {
    const map = {
        Easy: { cls: "bg-amber-50 text-amber-700 ring-amber-200", Icon: Sun },
        Learning: { cls: "bg-indigo-50 text-indigo-700 ring-indigo-200", Icon: BookOpen },
        Playtime: { cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", Icon: Sparkles },
    } as const;
    const { cls, Icon } = map[theme];
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${cls}`}
        >
            <Icon className="h-3.5 w-3.5" />
            {theme}
        </span>
    );
}

export default function FamilyFriendlyPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50/70 to-white">
            {/* --- Hero --- */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold tracking-wider text-amber-700/90">
                                Experiences
                            </p>
                            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Family Friendly
                            </h1>
                            <p className="mt-3 max-w-2xl text-gray-600">
                                Easy-paced days, stroller-friendly stops, and kid-approved fun. This is a{" "}
                                <span className="font-medium text-gray-800">demo</span> showcase—real listings will
                                appear once connected to your CMS.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4 md:p-5">
                            <div className="flex items-center gap-3">
                                <Users className="h-6 w-6 text-amber-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Prefer islands or wildlife?</p>
                                    <p className="text-sm font-medium text-gray-800">Switch categories below →</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- Sub-Navbar: Experiences --- */}
                    <nav className="mt-8 -mx-2 overflow-x-auto">
                        <ul className="flex min-w-full gap-2 pb-1">
                            {experiencesNav.map((item) => (
                                <li key={item.label} className="shrink-0">
                                    <Link
                                        href={item.href}
                                        className={[
                                            "inline-flex items-center rounded-full px-4 py-2 text-sm ring-1 transition",
                                            item.active
                                                ? "bg-amber-600 text-white ring-amber-600"
                                                : "bg-white text-gray-700 ring-gray-200 hover:bg-gray-50",
                                        ].join(" ")}
                                        aria-current={item.active ? "page" : undefined}
                                        title={item.active ? "You’re here" : "Coming soon"}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </section>

            {/* --- Cards --- */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {cards.map((c) => (
                        <article
                            key={c.slug}
                            className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition hover:shadow-lg"
                        >
                            {/* Simple graphic header (image-agnostic) */}
                            <div className="h-28 bg-gradient-to-br from-amber-200 via-amber-100 to-white grid place-content-center">
                                <Users className="h-8 w-8 text-amber-700 opacity-80" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between gap-2">
                                    <ThemeBadge theme={c.theme} />
                                    {c.priceFrom && (
                                        <span className="text-sm font-semibold text-gray-900">
                                            from {c.priceFrom}
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-amber-700">
                                    {c.title}
                                </h3>

                                <p className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="h-4 w-4" />
                                    {c.location}
                                </p>
                                <p className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    {c.duration}
                                </p>

                                <p className="mt-3 text-sm text-gray-700">{c.blurb}</p>

                                {c.tags && c.tags.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {c.tags.map((t) => (
                                            <span
                                                key={t}
                                                className="rounded-full bg-amber-50 text-amber-800 ring-1 ring-amber-200 px-2.5 py-1 text-xs"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 flex items-center gap-3">
                                    <Link
                                        href={`/tours/${c.slug}`}
                                        className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                                    >
                                        View details
                                    </Link>
                                    <span className="text-xs text-gray-500">
                                        Demo only — will link to real tour
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* --- Bottom CTA --- */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-gray-200 md:flex-row md:gap-6">
                    <p className="text-center text-sm text-gray-700">
                        Need pram-friendly, nap-safe timing, or multi-gen pacing?
                    </p>
                    <div className="flex gap-3">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
                        >
                            Talk to a planner
                        </Link>
                        <Link
                            href="/book-now"
                            className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50"
                        >
                            Quick enquiry
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
