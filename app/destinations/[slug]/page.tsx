import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { DESTINATIONS, getDestination } from "@/lib/destinations";
import Link from "next/link";

// 👇 params is now a Promise in Next 15
type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    return DESTINATIONS.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
    { params }: Props,
    _res: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params; // 👈 unwrap
    const d = getDestination(slug);
    if (!d) return { title: "Destination | Discovery Tours" };
    const title = `${d.name} — ${d.tagline} | Discovery Tours`;
    const description = d.summary;
    const images = d.hero ? [{ url: d.hero }] : undefined;
    return {
        title,
        description,
        openGraph: { title, description, images },
        twitter: { card: "summary_large_image", title, description, images },
    };
}

export default async function DestinationPage({ params }: Props) {
    const { slug } = await params; // 👈 unwrap
    const d = getDestination(slug);
    if (!d) return notFound();

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image src={d.hero} alt={d.name} fill priority className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
                </div>

                <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-20 text-white">
                    <span className="inline-block rounded-full bg-white/15 px-3 py-1 text-sm">
                        Destination
                    </span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
                        {d.name}
                    </h1>
                    <p className="mt-3 max-w-2xl text-white/90">{d.tagline}</p>
                    <div className="mt-6 flex gap-3">
                        <Link
                            href="/tours"
                            className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold shadow hover:bg-emerald-400"
                        >
                            Browse Tours
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-xl bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
                        >
                            Plan my trip
                        </Link>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="mx-auto max-w-7xl px-6 py-12 grid lg:grid-cols-3 gap-10">
                {/* Left: summary + highlights */}
                <article className="lg:col-span-2 space-y-8">
                    <div>
                        <h2 className="text-2xl font-bold">Why {d.name}</h2>
                        <p className="mt-3 text-gray-700">{d.summary}</p>
                    </div>

                    {d.highlights?.length ? (
                        <div>
                            <h3 className="text-xl font-semibold">Highlights</h3>
                            <ul className="mt-3 grid sm:grid-cols-2 gap-3">
                                {d.highlights.map((h) => (
                                    <li key={h} className="rounded-xl border p-4 bg-white shadow-sm">
                                        {h}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : null}

                    {d.gallery?.length ? (
                        <div>
                            <h3 className="text-xl font-semibold">Gallery</h3>
                            <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                                {d.gallery.map((src, i) => (
                                    <div key={i} className="relative h-36 md:h-44 rounded-xl overflow-hidden">
                                        <Image src={src} alt={`${d.name} ${i + 1}`} fill className="object-cover" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : null}
                </article>

                {/* Right: quick facts + map + CTA */}
                <aside className="space-y-6">
                    {d.quickFacts?.length ? (
                        <div className="rounded-2xl border bg-white p-5 shadow-sm">
                            <h3 className="text-lg font-semibold">Quick facts</h3>
                            <dl className="mt-3 space-y-2">
                                {d.quickFacts.map((q) => (
                                    <div key={q.label} className="flex justify-between gap-4">
                                        <dt className="text-gray-600">{q.label}</dt>
                                        <dd className="font-medium">{q.value}</dd>
                                    </div>
                                ))}
                            </dl>
                        </div>
                    ) : null}

                    <div className="rounded-2xl overflow-hidden border bg-white shadow-sm">
                        <div className="relative h-56 w-full">
                            {!d.map ? (
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-100 to-teal-100" />
                            ) : (
                                <iframe
                                    title={`${d.name} map`}
                                    className="absolute inset-0 h-full w-full"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    src={`https://www.google.com/maps?q=${d.map.lat},${d.map.lng}&hl=en&z=${d.map.zoom ?? 11
                                        }&output=embed`}
                                />
                            )}
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-600">
                                Map preview — ask us for a custom route plan.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-gradient-to-br from-emerald-50 to-teal-50 p-6 shadow-sm">
                        <h4 className="text-lg font-semibold">Ready to go?</h4>
                        <p className="mt-2 text-gray-700">
                            Tell us your dates and travel style — we’ll customise an itinerary.
                        </p>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex rounded-xl bg-emerald-500 px-4 py-2 font-semibold text-white hover:bg-emerald-400"
                        >
                            Get a free plan
                        </Link>
                    </div>
                </aside>
            </section>

            {/* Related CTA */}
            <section className="mx-auto max-w-7xl px-6 pb-16">
                <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-8 flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                        <h3 className="text-2xl font-bold">Popular tours around {d.name}</h3>
                        <p className="mt-1 text-white/90">
                            Island hopping, wildlife cruises, and sunrise trips — curated by locals.
                        </p>
                    </div>
                    <Link
                        href="/tours"
                        className="mt-4 md:mt-0 inline-flex rounded-xl bg-white/10 px-5 py-3 font-semibold backdrop-blur hover:bg-white/20"
                    >
                        View tours
                    </Link>
                </div>
            </section>
        </main>
    );
}
