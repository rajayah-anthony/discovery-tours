// app/experiences/islands/page.tsx
import Link from "next/link";
import { Sun, Ship, Umbrella, MapPin, Clock } from "lucide-react";

export const metadata = {
    title: "Islands & Beaches | Discovery Tours",
    description:
        "Snorkel days, island hopping, and barefoot sunsets across Sabah, Borneo, and beyond (demo).",
};

type IslandCard = {
    slug: string;
    title: string;
    location: string;
    duration: string;
    vibe: "Chill" | "Active" | "Family";
    blurb: string;
    priceFrom?: string;
    tags?: string[];
};

const experiencesNav = [
    { label: "Adventure", href: "/experiences/adventure" },
    { label: "Wildlife", href: "/experiences/wildlife" },
    { label: "Islands & Beaches", href: "/experiences/islands", active: true },
    { label: "Culture & Heritage", href: "/experiences/culture" },
    { label: "Nature & Scenic", href: "/experiences/nature" },
    { label: "Family Friendly", href: "/experiences/family" },
];

const cards: IslandCard[] = [
    {
        slug: "tarp-island-hopping",
        title: "TARP Island Hopping (Demo)",
        location: "Kota Kinabalu — Manukan / Mamutik / Sapi",
        duration: "Full Day",
        vibe: "Family",
        blurb:
            "Crystal shallows, easy snorkel spots, and a beach-club vibe minutes from KK. Perfect for first-timers.",
        priceFrom: "RM220",
        tags: ["Snorkel", "Boat", "BBQ"],
    },
    {
        slug: "sempona-reef-day",
        title: "Semporna Reef Day (Demo)",
        location: "Semporna — Mabul / Kapalai (view of Sipadan)",
        duration: "Full Day",
        vibe: "Active",
        blurb:
            "World-class reefs, turtles, and that unreal sandbar blue. Guided snorkeling for non-divers.",
        priceFrom: "RM380",
        tags: ["Reef", "Turtles", "Sandbar"],
    },
    {
        slug: "langkawi-4d3n",
        title: "Langkawi 4D3N (Demo)",
        location: "Langkawi, Kedah",
        duration: "4D3N",
        vibe: "Chill",
        blurb:
            "SkyBridge views by day, golden beaches by sunset. A relaxed island escape with light adventure options.",
        priceFrom: "RM1,280",
        tags: ["SkyBridge", "Sunset", "Resort"],
    },
    {
        slug: "mantanani-hideaway",
        title: "Mantanani Hideaway (Demo)",
        location: "Kota Belud — Mantanani",
        duration: "2D1N / 3D2N",
        vibe: "Chill",
        blurb:
            "Laid-back bungalows, calm lagoons, and stars for days. Off-grid feels without the stress.",
        priceFrom: "RM590",
        tags: ["Chill", "Snorkel", "Stay"],
    },
    {
        slug: "sunset-cruise-kk",
        title: "Sunset Cruise KK (Demo)",
        location: "Kota Kinabalu Waterfront",
        duration: "2 Hours",
        vibe: "Family",
        blurb:
            "Golden hour on deck with live music and city skyline views. Easy, scenic, and photogenic.",
        priceFrom: "RM160",
        tags: ["Cruise", "Sunset", "Music"],
    },
    {
        slug: "redang-snorkel-escape",
        title: "Redang Snorkel Escape (Demo)",
        location: "Pulau Redang, Terengganu",
        duration: "3D2N",
        vibe: "Active",
        blurb:
            "House-reef corals right off the beach. Clear water, soft sand, and simple island routines.",
        priceFrom: "RM980",
        tags: ["East Coast", "Reef", "Resort"],
    },
];

function VibeBadge({ vibe }: { vibe: IslandCard["vibe"] }) {
    const styles =
        vibe === "Active"
            ? "bg-sky-50 text-sky-700 ring-sky-200"
            : vibe === "Family"
                ? "bg-amber-50 text-amber-700 ring-amber-200"
                : "bg-emerald-50 text-emerald-700 ring-emerald-200";
    const Icon = vibe === "Active" ? Ship : vibe === "Family" ? Sun : Umbrella;
    return (
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${styles}`}>
            <Icon className="h-3.5 w-3.5" />
            {vibe}
        </span>
    );
}

export default function IslandsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
            {/* --- Hero --- */}
            <section className="relative overflow-hidden">
                <div className="mx-auto max-w-7xl px-6 pt-12 pb-8">
                    <div className="flex flex-wrap items-start justify-between gap-6">
                        <div>
                            <p className="text-sm font-semibold tracking-wider text-sky-700/90">Experiences</p>
                            <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Islands & Beaches
                            </h1>
                            <p className="mt-3 max-w-2xl text-gray-600">
                                Snorkel, island-hop, and chase sunsets. This is a <span className="font-medium text-gray-800">demo</span> showcase—real packages will appear once connected to your CMS.
                            </p>
                        </div>

                        <div className="rounded-2xl bg-white/70 backdrop-blur ring-1 ring-gray-200 p-4 md:p-5">
                            <div className="flex items-center gap-3">
                                <Umbrella className="h-6 w-6 text-sky-600" />
                                <div>
                                    <p className="text-sm text-gray-500">Prefer mountains or wildlife?</p>
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
                                                ? "bg-sky-600 text-white ring-sky-600"
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
                            <div className="h-28 bg-gradient-to-br from-sky-200 via-sky-100 to-white grid place-content-center">
                                <Ship className="h-8 w-8 text-sky-700 opacity-80" />
                            </div>

                            <div className="p-6">
                                <div className="flex items-center justify-between gap-2">
                                    <VibeBadge vibe={c.vibe} />
                                    {c.priceFrom && (
                                        <span className="text-sm font-semibold text-gray-900">
                                            from {c.priceFrom}
                                        </span>
                                    )}
                                </div>

                                <h3 className="mt-3 text-lg font-semibold text-gray-900 group-hover:text-sky-700">
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
                                                className="rounded-full bg-sky-50 text-sky-800 ring-1 ring-sky-200 px-2.5 py-1 text-xs"
                                            >
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <div className="mt-6 flex items-center gap-3">
                                    <Link
                                        href={`/tours/${c.slug}`}
                                        className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                                    >
                                        View details
                                    </Link>
                                    <span className="text-xs text-gray-500">Demo only — will link to real tour</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* --- Bottom CTA --- */}
                <div className="mt-10 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6 ring-1 ring-gray-200 md:flex-row md:gap-6">
                    <p className="text-center text-sm text-gray-700">Can’t find your dream island plan?</p>
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
