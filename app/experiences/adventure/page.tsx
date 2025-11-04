// app/experiences/adventure/page.tsx
import Link from "next/link";
import { Mountain, MapPin, Clock, Footprints } from "lucide-react";

export const metadata = {
    title: "Adventure | Discovery Tours",
    description:
        "Hikes, treks, and adrenaline-packed outdoor experiences across Sabah & Borneo.",
};

type AdventureCard = {
    slug: string;
    title: string;
    location: string;
    duration: string;
    difficulty: "Easy" | "Moderate" | "Challenging";
    blurb: string;
    priceFrom?: string;
    tags?: string[];
};

const experiencesNav = [
    { label: "Adventure", href: "/experiences/adventure", active: true },
    { label: "Wildlife", href: "/experiences/wildlife" },
    { label: "Islands & Beaches", href: "/experiences/islands" },
    { label: "Culture & Heritage", href: "/experiences/culture" },
    { label: "Nature & Scenic", href: "/experiences/nature" },
    { label: "Family Friendly", href: "/experiences/family" },
];

const cards: AdventureCard[] = [
    {
        slug: "kinabalu-sunrise-hike",
        title: "Kinabalu Sunrise Hike (Demo)",
        location: "Kundasang, Sabah",
        duration: "Full Day",
        difficulty: "Challenging",
        blurb:
            "Beat the dawn chill and watch the sky ignite above Borneo’s crown jewel. For fit hikers who love early starts.",
        priceFrom: "RM350",
        tags: ["Mountain", "Sunrise", "Guided"],
    },
    {
        slug: "crocker-range-trek",
        title: "Crocker Range Trek (Demo)",
        location: "Tambunan / Crocker Range",
        duration: "2D1N / 3D2N",
        difficulty: "Moderate",
        blurb:
            "Undulating rainforest trails, chilly streams, and ridge-top vistas. A classic Sabah trek that never gets old.",
        priceFrom: "RM680",
        tags: ["Rainforest", "Camping", "Panorama"],
    },
    {
        slug: "via-ferrata-zipline",
        title: "Via Ferrata & Zipline (Demo)",
        location: "Kinabalu Park",
        duration: "Half / Full Day",
        difficulty: "Moderate",
        blurb:
            "Clipped to steel cables with sheer drops below—safe, guided, and wildly memorable. Zipline finale included!",
        priceFrom: "RM520",
        tags: ["Adrenaline", "Cliffside", "Guided"],
    },
];

function DifficultyBadge({ level }: { level: AdventureCard["difficulty"] }) {
    const styles =
        level === "Challenging"
            ? "bg-rose-50 text-rose-700 ring-rose-200"
            : level === "Moderate"
                ? "bg-amber-50 text-amber-700 ring-amber-200"
                : "bg-emerald-50 text-emerald-700 ring-emerald-200";
    return (
        <span
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles}`}
        >
            <Mountain className="h-3.5 w-3.5" />
            {level}
        </span>
    );
}

export default function AdventurePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            {/* --- Hero --- */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold tracking-wider text-amber-700/90">
                                Experiences
                            </p>
                            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Adventure
                            </h1>
                            <p className="mt-3 max-w-2xl text-gray-600">
                                Thrilling hikes, ridge treks, and safe—guided adrenaline. This is a{" "}
                                <span className="font-medium text-gray-800">demo</span> showcase. Real listings
                                will appear here once activated in your CMS.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4 md:p-5">
                            <div className="flex items-center gap-3">
                                <Footprints className="h-6 w-6 text-amber-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Looking for something else?</p>
                                    <p className="text-sm font-medium text-gray-800">
                                        Browse all experiences &rarr;
                                    </p>
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
                            {/* Simple graphic header (keeps page image-agnostic) */}
                            <div className="h-28 bg-gradient-to-br from-amber-200 via-amber-100 to-white grid place-content-center">
                                <Mountain className="h-8 w-8 text-amber-700 opacity-80" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between gap-2">
                                    <DifficultyBadge level={c.difficulty} />
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

                                {/* Tags */}
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

                                {/* CTA row */}
                                <div className="mt-6 flex items-center gap-3">
                                    <Link
                                        href={`/tours/${c.slug}`}
                                        className="inline-flex items-center justify-center rounded-lg bg-amber-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
                                    >
                                        View details
                                    </Link>

                                    <span className="text-xs text-gray-500">
                                        Demo only — route to real tour when ready
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* --- Bottom CTA --- */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-gray-200 md:flex-row md:gap-6">
                    <p className="text-center text-sm text-gray-700">
                        Can’t find the exact adventure you want?
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
