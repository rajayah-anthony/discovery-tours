import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "7D6N Cultural Heritage Tours | Discovery Tours",
    description:
        "A week-long cultural journey across Kuala Lumpur, Melaka and Penang with food trails, heritage walks and museums.",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/malaysia-heritage.jpg"
                    alt="Cultural Heritage"
                    width={1600}
                    height={900}
                    className="h-[60vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold">7D6N Cultural Heritage Tours</h1>
                    <p className="text-white/90 mt-1">KL • Melaka • Penang</p>
                </div>
            </section>

            {/* Quick facts */}
            <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
                    <p className="text-lg font-semibold">7 Days 6 Nights</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Theme</p>
                    <p className="text-lg font-semibold">Culture, food & history</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Pace</p>
                    <p className="text-lg font-semibold">Leisurely (family friendly)</p>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto max-w-5xl px-6 pb-6">
                <h2 className="text-2xl font-bold">Trip Highlights</h2>
                <ul className="mt-4 grid md:grid-cols-2 gap-3 text-slate-700">
                    <li>• KL heritage walk & street food tasting</li>
                    <li>• Melaka UNESCO old town & river cruise</li>
                    <li>• Penang Peranakan heritage & mural lanes</li>
                    <li>• Night markets and local delicacies</li>
                </ul>
            </section>

            {/* Itinerary */}
            <section className="mx-auto max-w-5xl px-6 pb-12">
                <h3 className="text-xl font-semibold">Outline Itinerary</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                    <li><b>Day 1:</b> Arrive KL, city orientation</li>
                    <li><b>Day 2:</b> KL heritage walk & food tour</li>
                    <li><b>Day 3:</b> Transfer to Melaka; river cruise, Jonker Street</li>
                    <li><b>Day 4:</b> Melaka museums & cultural show; evening to Penang</li>
                    <li><b>Day 5:</b> George Town murals, clan jetties, Peranakan Museum</li>
                    <li><b>Day 6:</b> Penang Hill & free time (food hunting!)</li>
                    <li><b>Day 7:</b> Departure</li>
                </ol>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Includes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• 6 nights hotels with breakfast</li>
                            <li>• Intercity transfers (van/bus)</li>
                            <li>• Heritage & food experiences (tickets where stated)</li>
                            <li>• Licensed local guides</li>
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
