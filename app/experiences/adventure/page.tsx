export const metadata = {
    title: "Adventure | Discovery Tours",
    description: "Demo page for Adventure experiences.",
};

export default function AdventurePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Adventure</h1>
                <p className="text-gray-600 mb-8">
                    Demo only — thrilling hikes, treks, and outdoor fun. Real listings coming soon.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6">Kinabalu Sunrise Hike (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Crocker Range Trek (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Zipline & Via Ferrata (Demo)</div>
                </div>
            </section>
        </main>
    );
}
