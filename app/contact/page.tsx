import { Suspense } from "react";
import HeroSection from "@/components/HeroSection";
import ContactClient from "./ContactClient";

export const metadata = {
    title: "Contact | Discovery Tours",
    description: "Get in touch with our team.",
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800">
            {/* Optional hero */}
            <HeroSection background="/images/kinabalu.jpg" />

            <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10">
                {/* Left column */}
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">Get a personalised quote</h1>
                    <p className="mt-3 text-slate-600">
                        Share your preferred dates, group size, and interests. We’ll reply with
                        package options and pricing.
                    </p>

                    <ul className="mt-6 space-y-2 text-sm text-slate-700">
                        <li>📞 WhatsApp: +60 12-345 6789</li>
                        <li>📧 Email: hello@discoverytours.my</li>
                        <li>🕘 Office Hours: Mon–Sat, 9:00 – 18:00</li>
                    </ul>
                </div>

                {/* Right column — client logic behind Suspense */}
                <Suspense fallback={null}>
                    <ContactClient />
                </Suspense>
            </section>
        </main>
    );
}
