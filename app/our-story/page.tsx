// app/our-story/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Our Story | Discovery Tours",
    description:
        "Born in Sabah, built by locals. Discover how Discovery Tours became a trusted tour partner with safety-first journeys and genuine hospitality.",
    openGraph: {
        title: "Our Story | Discovery Tours",
        description:
            "Born in Sabah, built by locals. Discover how Discovery Tours became a trusted tour partner with safety-first journeys and genuine hospitality.",
        type: "website",
        url: "/our-story",
    },
};

export default function OurStoryPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* ===== Hero ===== */}
            <section className="relative overflow-hidden">
                <div
                    className="absolute inset-0 bg-[url('/images/kinabalu.jpg')] bg-cover bg-center opacity-30"
                    aria-hidden="true"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white-700/70 via-orange-800/60 to-white-900/80" />
                <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 text-gray-100">
                    <p className="inline-flex items-center gap-2 rounded-full bg-gray/10 px-3 py-1 text-sm ring-1 ring-gray/20">
                        Since 2016 <span aria-hidden>•</span> Sabah, Malaysia
                    </p>
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-100">
                        Our Story
                    </h1>
                    <p className="mt-4 max-w-2xl text-white/90 text-lg">
                        Born in Sabah. Built by locals. Dedicated to crafting journeys that
                        feel personal, safe, and unforgettable.
                    </p>
                </div>
                {/* angled divider */}
                <svg
                    className="block w-full text-white"
                    viewBox="0 0 1440 80"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <path fill="currentColor" d="M0,80 L1440,0 L1440,80 L0,80 Z" />
                </svg>
            </section>

            {/* ===== Founders Note + Mission/Vision ===== */}
            <section className="mx-auto max-w-7xl px-6 py-14 grid lg:grid-cols-3 gap-8">
                <article className="lg:col-span-2 rounded-2xl border bg-white p-8 shadow-sm">
                    <h2 className="text-2xl font-bold">A Note from Our Founders</h2>
                    <p className="mt-3 text-gray-700 leading-relaxed">
                        We started Discovery Tours with weekend trips for friends and family,
                        sharing places we love: Kundasang’s cool mornings, Klias’ fireflies,
                        and the magic of Semporna’s islands. Word spread. We formalized,
                        trained, got licensed, and kept our promise: safety first, transparent
                        pricing, and hospitality that feels like home. Today, we’re proud to
                        be a trusted local partner—still small enough to care, big enough to
                        deliver.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-8 w-8 rounded-full bg-emerald-100" />
                            <span>Founder • Operations</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="inline-block h-8 w-8 rounded-full bg-emerald-100" />
                            <span>Co-Founder • Guest Experience</span>
                        </div>
                    </div>
                </article>

                <div className="space-y-6">
                    <div className="p-6 rounded-2xl border bg-white shadow-sm">
                        <h3 className="text-lg font-semibold">Our Mission</h3>
                        <p className="mt-2 text-gray-600">
                            Connect travellers with authentic Sabah experiences—responsibly,
                            respectfully, and with true local hospitality.
                        </p>
                    </div>
                    <div className="p-6 rounded-2xl border bg-white shadow-sm">
                        <h3 className="text-lg font-semibold">Our Vision</h3>
                        <p className="mt-2 text-gray-600">
                            A thriving, sustainable Sabah tourism ecosystem where communities,
                            nature, and visitors flourish together.
                        </p>
                    </div>
                </div>
            </section>

            {/* ===== Timeline ===== */}
            <section className="mx-auto max-w-7xl px-6 py-8">
                <h3 className="text-2xl font-bold">How It Started → How It’s Going</h3>
                <ol className="mt-8 relative border-s ps-6 space-y-10">
                    {[
                        {
                            year: "2016",
                            title: "First Community Tours",
                            body:
                                "Weekend trips guided by Sabah locals for friends and family.",
                        },
                        {
                            year: "2019",
                            title: "Licensed & Growing",
                            body:
                                "Formalized operations, expanded routes: Kundasang, Klias, Semporna.",
                        },
                        {
                            year: "2023",
                            title: "Safety-First & Digital",
                            body:
                                "Standardized safety briefings, online bookings, realtime comms.",
                        },
                        {
                            year: "Today",
                            title: "Trusted Local Partner",
                            body:
                                "Community-driven experiences with transparent pricing and care.",
                        },
                    ].map((item) => (
                        <li key={item.year} className="relative">
                            <div className="absolute -start-3 top-1.5 h-6 w-6 rounded-full bg-emerald-600 border-2 border-white" />
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 text-sm font-medium">
                                {item.year}
                            </div>
                            <h4 className="mt-3 font-semibold">{item.title}</h4>
                            <p className="text-gray-600">{item.body}</p>
                        </li>
                    ))}
                </ol>
            </section>

            {/* ===== Impact Stats ===== */}
            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        ["8+", "Years Operating"],
                        ["10,000+", "Happy Travellers"],
                        ["30+", "Local Partners"],
                        ["4.9★", "Average Rating"],
                    ].map(([big, label], i) => (
                        <div
                            key={label}
                            className="rounded-2xl border bg-white p-8 text-center shadow-sm"
                        >
                            <div
                                className="text-3xl font-extrabold text-emerald-700"
                                data-animate-counter
                                data-target={big.replace(/\D/g, "")}
                            >
                                {big}
                            </div>
                            <div className="mt-1 text-gray-600">{label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Trust Badges ===== */}
            <section className="mx-auto max-w-7xl px-6 py-6">
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        ["Licensed Operator", "Ministry of Tourism (Sabah)"],
                        ["Insured & Compliant", "Safety-first SOPs"],
                        ["Local & Sustainable", "Community partnerships"],
                    ].map(([title, sub]) => (
                        <div
                            key={title}
                            className="flex items-center gap-4 rounded-xl border bg-white p-5 shadow-sm"
                        >
                            <div className="h-10 w-10 rounded-full bg-emerald-100" />
                            <div>
                                <div className="font-semibold">{title}</div>
                                <div className="text-sm text-gray-600">{sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Testimonial ===== */}
            <section className="mx-auto max-w-5xl px-6 py-12">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white">
                    <blockquote className="text-xl md:text-2xl leading-relaxed">
                        “The Discovery Tours team felt like friends by day two. Professional,
                        safety-minded, and genuinely passionate about Sabah. We’ll be back!”
                    </blockquote>
                    <div className="mt-4 text-white/80">— A. Rahman, KL</div>
                </div>
            </section>

            {/* ===== Team ===== */}
            <section className="mx-auto max-w-7xl px-6 pb-10">
                <h3 className="text-2xl font-bold">Meet the Team</h3>
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                    {["Alex", "Mia", "Johan", "Farah"].map((name) => (
                        <div key={name} className="rounded-2xl border bg-white p-6 text-center shadow-sm">
                            <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100" />
                            <div className="mt-3 font-semibold">{name}</div>
                            <div className="text-sm text-gray-600">Licensed Guide</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Photo Strip Gallery ===== */}
            <section className="mx-auto max-w-7xl px-6 py-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                        "/images/kinabalu.jpg",
                        "/images/klias-river.jpg",
                        "/images/island-hopping.jpg",
                        "/images/kundasang-farm.jpg",
                    ].map((src, i) => (
                        <div key={i} className="overflow-hidden rounded-xl border">
                            <img
                                src={src}
                                alt="Sabah highlight"
                                className="h-40 w-full object-cover transition-transform duration-500 hover:scale-105"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* ===== Sustainability Pledge ===== */}
            <section className="mx-auto max-w-7xl px-6 py-10">
                <div className="rounded-2xl border bg-white p-8 shadow-sm">
                    <h3 className="text-2xl font-bold">Our Sustainability Pledge</h3>
                    <p className="mt-3 text-gray-700">
                        We practice Leave No Trace, cap group sizes for fragile sites, and
                        work with local rangers and homestays to keep tourism benefits within
                        the community.
                    </p>
                </div>
            </section>

            {/* ===== FAQ (no JS) ===== */}
            <section className="mx-auto max-w-7xl px-6 pb-12">
                <h3 className="text-2xl font-bold">FAQ</h3>
                <div className="mt-6 grid md:grid-cols-2 gap-6">
                    {[
                        [
                            "Are you licensed and insured?",
                            "Yes. We operate with the appropriate Sabah tourism licenses and carry relevant insurance.",
                        ],
                        [
                            "Do you offer custom itineraries?",
                            "Absolutely. Share your dates, budget, and interests—we’ll propose an itinerary within 24 hours (Mon–Fri).",
                        ],
                        [
                            "Is pricing transparent?",
                            "Always. No hidden fees—what you see is what you pay.",
                        ],
                        [
                            "How big are the groups?",
                            "We prefer small groups for safety and quality. Private trips available.",
                        ],
                    ].map(([q, a]) => (
                        <details key={q} className="rounded-xl border bg-white p-5 shadow-sm group open:shadow-md">
                            <summary className="cursor-pointer list-none font-semibold flex items-center justify-between">
                                {q}
                                <span className="ml-4 text-emerald-600 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 text-gray-600">{a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">Plan your Sabah story with us</h3>
                        <p className="text-white/90">
                            Tell us your dates and interests — we’ll craft a trip you’ll love.
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

            {/* ===== Lightweight counter animation (optional) ===== */}
            <Script id="counter-anim" strategy="afterInteractive">
                {`
          const els = document.querySelectorAll('[data-animate-counter]');
          els.forEach(el => {
            const t = parseInt(el.dataset.target || '0', 10);
            if (isNaN(t)) return;
            let cur = 0; 
            const step = Math.max(1, Math.round(t / 40));
            const iv = setInterval(() => {
              cur += step;
              if (cur >= t) { cur = t; clearInterval(iv); }
              el.textContent = el.textContent.replace(/^[0-9.,+★]+/, String(cur));
            }, 30);
          });
        `}
            </Script>

            {/* ===== JSON-LD for SEO ===== */}
            <Script id="org-jsonld" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": ["Organization", "LocalBusiness", "TouristInformationCenter"],
                    name: "Discovery Tours",
                    url: "https://example.com",
                    areaServed: "Sabah, Malaysia",
                    address: {
                        "@type": "PostalAddress",
                        addressRegion: "Sabah",
                        addressCountry: "MY",
                    },
                    sameAs: [
                        "https://facebook.com/",
                        "https://instagram.com/",
                    ],
                })}
            </Script>
        </main>
    );
}
