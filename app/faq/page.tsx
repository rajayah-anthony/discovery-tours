// app/faq/page.tsx
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
    title: "FAQ | Discovery Tours",
    description:
        "Answers to common questions about bookings, pricing, safety, cancellations, and custom itineraries for Sabah tours.",
    openGraph: {
        title: "FAQ | Discovery Tours",
        description:
            "Answers to common questions about bookings, pricing, safety, cancellations, and custom itineraries for Sabah tours.",
        type: "website",
        url: "/faq",
    },
};

type QA = { q: string; a: string };

const FAQS: QA[] = [
    {
        q: "Are you licensed and insured?",
        a: "Yes. We operate with the appropriate Sabah tourism licenses and maintain relevant insurance coverage. Safety briefings are provided before every activity.",
    },
    {
        q: "How do I make a booking?",
        a: "Use the Book Now form or WhatsApp link on our site. Share your dates, group size, and preferred tours — we’ll confirm availability and pricing.",
    },
    {
        q: "What payment methods do you accept?",
        a: "Bank transfer and major e-wallets locally. For international guests, we can share secure payment options upon request.",
    },
    {
        q: "Is pricing transparent?",
        a: "Always. Our offers clearly list what’s included (transport, guide, permits, meals if any). No hidden fees.",
    },
    {
        q: "What is your cancellation policy?",
        a: "Free reschedule when possible. Refunds follow partner policies and lead time. We’ll advise clearly before you confirm.",
    },
    {
        q: "Can you customize itineraries?",
        a: "Absolutely. Tell us your interests (mountains, islands, wildlife, culture) and pace. We’ll tailor a plan within your budget.",
    },
    {
        q: "How big are your groups?",
        a: "We keep groups small for safety and quality. Private trips are available on request.",
    },
    {
        q: "What should I bring?",
        a: "Comfortable clothing, closed shoes, sunscreen, water bottle, and personal medication. For islands: swimwear and a towel.",
    },
    {
        q: "Do tours run in bad weather?",
        a: "Safety first. Some activities may be delayed, rerouted, or cancelled due to weather or sea conditions. We’ll keep you updated.",
    },
    {
        q: "Do you provide hotel pickup?",
        a: "Yes for most tours within Kota Kinabalu area. We’ll confirm pickup time and location during booking.",
    },
];

export default function FAQPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero */}
            <section className="relative overflow-hidden bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
                <div className="mx-auto max-w-7xl px-6 py-20">
                    <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-sm ring-1 ring-white/20">
                        Questions • Answers • Tips
                    </p>
                    <h1 className="mt-6 text-4xl md:text-5xl font-extrabold tracking-tight">
                        Frequently Asked Questions
                    </h1>
                    <p className="mt-3 max-w-2xl text-white/90 text-lg">
                        Everything you need to know before your Sabah adventure.
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

            {/* FAQ list (no JS — details/summary) */}
            <section className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid md:grid-cols-2 gap-6">
                    {FAQS.map(({ q, a }) => (
                        <details
                            key={q}
                            className="rounded-xl border bg-white p-5 shadow-sm group open:shadow-md"
                        >
                            <summary className="cursor-pointer list-none font-semibold flex items-center justify-between">
                                {q}
                                <span className="ml-4 text-emerald-600 transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="mt-3 text-gray-700">{a}</p>
                        </details>
                    ))}
                </div>
            </section>

            {/* Quick help cards */}
            <section className="mx-auto max-w-7xl px-6 pb-10">
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        ["Booking Support", "/book-now", "Check availability & prices"],
                        ["WhatsApp Us", "https://wa.me/60123456789", "Fast responses (9am–6pm)"],
                        ["Contact Form", "/contact", "We’ll reply within 24 hours"],
                    ].map(([title, href, sub]) => (
                        <a
                            key={String(title)}
                            href={String(href)}
                            className="rounded-xl border bg-white p-6 shadow-sm hover:shadow-md transition"
                        >
                            <div className="font-semibold">{title}</div>
                            <div className="text-sm text-gray-600">{sub}</div>
                        </a>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold">Still need help?</h3>
                        <p className="text-white/90">Tell us your dates and interests — we’ll craft a plan.</p>
                    </div>
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-xl bg-white text-emerald-700 px-5 py-3 font-semibold hover:bg-white/90"
                    >
                        Contact Us
                    </a>
                </div>
            </section>

            {/* JSON-LD for FAQ rich results */}
            <Script id="faq-jsonld" type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "FAQPage",
                    mainEntity: FAQS.map(({ q, a }) => ({
                        "@type": "Question",
                        name: q,
                        acceptedAnswer: { "@type": "Answer", text: a },
                    })),
                })}
            </Script>
        </main>
    );
}
