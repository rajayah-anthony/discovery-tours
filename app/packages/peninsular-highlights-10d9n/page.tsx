import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "10D9N Peninsular Highlights | Discovery Tours",
    description:
        "Grand Peninsular loop featuring Kuala Lumpur, Cameron Highlands and Taman Negara with nature, culture and city vibes.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/malaysia-kl.jpg"
                    alt="Peninsular Highlights"
                    width={1600}
                    height={900}
                    className="h-[60vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold">10D9N Peninsular Highlights</h1>
                    <p className="text-white/90 mt-1">KL • Cameron Highlands • Taman Negara</p>
                </div>
            </section>

            {/* Quick facts */}
            <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
                    <p className="text-lg font-semibold">10 Days 9 Nights</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Focus</p>
                    <p className="text-lg font-semibold">Nature & culture mix</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Style</p>
                    <p className="text-lg font-semibold">Comfort small-group/private</p>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto max-w-5xl px-6 pb-6">
                <h2 className="text-2xl font-bold">Trip Highlights</h2>
                <ul className="mt-4 grid md:grid-cols-2 gap-3 text-slate-700">
                    <li>• KL city highlights & local food street</li>
                    <li>• Cameron Highlands tea terraces & farms</li>
                    <li>• Taman Negara canopy walk & river cruise</li>
                    <li>• Batu Caves & Putrajaya stop (time permitting)</li>
                </ul>
            </section>

            {/* Itinerary */}
            <section className="mx-auto max-w-5xl px-6 pb-12">
                <h3 className="text-xl font-semibold">Outline Itinerary</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                    <li><b>Day 1:</b> Arrive KL, leisure</li>
                    <li><b>Day 2:</b> KL city tour (historical core & modern icons)</li>
                    <li><b>Day 3:</b> Batu Caves & Putrajaya</li>
                    <li><b>Day 4:</b> Transfer to Cameron Highlands</li>
                    <li><b>Day 5:</b> Tea plantations & farm visits</li>
                    <li><b>Day 6:</b> Taman Negara transfer</li>
                    <li><b>Day 7:</b> Canopy walk & rainforest trek</li>
                    <li><b>Day 8:</b> River cruise & village experience</li>
                    <li><b>Day 9:</b> Return to KL, free time</li>
                    <li><b>Day 10:</b> Departure</li>
                </ol>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Includes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• 9 nights hotels/lodges with breakfast</li>
                            <li>• Ground transport & intercity transfers</li>
                            <li>• Activities: canopy walk, tea estate visit (tickets where stated)</li>
                            <li>• Licensed guides</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Excludes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Flights</li>
                            <li>• Most lunches & dinners</li>
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
