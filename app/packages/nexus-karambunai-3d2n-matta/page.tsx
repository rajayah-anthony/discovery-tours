import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "3D2N Nexus Karambunai (Matta Fair) | Discovery Tours",
    description:
        "Relaxing 3D2N resort stay at Nexus Karambunai with beach time, optional mangrove & sunset experiences. Ideal for couples and families.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/karambunai.jpg"
                    alt="Nexus Karambunai"
                    width={1600}
                    height={900}
                    className="h-[60vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold">3D2N Nexus Karambunai (Matta Fair)</h1>
                    <p className="text-white/90 mt-1">Resort leisure • Beach • Sunset</p>
                </div>
            </section>

            {/* Quick facts */}
            <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
                    <p className="text-lg font-semibold">3 Days 2 Nights</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Style</p>
                    <p className="text-lg font-semibold">Relaxed, family-friendly</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Location</p>
                    <p className="text-lg font-semibold">Kota Kinabalu (outskirts)</p>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto max-w-5xl px-6 pb-6">
                <h2 className="text-2xl font-bold">Trip Highlights</h2>
                <ul className="mt-4 grid md:grid-cols-2 gap-3 text-slate-700">
                    <li>• Spacious beachfront resort & facilities</li>
                    <li>• Optional sunset cruise or mangrove tour</li>
                    <li>• Easy access to KK city for dining & shopping</li>
                    <li>• Perfect for couples, families & small groups</li>
                </ul>
            </section>

            {/* Itinerary */}
            <section className="mx-auto max-w-5xl px-6 pb-12">
                <h3 className="text-xl font-semibold">Outline Itinerary</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                    <li><b>Day 1:</b> Arrival at resort, check-in, free leisure time by the beach/pool.</li>
                    <li><b>Day 2:</b> Free & easy. Optional activities: sunset cruise, mangrove tour, spa (add-on).</li>
                    <li><b>Day 3:</b> Breakfast, leisure morning, check-out and transfer.</li>
                </ol>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Includes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• 2 nights resort accommodation with breakfast</li>
                            <li>• Return airport transfers (shared/private)</li>
                            <li>• Use of resort facilities</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Excludes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Flights</li>
                            <li>• Lunches, dinners & spa</li>
                            <li>• Optional tours & activities</li>
                            <li>• Travel insurance</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8">
                    <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-5 py-3 text-white hover:bg-sky-700">
                        Enquire / Book
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2}>
                            <path d="M5 12h14M13 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </section>
        </main>
    );
}
