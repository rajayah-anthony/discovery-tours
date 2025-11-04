// app/experiences/nature/page.tsx
import Link from "next/link";
import { MapPin, Clock, Camera, Mountain, Trees } from "lucide-react";

export const metadata = {
    title: "Nature & Scenic | Discovery Tours",
    description:
        "Panoramic drives, misty highlands, waterfalls, and photo-ready vistas across Sabah & Borneo (demo).",
};

type ScenicCard = {
    slug: string;
    title: string;
    location: string;
    duration: string;
    theme: "Highlands" | "Panorama" | "Waterfall" | "Gardens" | "Coastal";
    blurb: string;
    priceFrom?: string;
    tags?: string[];
};

const experiencesNav = [
    { label: "Adventure", href: "/experiences/adventure" },
    { label: "Wildlife", href: "/experiences/wildlife" },
    { label: "Islands & Beaches", href: "/experiences/islands" },
    { label: "Culture & Heritage", href: "/experiences/culture" },
    { label: "Nature & Scenic", href: "/experiences/nature", active: true },
    { label: "Family Friendly", href: "/experiences/family" },
];

const cards: ScenicCard[] = [
    {
        slug: "kundasang-panorama-drive",
        title: "Kundasang Panorama Drive (Demo)",
        location: "Kundasang & Ranau",
        duration: "Full Day",
        theme: "Highlands",
        blurb:
            "Crisp air, vegetable terraces, and Mt. Kinabalu backdrops. Gentle stops for photos and local snacks.",
        priceFrom: "RM260",
        tags: ["Mt. Views", "Cool Weather", "Photo Stops"],
    },
    {
        slug: "poring-hot-springs-canopy",
        title: "Poring Hot Springs + Canopy Walk (Demo)",
        location: "Poring / Ranau",
        duration: "Full Day",
        theme: "Panorama",
        blurb:
            "A leafy canopy walkway and hot spring soak surrounded by rainforest greens. Easy scenic day out.",
        priceFrom: "RM220",
        tags: ["Canopy Walk", "Soak", "Easy"],
    },
    {
        slug: "kionsom-waterfall-escape",
        title: "Kionsom Waterfall Escape (Demo)",
        location: "Inanam / Kionsom",
        duration: "Half Day",
        theme: "Waterfall",
        blurb:
            "Multiple cascade pools and shady jungle ambiance—refreshing and close to the city.",
        priceFrom: "RM120",
        tags: ["Cool Pools", "Short Hike", "Relax"],
    },
    {
        slug: "tenom-agricultural-park",
        title: "Tenom Agricultural Park (Demo)",
        location: "Tenom",
        duration: "Full Day",
        theme: "Gardens",
        blurb:
            "Beautiful themed gardens, orchid collections, and calm walking paths—slow travel at its best.",
        priceFrom: "RM320",
        tags: ["Orchids", "Botanical", "Leisure"],
    },
    {
        slug: "tip-of-borneo-sunset",
        title: "Tip of Borneo Sunset (Demo)",
        location: "Simpang Mengayau, Kudat",
        duration: "Full Day",
        theme: "Coastal",
        blurb:
            "Wide-open capes and golden-hour seascapes where the South China Sea meets the Sulu Sea.",
        priceFrom: "RM350",
        tags: ["Sunset", "Cape", "Photo Spot"],
    },
    {
        slug: "desa-dairy-scenic",
        title: "Desa Dairy Scenic Stop (Demo)",
        location: "Kundasang",
        duration: "Half Day",
        theme: "Highlands",
        blurb:
            "Rolling pastures with alpine vibes, fresh dairy treats, and postcard angles of Kinabalu.",
        priceFrom: "RM180",
        tags: ["Pastures", "Family", "Mt. Views"],
    },
];

function ThemeBadge({ theme }: { theme: ScenicCard["theme"] }) {
    const map = {
        Highlands: { cls: "bg-violet-50 text-violet-700 ring-violet-200", Icon: Mountain },
        Panorama: { cls: "bg-indigo-50 text-indigo-700 ring-indigo-200", Icon: Camera },
        Waterfall: { cls: "bg-sky-50 text-sky-700 ring-sky-200", Icon: Camera },
        Gardens: { cls: "bg-emerald-50 text-emerald-700 ring-emerald-200", Icon: Trees },
        Coastal: { cls: "bg-cyan-50 text-cyan-700 ring-cyan-200", Icon: Camera },
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

export default function NatureScenicPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
            {/* --- Hero --- */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold tracking-wider text-violet-700/90">
                                Experiences
                            </p>
                            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Nature & Scenic
                            </h1>
                            <p className="mt-3 max-w-2xl text-gray-600">
                                Highland drives, tranquil gardens, waterfalls, and coastal viewpoints. This is a{" "}
                                <span className="font-medium text-gray-800">demo</span> showcase—real listings will appear once connected to your CMS.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4 md:p-5">
                            <div className="flex items-center gap-3">
                                <Camera className="h-6 w-6 text-violet-600" />
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
                                                ? "bg-violet-600 text-white ring-violet-600"
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
                            <div className="h-28 bg-gradient-to-br from-violet-200 via-violet-100 to-white grid place-content-center">
                                <Camera className="h-8 w-8 text-violet-700 opacity-80" />
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

                                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-violet-700">
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
                                                className="rounded-full bg-violet-50 text-violet-800 ring-1 ring-violet-200 px-2.5 py-1 text-xs"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 flex items-center gap-3">
                                    <Link
                                        href={`/tours/${c.slug}`}
                                        className="inline-flex items-center justify-center rounded-lg bg-violet-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
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
                        Want a photo-first scenic itinerary?
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
