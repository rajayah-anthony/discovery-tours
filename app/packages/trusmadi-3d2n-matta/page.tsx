import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "3D2N Explore Trusmadi (Matta Fair) | Discovery Tours",
    description:
        "Summit Trusmadi, Malaysia’s second-highest mountain. 3D2N guided climb with basecamp stays and sunrise views over Kinabalu (weather permitting).",
};

export default function Page() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/trusmadi.jpg"
                    alt="Mount Trusmadi"
                    width={1600}
                    height={900}
                    className="h-[60vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-4xl font-extrabold">3D2N Explore Trusmadi (Matta Fair)</h1>
                    <p className="text-white/90 mt-1">Summit trek • Sunrise • Mossy forest</p>
                </div>
            </section>

            {/* Quick facts */}
            <section className="mx-auto max-w-5xl px-6 py-10 grid md:grid-cols-3 gap-6">
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Duration</p>
                    <p className="text-lg font-semibold">3 Days 2 Nights</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Grade</p>
                    <p className="text-lg font-semibold">Challenging</p>
                </div>
                <div className="rounded-2xl border p-5">
                    <p className="text-xs uppercase tracking-wider text-slate-500">Max altitude</p>
                    <p className="text-lg font-semibold">~2,642m</p>
                </div>
            </section>

            {/* Highlights */}
            <section className="mx-auto max-w-5xl px-6 pb-6">
                <h2 className="text-2xl font-bold">Trip Highlights</h2>
                <ul className="mt-4 grid md:grid-cols-2 gap-3 text-slate-700">
                    <li>• Summit attempt with panoramic sunrise (weather dependent)</li>
                    <li>• Rich mossy forest and montane vegetation</li>
                    <li>• Smaller group size and licensed mountain guide</li>
                    <li>• Rustic basecamp experience</li>
                </ul>
            </section>

            {/* Itinerary */}
            <section className="mx-auto max-w-5xl px-6 pb-12">
                <h3 className="text-xl font-semibold">Outline Itinerary</h3>
                <ol className="mt-4 space-y-3 text-slate-700">
                    <li><b>Day 1:</b> Transfer from KK to trailhead/basecamp (Tambunan/Keningau route). Safety briefing. Early rest.</li>
                    <li><b>Day 2:</b> Pre-dawn start for summit attempt. Enjoy sunrise near peak (conditions permitting). Descend to camp for rest.</li>
                    <li><b>Day 3:</b> Descend to trailhead. Transfer back to KK. Tour ends.</li>
                </ol>

                <div className="mt-8 grid md:grid-cols-2 gap-6">
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Includes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Mountain permits & local guide</li>
                            <li>• 2 nights basecamp/lodge (basic)</li>
                            <li>• Meals as stated in program</li>
                            <li>• Return land transfers ex-KK</li>
                        </ul>
                    </div>
                    <div className="rounded-2xl border p-5">
                        <h4 className="font-semibold">Excludes</h4>
                        <ul className="mt-2 space-y-1 text-slate-700">
                            <li>• Personal hiking gear & porter</li>
                            <li>• Travel insurance</li>
                            <li>• Tips & personal expenses</li>
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
