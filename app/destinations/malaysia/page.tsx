import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Malaysia Tours | Discovery Tours",
    description:
        "Discover Malaysia — from Langkawi’s islands to cultural heritage trails and Peninsular highlights.",
};

export default function MalaysiaPage() {
    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/malaysia-banner.jpg"
                    alt="Malaysia Tours"
                    width={1600}
                    height={900}
                    className="h-[48vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold">Malaysia Tours</h1>
                    <p className="text-white/90 mt-2 max-w-md">
                        Explore Peninsular Malaysia’s cultural heritage, lush highlands, and tropical islands.
                    </p>
                </div>
            </section>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-10 text-slate-700">
                <p className="text-lg">
                    From modern Kuala Lumpur to serene Cameron Highlands and pristine Langkawi, our Malaysia
                    collection blends culture, cuisine, and nature. Choose your adventure below.
                </p>
            </section>

            {/* Package cards */}
            <section className="max-w-6xl mx-auto px-6 pb-14 grid md:grid-cols-3 gap-6">
                {[
                    {
                        title: "4D3N Langkawi Island",
                        href: "/packages/langkawi-island-4d3n",
                        img: "/images/langkawi.jpg",
                        desc: "Island-hopping, SkyCab and sunsets.",
                    },
                    {
                        title: "7D6N Cultural Heritage Tours",
                        href: "/packages/cultural-heritage-7d6n",
                        img: "/images/malaysia-heritage.jpg",
                        desc: "KL, Melaka & Penang heritage circuit.",
                    },
                    {
                        title: "10D9N Peninsular Highlights",
                        href: "/packages/peninsular-highlights-10d9n",
                        img: "/images/malaysia-kl.jpg",
                        desc: "Grand Peninsular loop from KL to Taman Negara.",
                    },
                ].map((p) => (
                    <Link
                        key={p.title}
                        href={p.href}
                        className="group rounded-2xl overflow-hidden border bg-white hover:shadow-lg transition"
                    >
                        <Image
                            src={p.img}
                            alt={p.title}
                            width={400}
                            height={260}
                            className="h-48 w-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900">{p.title}</h3>
                            <p className="text-sm text-slate-600 mt-1">{p.desc}</p>
                            <span className="inline-flex items-center mt-3 text-sky-600 text-sm font-medium">
                                View details →
                            </span>
                        </div>
                    </Link>
                ))}
            </section>
        </main>
    );
}
