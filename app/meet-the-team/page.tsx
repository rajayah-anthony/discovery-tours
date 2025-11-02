// app/meet-the-team/page.tsx
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Meet The Team | Discovery Tours",
    description:
        "The licensed guides, planners, and operations crew behind your Sabah adventures.",
    openGraph: {
        title: "Meet The Team | Discovery Tours",
        description:
            "The licensed guides, planners, and operations crew behind your Sabah adventures.",
        type: "website",
        url: "/meet-the-team",
    },
};

type Member = {
    name: string;
    role: string;
    dept: "Leadership" | "Guides" | "Operations";
    photo?: string; // e.g. "/images/team/alex.jpg"
    bio?: string;
    socials?: Partial<{
        facebook: string;
        instagram: string;
        linkedin: string;
        whatsapp: string;
    }>;
};

const TEAM: Member[] = [
    // Leadership
    {
        name: "Alex Tan",
        role: "Founder • Operations Lead",
        dept: "Leadership",
        photo: "/images/team/alex.jpg",
        bio: "Sabahan born. Loves Kundasang sunrises and logistics done right.",
        socials: { linkedin: "#", whatsapp: "#" },
    },
    {
        name: "Mia Rahman",
        role: "Co-Founder • Guest Experience",
        dept: "Leadership",
        photo: "/images/team/mia-rahman.jpg",
        bio: "Designs hassle-free journeys with a personal touch.",
        socials: { instagram: "#" },
    },

    // Guides
    {
        name: "Johan Michael",
        role: "Licensed Mountain Guide",
        dept: "Guides",
        photo: "/images/team/johan.jpg",
        bio: "Specializes in Kundasang & Crocker Range trails.",
    },
    {
        name: "Farah N.",
        role: "Wildlife & River Cruise Guide",
        dept: "Guides",
        photo: "/images/team/farah.jpg",
        bio: "Proboscis monkies pro. Fireflies whisperer.",
    },
    {
        name: "Hakim Salleh",
        role: "Island & Snorkel Guide",
        dept: "Guides",
        photo: "/images/team/hakim.jpg",
        bio: "Semporna islands and reef etiquette champion.",
    },

    // Operations
    {
        name: "Nadia Ros",
        role: "Bookings & Itineraries",
        dept: "Operations",
        photo: "/images/team/nadia.jpg",
        bio: "Replies fast. Plans faster. Loves neat timelines.",
    },
    {
        name: "Arif Kassim",
        role: "Fleet & Safety",
        dept: "Operations",
        photo: "/images/team/arif.jpg",
        bio: "Vehicle checks, equipment audits, SOPs—every trip, every time.",
    },
];

function Card({ m }: { m: Member }) {
    return (
        <div className="group rounded-2xl border bg-white shadow-sm hover:shadow-md transition">
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl bg-emerald-50">
                {m.photo ? (
                    <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
                    />
                ) : (
                    <div className="h-full w-full flex items-center justify-center text-emerald-700 text-2xl">
                        {m.name.split(" ").map((x) => x[0]).join("").slice(0, 2)}
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{m.name}</h3>
                    <span className="text-xs rounded-full bg-emerald-50 text-emerald-700 px-2 py-1">
                        {m.dept}
                    </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{m.role}</div>
                {m.bio && <p className="mt-3 text-gray-700">{m.bio}</p>}

                {/* Socials */}
                {m.socials && (
                    <div className="mt-4 flex gap-3 text-sm">
                        {m.socials.facebook && (
                            <a className="text-emerald-700 hover:underline" href={m.socials.facebook}>
                                Facebook
                            </a>
                        )}
                        {m.socials.instagram && (
                            <a className="text-emerald-700 hover:underline" href={m.socials.instagram}>
                                Instagram
                            </a>
                        )}
                        {m.socials.linkedin && (
                            <a className="text-emerald-700 hover:underline" href={m.socials.linkedin}>
                                LinkedIn
                            </a>
                        )}
                        {m.socials.whatsapp && (
                            <a className="text-emerald-700 hover:underline" href={m.socials.whatsapp}>
                                WhatsApp
                            </a>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function MeetTheTeamPage() {
    const leadership = TEAM.filter((m) => m.dept === "Leadership");
    const guides = TEAM.filter((m) => m.dept === "Guides");
    const ops = TEAM.filter((m) => m.dept === "Operations");

    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
                        Licensed • Local • Reliable
                    </p>
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
                        Meet The Team
                    </h1>
                    <p className="mt-3 max-w-2xl text-white/90 text-lg">
                        The people behind your Sabah adventures — guides, planners, and the
                        operations crew that make every journey smooth and safe.
                    </p>
                </div>
                <svg
                    className="block w-full text-white"
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path fill="currentColor" d="M0,80 L1440,0 L1440,80 L0,80 Z" />
                </svg>
            </section>

            {/* Leadership */}
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="flex items-baseline justify-between">
                    <h2 className="text-2xl font-bold">Leadership</h2>
                    <a href="#guides" className="text-emerald-700 hover:underline text-sm">
                        Skip to Guides ↓
                    </a>
                </div>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {leadership.map((m) => (
                        <Card key={m.name} m={m} />
                    ))}
                </div>
            </section>

            {/* Guides */}
            <section id="guides" className="mx-auto max-w-7xl px-6 py-4">
                <h2 className="text-2xl font-bold">Guides</h2>
                <p className="text-gray-600">
                    Licensed, safety-briefed, and passionate about Sabah’s nature and culture.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {guides.map((m) => (
                        <Card key={m.name} m={m} />
                    ))}
                </div>
            </section>

            {/* Operations */}
            <section className="mx-auto max-w-7xl px-6 py-12">
                <h2 className="text-2xl font-bold">Operations</h2>
                <p className="text-gray-600">
                    The behind-the-scenes team keeping vehicles ready, gear checked, and itineraries tight.
                </p>
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {ops.map((m) => (
                        <Card key={m.name} m={m} />
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">Tour with our local experts</h3>
                        <p className="text-white/90">
                            Tell us your dates and interests — we’ll match you to the perfect guide.
                        </p>
                    </div>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-xl bg-white text-emerald-700 px-5 py-3 font-semibold hover:bg-white/90"
                    >
                        Contact Us
                    </a>
                </div>
            </section>
        </main>
    );
}
