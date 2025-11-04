import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getBorneoTours } from "@/lib/tours";
import BorneoGrid from "@/components/BorneoGrid";

export const metadata: Metadata = {
    title: "Borneo Adventures | Discovery Tours",
    description:
        "Sabah, Sarawak and Brunei — discover the wild heart of Borneo with rainforest treks, caves and islands.",
    alternates: { canonical: "/destinations/borneo" },
};

export default function BorneoPage() {
    const tours = getBorneoTours(); // ✅ full Tour[] with all required fields

    return (
        <main className="min-h-screen">
            {/* Hero */}
            <section className="relative">
                <Image
                    src="/images/borneo-banner.jpg"
                    alt="Orangutans in Borneo rainforest"
                    width={1600}
                    height={900}
                    className="h-[48vh] w-full object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                    <h1 className="text-3xl md:text-5xl font-extrabold">
                        Borneo Adventures
                    </h1>
                    <p className="text-white/90 mt-2 max-w-xl">
                        Experience rainforest expeditions, tribal culture and breathtaking
                        natural beauty.
                    </p>
                </div>
            </section>

            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-6 mt-6">
                <ol className="flex items-center gap-2 text-sm text-slate-500">
                    <li>
                        <Link href="/" className="hover:text-slate-700">
                            Home
                        </Link>
                    </li>
                    <li>›</li>
                    <li>
                        <Link href="/destinations" className="hover:text-slate-700">
                            Destinations
                        </Link>
                    </li>
                    <li>›</li>
                    <li className="text-slate-700 font-medium">Borneo</li>
                </ol>
            </nav>

            {/* Intro */}
            <section className="max-w-6xl mx-auto px-6 py-8 text-slate-700">
                <p className="text-lg">
                    From the peaks of Mount Kinabalu to the caves of Mulu and rivers of Sarawak,
                    Borneo is a natural paradise. These adventures are crafted for
                    explorers and nature lovers alike.
                </p>
            </section>

            {/* Filterable grid */}
            <BorneoGrid tours={tours} />
        </main>
    );
}
