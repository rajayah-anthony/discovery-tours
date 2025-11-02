export const metadata = {
    title: "Islands & Beaches | Discovery Tours",
    description: "Demo page for Island & Beach experiences.",
};

export default function IslandsBeachesPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Islands & Beaches</h1>
                <p className="text-gray-600 mb-8">
                    Demo only — snorkelling, island hopping, sandy coves. Real listings coming soon.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6">Snorkeling Safari (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Manukan Day Trip (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Sunset Beach Chill (Demo)</div>
                </div>
            </section>
        </main>
    );
}
