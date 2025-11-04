import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "4D3N Maliau Basin (Matta Fair) | Discovery Tours",
    description:
        "Explore Sabah’s Lost World with rainforest treks, waterfalls and canopy walks. Guided 4D3N Maliau Basin adventure with camp stays and meals.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/maliau.jpg"
                    alt="Maliau Basin"
                    width={1600}
                    height={900}
                    className="h-[60vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold">4D3N Maliau Basin (Matta Fair)</h1>
                    <p className="text-white/90 mt-1">Rainforest • Waterfalls • Canopy</p>
                </div>
            </section>

            {/* Quick facts */}
            <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
                    <p className="text-lg font-semibold">4 Days 3 Nights</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Grade</p>
                    <p className="text-lg font-semibold">Moderate–Challenging</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Best for</p>
                    <p className="text-lg font-semibold">Nature lovers & trekkers</p>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto max-w-5xl px-6 pb-6">
                <h2 className="text-2xl font-bold">Trip Highlights</h2>
                <ul className="mt-4 grid md:grid-cols-2 gap-3 text-slate-700">
                    <li>• Trek through pristine lowland dipterocarp rainforest</li>
                    <li>• Visit iconic multi-tiered waterfalls (weather/route permitting)</li>
                    <li>• Night jungle walk to spot nocturnal wildlife</li>
                    <li>• Learn about conservation at Maliau Basin Study Centre</li>
                </ul>
            </section>

            {/* Itinerary */}
            <section className="mx-auto max-w-5xl px-6 pb-12">
                <h3 className="text-xl font-semibold">Outline Itinerary</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                    <li><b>Day 1:</b> Drive to Maliau Basin (from KK/Tawau area), registration & safety briefing, base-camp boardwalk, night walk.</li>
                    <li><b>Day 2:</b> Guided trek to waterfall area / forest viewpoints. Packed lunch. Return to camp for dinner.</li>
                    <li><b>Day 3:</b> Deeper rainforest exploration or alternate trail (depending on conditions). Evening at leisure.</li>
                    <li><b>Day 4:</b> Breakfast, depart Maliau Basin and transfer back to town.</li>
                </ol>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Includes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Park permits & conservation fees</li>
                            <li>• 3 nights accommodation (lodge/hostel/basic room)</li>
                            <li>• Meals as per itinerary</li>
                            <li>• Return land transfers ex-KK/Tawau (one pick-up point)</li>
                            <li>• Licensed nature guide</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Excludes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Flights</li>
                            <li>• Porter services / personal gear</li>
                            <li>• Travel insurance & personal expenses</li>
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
