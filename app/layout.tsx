import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ComboCTA from "../components/ComboCTA";
import BackToTop from "../components/BackToTop"; // ✅ unified
import HideOnAdmin from "../components/HideOnAdmin"; // ✅ NEW
import { Suspense } from "react"; // ✅

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Discovery Tours",
  description: "Memorable Sabah journeys — built the modern headless way.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const bookingHref = process.env.NEXT_PUBLIC_BOOKING_URL || "/contact";
  const phoneE164 = process.env.NEXT_PUBLIC_PHONE_E164 || "+60123456789";
  const whatsappPhone = process.env.NEXT_PUBLIC_WA_PHONE || "60123456789";
  const waMsg =
    process.env.NEXT_PUBLIC_WA_DEFAULT_MSG ||
    "Hi! I'm interested in your tours. Could you share dates and prices?";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-sky-50 to-white text-slate-800`}
      >
        <Navbar />

        {/* extra bottom padding so mobile sticky bar won't cover content */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 md:pb-12 pb-[calc(5.5rem+env(safe-area-inset-bottom))]">
          {children}
        </main>

        <Footer />
        <BackToTop />

        {/* ✅ Wrap in Suspense because ComboCTA uses useSearchParams via HideOnAdmin/itself */}
        <Suspense fallback={null}>
          <HideOnAdmin>
            <ComboCTA
              bookingHref={bookingHref}
              phoneE164={phoneE164}
              whatsappPhone={whatsappPhone}
              defaultMessage={waMsg}
              showOnDesktop
              showOnMobileBar
              label="Book / Chat"
            />
          </HideOnAdmin>
        </Suspense>
      </body>
    </html>
  );
}
