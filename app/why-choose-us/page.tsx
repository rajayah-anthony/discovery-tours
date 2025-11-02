import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Why Choose Us | Discovery Tours",
    description:
        "Trusted Sabah tour operator delivering safe, personalized, and unforgettable experiences—built with modern tech and local expertise.",
    openGraph: {
        title: "Why Choose Us | Discovery Tours",
        description:
            "Trusted Sabah tour operator delivering safe, personalized, and unforgettable experiences—built with modern tech and local expertise.",
        type: "website",
    },
};

const stats = [
    { label: "Years Operating", value: "12+" },
    { label: "5★ Reviews", value: "2,400+" },
    { label: "Licensed Guides", value: "100%" },
    { label: "Avg. Response Time", value: "<2 hrs" },
];

const valuePillars = [
    {
        title: "Licensed • Insured • Compliant",
        desc: "We operate under valid Sabah tourism licensing with proper permits, insurance, and vetted guides. No shortcuts.",
        icon: "shield",
    },
    {
        title: "Local Experts, Real Access",
        desc: "Born-and-bred in Sabah. We unlock authentic routes, ethical wildlife encounters and village connections—safely.",
        icon: "map",
    },
    {
        title: "Modern, Headless Stack",
        desc: "Fast site, real-time availability, and secure payments. Tech that removes friction, not adds it.",
        icon: "cpu",
    },
    {
        title: "Safety First, Always",
        desc: "Documented SOPs, risk assessments, first-aid trained crew, backup vehicles and weather watch.",
        icon: "heart",
    },
    {
        title: "Clear Pricing",
        desc: "What we quote is what you pay—no hidden surcharges at the jetty or on the trail.",
        icon: "badge",
    },
    {
        title: "Personal Concierge",
        desc: "From WhatsApp pre-trip briefings to last-minute dietary needs—we handle the details.",
        icon: "headset",
    },
];

const badges = [
    { label: "Licensed Tour Operator", src: "/images/badges/license.png" },
    { label: "Insurance Coverage", src: "/images/badges/insurance.png" },
    { label: "Sustainability Pledge", src: "/images/badges/eco.png" },
    { label: "Payment Protected", src: "/images/badges/payments.png" },
];

const processSteps = [
    {
        step: "01",
        title: "Listen & Design",
        desc: "You share your dates, pace and must-see list. We recommend routes and realities (weather, tide, road).",
    },
    {
        step: "02",
        title: "Confirm & Prepare",
        desc: "You’ll receive a clear itinerary, inclusions, pickup time, packing list, and safety notes.",
    },
    {
        step: "03",
        title: "Operate & Support",
        desc: "Licensed guide, on-time transport, hydration and comfort stops. We adapt live to conditions.",
    },
    {
        step: "04",
        title: "Follow-up & Care",
        desc: "We share photos (if opted), collect feedback and assist with onward travel or add-ons.",
    },
];

const testimonials = [
    {
        name: "Amir • Kuala Lumpur",
        quote:
            "Professional from WhatsApp to drop-off. Our Klias river cruise had perfect timing for proboscis and fireflies—zero tourist traps.",
    },
    {
        name: "Yuki • Tokyo",
        quote:
            "They designed a gentle Kinabalu day hike for my parents. Safety briefing, great pacing, and beautiful stops. Worth every ringgit.",
    },
    {
        name: "Hannah • Sydney",
        quote:
            "Fast responses, transparent pricing, and the friendliest guide crew. We’ll be back for the islands!",
    },
];

const faqs = [
    {
        q: "Are you a licensed operator?",
        a: "Yes. We hold valid Sabah tourism licensing and operate with insured vehicles and licensed guides.",
    },
    {
        q: "What if the weather changes?",
        a: "We track conditions and may adjust timing/routes for safety. If we need to cancel, we’ll offer alternatives or a fair refund per policy.",
    },
    {
        q: "Can you handle dietary needs?",
        a: "Absolutely—just tell us ahead. We commonly handle vegetarian, no-pork, no-beef, and no-shellfish requirements.",
    },
    {
        q: "How do I pay?",
        a: "Bank transfer, FPX or card via secure payment link. Your booking is confirmed once payment is received.",
    },
];

function Icon({ name, className = "w-5 h-5" }: { name: string; className?: string }) {
    // Minimal inline icons to avoid extra deps
    const paths: Record<string, string> = {
        shield: "M12 2l7 4v5c0 5-3.5 9.74-7 11-3.5-1.26-7-6-7-11V6l7-4z",
        map: "M9 3l6 2 6-2v14l-6 2-6-2-6 2V5l6-2z M9 5v12 M15 5v12",
        cpu: "M9 9h6v6H9z M4 8h2M4 12h2M4 16h2M18 8h2M18 12h2M18 16h2M8 4v2M12 4v2M16 4v2M8 18v2M12 18v2M16 18v2",
        heart: "M12 21s-7-4.35-9-8.5C1 8 3.5 5 6.5 5 8.24 5 10 6 12 8c2-2 3.76-3 5.5-3C20.5 5 23 8 21 12.5 19 16.65 12 21 12 21z",
        badge: "M12 2l3 3h5v5l3 3-3 3v5h-5l-3 3-3-3H4v-5L1 13l3-3V5h5z",
        headset: "M12 3a7 7 0 00-7 7v6a3 3 0 003 3h1v-7H5v-2a7 7 0 1114 0v2h-4v7h1a3 3 0 003-3v-6a7 7 0 00-7-7z",
        check: "M20 6L9 17l-5-5",
        star: "M12 2l2.9 5.9L21 9l-4.5 4.4L17.8 21 12 17.8 6.2 21l1.3-7.6L3 9l6.1-1.1L12 2z",
    };
    const d = paths[name] ?? paths["check"];
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth={1.6}>
            <path d={d} />
        </svg>
    );
}

export default function WhyChooseUsPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white">
            {/* Hero */}
            <section className="relative">
                <div className="absolute inset-0 -z-10">
                    <Image
                        src="/images/hero-wildlife.jpg"
                        alt="Discovery Tours Sabah"
                        fill
                        className="object-cover opacity-20"
                        priority
                    />
                </div>

                <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
                    <div className="max-w-3xl">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                            <Icon name="star" className="w-4 h-4" />
                            Trusted Sabah Operator
                        </span>
                        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                            Why travellers choose <span className="text-amber-600">Discovery Tours</span>
                        </h1>
                        <p className="mt-4 text-lg text-gray-700">
                            We combine licensed local expertise with modern, headless technology to deliver safe,
                            seamless and genuinely memorable Sabah experiences.
                        </p>

                        <div className="mt-8 flex flex-wrap items-center gap-4">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl bg-amber-600 px-5 py-3 text-white font-medium shadow-sm hover:bg-amber-700 transition"
                            >
                                Talk to a Tour Specialist
                            </Link>
                            <Link
                                href="/experiences"
                                className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-gray-800 ring-1 ring-gray-200 hover:ring-gray-300 transition"
                            >
                                See Experiences
                            </Link>
                        </div>
                    </div>

                    <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        {stats.map((s) => (
                            <div key={s.label} className="rounded-2xl bg-white/80 p-4 text-center ring-1 ring-gray-100">
                                <div className="text-2xl font-bold text-gray-900">{s.value}</div>
                                <div className="text-xs text-gray-600">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust badges */}
            <section className="py-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                        {badges.map((b) => (
                            <div key={b.label} className="flex items-center justify-center rounded-xl bg-white p-4 ring-1 ring-gray-100">
                                <Image src={b.src} alt={b.label} width={120} height={60} className="object-contain" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value pillars */}
            <section className="py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">What sets us apart</h2>
                        <p className="mt-1 text-gray-600">Clear standards you can feel from enquiry to drop-off.</p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {valuePillars.map((p) => (
                            <div key={p.title} className="group rounded-2xl bg-white p-6 ring-1 ring-gray-100 hover:shadow-md transition">
                                <div className="mb-4 inline-flex rounded-xl bg-amber-50 p-3 text-amber-700 ring-1 ring-amber-100">
                                    <Icon name={p.icon} />
                                </div>
                                <h3 className="text-base font-semibold text-gray-900">{p.title}</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-700">{p.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process timeline */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Our operating process</h2>
                        <p className="mt-1 text-gray-600">Transparent steps so you always know what happens next.</p>
                    </div>

                    <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {processSteps.map((s, i) => (
                            <li key={s.step} className="rounded-2xl bg-white p-6 ring-1 ring-gray-100">
                                <div className="flex items-center gap-3">
                                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-600 text-white font-bold">
                                        {s.step}
                                    </span>
                                    <span className="text-sm font-semibold text-gray-900">{s.title}</span>
                                </div>
                                <p className="mt-3 text-sm text-gray-700">{s.desc}</p>
                                {i < processSteps.length - 1 && (
                                    <div className="pointer-events-none mt-4 h-px w-full bg-gradient-to-r from-amber-200 to-transparent lg:hidden" />
                                )}
                            </li>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-14 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Happy travellers</h2>
                        <p className="mt-1 text-gray-600">Real reviews from real trips in Sabah.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {testimonials.map((t) => (
                            <blockquote key={t.name} className="rounded-2xl bg-amber-50 p-6 ring-1 ring-amber-100">
                                <div className="flex items-center gap-2 text-amber-700">
                                    <Icon name="star" className="w-4 h-4" />
                                    <Icon name="star" className="w-4 h-4" />
                                    <Icon name="star" className="w-4 h-4" />
                                    <Icon name="star" className="w-4 h-4" />
                                    <Icon name="star" className="w-4 h-4" />
                                </div>
                                <p className="mt-3 text-sm text-gray-800">&ldquo;{t.quote}&rdquo;</p>
                                <footer className="mt-4 text-xs font-medium text-gray-600">— {t.name}</footer>
                            </blockquote>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ (details/summary = no JS) */}
            <section className="py-14">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">FAQs</h2>
                        <p className="mt-1 text-gray-600">Short, clear answers before you book.</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((f) => (
                            <details key={f.q} className="group rounded-2xl bg-white p-6 ring-1 ring-gray-100 open:shadow-md">
                                <summary className="flex cursor-pointer items-center justify-between gap-4 list-none">
                                    <span className="text-sm font-semibold text-gray-900">{f.q}</span>
                                    <span className="shrink-0 rounded-full bg-amber-50 p-2 text-amber-700 ring-1 ring-amber-100 transition group-open:rotate-45">
                                        <Icon name="badge" className="w-4 h-4" />
                                    </span>
                                </summary>
                                <p className="mt-3 text-sm text-gray-700">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Closing CTA */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start justify-between gap-6 rounded-2xl bg-gray-900 px-6 py-8 text-white md:flex-row md:items-center">
                        <div>
                            <h3 className="text-xl font-semibold">Ready to plan your Sabah trip?</h3>
                            <p className="mt-1 text-white/80">
                                Get a fast, friendly itinerary within one business day—no obligation.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href={process.env.NEXT_PUBLIC_BOOKING_URL || "/contact"}
                                className="rounded-xl bg-amber-500 px-5 py-3 font-medium text-gray-900 hover:bg-amber-400 transition"
                            >
                                Get My Itinerary
                            </Link>
                            <Link
                                href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "60123456789"}?text=Hi%20Discovery%20Tours%2C%20I%27d%20like%20to%20plan%20a%20trip%20in%20Sabah.`}
                                className="rounded-xl bg-white px-5 py-3 font-medium text-gray-900 hover:bg-gray-100 transition"
                            >
                                Chat on WhatsApp
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
