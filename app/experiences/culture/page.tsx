export const metadata = {
    title: "Culture | Discovery Tours",
    description: "Demo page for Cultural experiences.",
};

export default function CulturePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Culture</h1>
                <p className="text-gray-600 mb-8">
                    Demo only — village life, crafts, heritage. Real listings coming soon.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6">Cultural Village Tour (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Bamboo Cooking & Dance (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Handicraft Workshop (Demo)</div>
                </div>
            </section>
        </main>
    );
}
