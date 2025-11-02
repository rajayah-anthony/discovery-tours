"use client";

import { useState } from "react";

export default function SettingsPage() {
    // demo-only local state (pretend these come from DB)
    const [businessName, setBusinessName] = useState("Discovery Tours");
    const [companyEmail, setCompanyEmail] = useState("hello@discoverytours.my");
    const [phone, setPhone] = useState("+60 12-345 6789");
    const [waPhone, setWaPhone] = useState("60123456789");
    const [bookingLink, setBookingLink] = useState("/contact");
    const [notifEmail, setNotifEmail] = useState(true);
    const [notifWhatsApp, setNotifWhatsApp] = useState(false);

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Settings</h1>

            {/* Business info */}
            <section className="rounded-xl border bg-white p-4 sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-slate-700">Business Information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Business / Brand Name</label>
                        <input
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Company Email</label>
                        <input
                            value={companyEmail}
                            onChange={(e) => setCompanyEmail(e.target.value)}
                            className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm"
                            type="email"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Phone (E.164 or local)</label>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">WhatsApp Number (no +)</label>
                        <input
                            value={waPhone}
                            onChange={(e) => setWaPhone(e.target.value)}
                            className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm"
                        />
                    </div>
                </div>
            </section>

            {/* Booking prefs */}
            <section className="rounded-xl border bg-white p-4 sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-slate-700">Booking Preferences</h2>
                <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
                    <div>
                        <label className="mb-1 block text-xs font-medium text-slate-600">Booking Link</label>
                        <input
                            value={bookingLink}
                            onChange={(e) => setBookingLink(e.target.value)}
                            className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm"
                            placeholder="/book-now or https://…"
                        />
                        <p className="mt-1 text-xs text-slate-500">
                            This link feeds your public ComboCTA and “Book Now” buttons.
                        </p>
                    </div>
                    <button
                        className="h-10 rounded-xl border px-3 text-sm hover:bg-slate-50"
                        onClick={() => alert("Demo: save booking preferences")}
                    >
                        Save
                    </button>
                </div>
            </section>

            {/* Notifications */}
            <section className="rounded-xl border bg-white p-4 sm:p-6">
                <h2 className="mb-4 text-sm font-semibold text-slate-700">Notifications</h2>
                <div className="space-y-3">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={notifEmail}
                            onChange={(e) => setNotifEmail(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <span className="text-sm">Email me when a new booking is created</span>
                    </label>

                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={notifWhatsApp}
                            onChange={(e) => setNotifWhatsApp(e.target.checked)}
                            className="h-4 w-4"
                        />
                        <span className="text-sm">Send WhatsApp alert for new bookings</span>
                    </label>

                    <div>
                        <button
                            className="mt-2 rounded-xl border px-3 py-2 text-sm hover:bg-slate-50"
                            onClick={() => alert("Demo: save notification settings")}
                        >
                            Save notification settings
                        </button>
                    </div>
                </div>
            </section>

            {/* Danger zone (demo-only) */}
            <section className="rounded-xl border bg-white p-4 sm:p-6">
                <h2 className="mb-3 text-sm font-semibold text-rose-700">Danger Zone</h2>
                <p className="mb-3 text-sm text-slate-600">
                    These actions are disabled in demo. In production, you might add “Reset demo data” or “Archive account”.
                </p>
                <button
                    className="cursor-not-allowed rounded-xl border border-rose-300 bg-rose-50 px-3 py-2 text-sm text-rose-700 opacity-70"
                    disabled
                >
                    Reset all demo data
                </button>
            </section>
        </div>
    );
}
