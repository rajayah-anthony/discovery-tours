// app/deals/[slug]/page.tsx
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { deals, getDiscountPercent, isActiveDeal } from "../../../lib/deals";
import DiscountBadge from "../../../components/DiscountBadge";
import Countdown from "../../../components/Countdown";
import StickyDealBar from "../../../components/StickyDealBar";

// --- SEO
type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return deals.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params; // ✅ unwrap Promise in Next 15
    const deal = deals.find((d) => d.slug === slug);
    if (!deal) return {};
    const pct = getDiscountPercent(deal);
    const title = `${deal.title} – RM${deal.salePrice} (${pct}% OFF)`;
    const desc = `${deal.location} • ${deal.duration}${deal.highlight ? ` • ${deal.highlight}` : ""}`;
    const url = `/deals/${deal.slug}`;

    return {
        title,
        description: desc,
        openGraph: {
            title,
            description: desc,
            url,
            images: [{ url: deal.image }],
            type: "website",
        },
        alternates: { canonical: url },
    };
}

export default async function DealDetailPage({ params }: Props) {
    const { slug } = await params; // ✅ unwrap Promise in Next 15
    const deal = deals.find((d) => d.slug === slug);
    if (!deal) return notFound();

    const active = isActiveDeal(deal);
    const pct = getDiscountPercent(deal);

    const endsAt = deal.endsAt ? new Date(deal.endsAt) : null;
    const startsAt = deal.startsAt ? new Date(deal.startsAt) : null;

    // Prefill WhatsApp message (fallback to /contact if you prefer)
    const waNumber = process.env.NEXT_PUBLIC_WA_PHONE || "60123456789";
    const msg = encodeURIComponent(
        `Hi, I'm interested in "${deal.title}" promo.\n\nPromo code: ${deal.promoCode ?? "-"}\nPrice: RM${deal.salePrice
        } (was RM${deal.originalPrice})\nDates: ${deal.duration}\n\nPlease assist with booking.`
    );
    const waHref = `https://wa.me/${waNumber}?text=${msg}`;

    return (
        <main className="min-h-screen bg-gradient-to-b from-white to-slate-50/70 pb-28 md:pb-0">
            {/* Hero */}
            <section className="relative">
                <div className="relative h-[42vh] md:h-[56vh]">
                    <Image
                        src={deal.image}
                        alt={deal.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0">
                        <div className="mx-auto max-w-7xl px-6 py-6">
                            <div className="flex flex-wrap items-end gap-3">
                                <DiscountBadge deal={deal} />
                                {deal.source && (
                                    <span className="rounded-full bg-white/90 px-2.5 py-1 text-xs ring-1 ring-slate-200">
                                        {deal.source}
                                    </span>
                                )}
                                {deal.promoCode && (
                                    <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-xs ring-1 ring-emerald-200">
                                        Code: {deal.promoCode}
                                    </span>
                                )}
                                {!active && (
                                    <span className="rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs ring-1 ring-slate-200">
                                        Expired
                                    </span>
                                )}
                            </div>

                            <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white drop-shadow">
                                {deal.title}
                            </h1>
                            <p className="mt-2 text-white/90">
                                {deal.location} • {deal.duration}
                                {deal.highlight ? ` • ${deal.highlight}` : ""}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Body */}
            <section className="mx-auto max-w-7xl px-6 py-8 grid gap-8 md:grid-cols-[1fr_360px]">
                {/* Left: details */}
                <article>
                    {/* Countdown / validity window */}
                    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-5">
                        {startsAt && endsAt ? (
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="text-sm text-slate-600">
                                    Valid from <b>{startsAt.toLocaleDateString()}</b> to{" "}
                                    <b>{endsAt.toLocaleDateString()}</b>
                                    {deal.meetingPoint ? (
                                        <>
                                            {" "}• Meet at: <b>{deal.meetingPoint}</b>
                                        </>
                                    ) : null}
                                    {deal.difficulty ? (
                                        <>
                                            {" "}• Difficulty: <b>{deal.difficulty}</b>
                                        </>
                                    ) : null}
                                </div>
                                {active && endsAt && <Countdown endsAt={endsAt} />}
                            </div>
                        ) : endsAt ? (
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-slate-600">
                                    Ends on <b>{endsAt.toLocaleDateString()}</b>
                                    {deal.meetingPoint ? (
                                        <>
                                            {" "}• Meet at: <b>{deal.meetingPoint}</b>
                                        </>
                                    ) : null}
                                    {deal.difficulty ? (
                                        <>
                                            {" "}• Difficulty: <b>{deal.difficulty}</b>
                                        </>
                                    ) : null}
                                </div>
                                {active && <Countdown endsAt={endsAt} />}
                            </div>
                        ) : null}
                    </div>

                    {/* RICH DETAILS */}
                    <div className="mt-6 grid gap-6">
                        {deal.description && (
                            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                                <h2 className="text-lg font-semibold">About this deal</h2>
                                <p className="mt-2 text-slate-700">{deal.description}</p>
                                {deal.tags?.length ? (
                                    <p className="mt-3 text-slate-600">Highlights: {deal.tags.join(" • ")}</p>
                                ) : null}
                            </div>
                        )}

                        {(deal.includes?.length || deal.exclusions?.length) && (
                            <div className="grid gap-6 md:grid-cols-2">
                                {deal.includes?.length ? (
                                    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                                        <h3 className="text-lg font-semibold">What’s included</h3>
                                        <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                                            {deal.includes.map((x, i) => (
                                                <li key={i}>{x}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}

                                {deal.exclusions?.length ? (
                                    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                                        <h3 className="text-lg font-semibold">Exclusions</h3>
                                        <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                                            {deal.exclusions.map((x, i) => (
                                                <li key={i}>{x}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </div>
                        )}

                        {deal.itinerary?.length ? (
                            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                                <h3 className="text-lg font-semibold">Sample Itinerary</h3>
                                <ol className="mt-2 list-decimal pl-5 text-slate-700 space-y-1">
                                    {deal.itinerary.map((x, i) => (
                                        <li key={i}>{x}</li>
                                    ))}
                                </ol>
                            </div>
                        ) : null}

                        {deal.terms?.length ? (
                            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                                <h3 className="text-lg font-semibold">Good to know</h3>
                                <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
                                    {deal.terms.map((x, i) => (
                                        <li key={i}>{x}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {deal.gallery?.length ? (
                            <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                                <h3 className="text-lg font-semibold">Gallery</h3>
                                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                                    {deal.gallery.map((src, i) => (
                                        <div key={i} className="relative h-36 rounded-xl overflow-hidden">
                                            <Image
                                                src={src}
                                                alt={`${deal.title} photo ${i + 1}`}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 640px) 33vw, 100vw"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </article>

                {/* Right: price card */}
                <aside className="md:sticky md:top-6 self-start">
                    <div className="rounded-2xl bg-white ring-1 ring-slate-200 p-6">
                        <div className="flex items-end gap-3">
                            <div className="text-3xl font-extrabold">RM{deal.salePrice}</div>
                            <div className="text-slate-500 line-through">RM{deal.originalPrice}</div>
                            {pct > 0 && (
                                <span className="text-sm text-emerald-700 font-semibold">Save {pct}%</span>
                            )}
                        </div>

                        {deal.quotaLeft != null && (
                            <p className="mt-2 text-sm text-amber-700 bg-amber-50 ring-1 ring-amber-200 px-2 py-1 rounded">
                                {deal.quotaLeft} packages left
                            </p>
                        )}

                        {deal.promoCode && (
                            <p className="mt-3 text-sm">
                                Use promo code: <b>{deal.promoCode}</b>
                            </p>
                        )}

                        <div className="mt-5 grid gap-2">
                            <a
                                href={waHref}
                                className={`inline-flex items-center justify-center rounded-xl px-4 py-3 font-medium text-white ${active ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-400 cursor-not-allowed"
                                    }`}
                                aria-disabled={!active}
                            >
                                {active ? "Book on WhatsApp" : "Deal expired"}
                            </a>
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-xl px-4 py-3 font-medium bg-white ring-1 ring-slate-200 hover:bg-slate-50"
                            >
                                Ask a question
                            </a>
                        </div>

                        <p className="mt-4 text-xs text-slate-500">
                            Secure checkout via WhatsApp. We’ll confirm dates and traveller details before payment.
                        </p>
                    </div>
                </aside>
            </section>

            {/* Sticky CTA on mobile */}
            <StickyDealBar
                active={active}
                price={deal.salePrice}
                original={deal.originalPrice}
                href={waHref}
                expiredLabel="Deal expired"
            />

            {/* JSON-LD (Product + Offer) */}
            <script
                type="application/ld+json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Product",
                        name: deal.title,
                        image: [deal.image],
                        description: `${deal.location} • ${deal.duration}`,
                        brand: "Discovery Tours",
                        offers: {
                            "@type": "Offer",
                            priceCurrency: "MYR",
                            price: String(deal.salePrice),
                            url: `https://example.com/deals/${deal.slug}`,
                            availability:
                                deal.quotaLeft && deal.quotaLeft > 0
                                    ? "https://schema.org/InStock"
                                    : "https://schema.org/LimitedAvailability",
                            validFrom: deal.startsAt ?? undefined,
                            priceValidUntil: deal.endsAt ?? undefined,
                        },
                    }),
                }}
            />
        </main>
    );
}
