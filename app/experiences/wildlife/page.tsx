export const metadata = {
    title: "Wildlife | Discovery Tours",
    description: "Demo page for Wildlife experiences.",
};

export default function WildlifePage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
            <section className="max-w-7xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Wildlife</h1>
                <p className="text-gray-600 mb-8">
                    Demo only — proboscis monkeys, fireflies, orangutans. Real listings coming soon.
                </p>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-6">Klias River Cruise (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Fireflies Night Tour (Demo)</div>
                    <div className="rounded-xl border bg-white p-6">Orangutan Encounter (Demo)</div>
                </div>
            </section>
        </main>
    );
}
