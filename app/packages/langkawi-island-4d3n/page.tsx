import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "4D3N Langkawi Island | Discovery Tours",
    description:
        "Beach escape in Langkawi featuring SkyCab, island-hopping, and sunset moments. 4D3N itinerary with hotel, transfers, and guided tours.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/langkawi.jpg"
                    alt="Langkawi Island"
                    width={1600}
                    height={900}
                    className="h-[60vh] w-full object-cover object-center"

                    priority
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold">4D3N Langkawi Island</h1>
                    <p className="text-white/90 mt-1">Beaches • SkyCab • Island-hopping</p>
                </div>
            </section>

            {/* Quick facts */}
            <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
                    <p className="text-lg font-semibold">4 Days 3 Nights</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Starts / Ends</p>
                    <p className="text-lg font-semibold">Langkawi (LGK)</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Best for</p>
                    <p className="text-lg font-semibold">Relax, scenic rides, families</p>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto max-w-5xl px-6 pb-6">
                <h2 className="text-2xl font-bold">Trip Highlights</h2>
                <ul className="mt-4 grid md:grid-cols-2 gap-3 text-slate-700">
                    <li>• SkyCab & SkyBridge panoramic ride</li>
                    <li>• Island-hopping: Pregnant Maiden Lake & Beras Basah</li>
                    <li>• Sunset beach time & night market</li>
                    <li>• Optional mangrove cruise at Kilim Geoforest Park</li>
                </ul>
            </section>

            {/* Itinerary */}
            <section className="mx-auto max-w-5xl px-6 pb-12">
                <h3 className="text-xl font-semibold">Outline Itinerary</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                    <li><b>Day 1:</b> Arrival, hotel check-in, sunset beach walk</li>
                    <li><b>Day 2:</b> SkyCab & SkyBridge + Oriental Village</li>
                    <li><b>Day 3:</b> Island-hopping boat tour (half-day), free & easy</li>
                    <li><b>Day 4:</b> Leisure morning, airport transfer</li>
                </ol>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Includes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• 3 nights hotel with breakfast</li>
                            <li>• Return airport transfers</li>
                            <li>• SkyCab tickets (Std) & island-hopping boat</li>
                            <li>• Licensed guide (where applicable)</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Excludes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Flights to/from LGK</li>
                            <li>• Lunches, dinners, personal expenses</li>
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
