"use client";

import { useMemo, useState } from "react";

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
    joined: string;   // ISO or human
    bookings: number;
    lastTour?: string;
    status: "active" | "inactive";
};

export default function CustomersPage() {
    // 👇 demo data
    const data: Customer[] = useMemo(
        () => [
            {
                id: "C-1001",
                name: "Aina Razak",
                email: "aina@example.com",
                phone: "+60 12-345 6789",
                joined: "2024-11-01",
                bookings: 3,
                lastTour: "Klias River Cruise",
                status: "active",
            },
            {
                id: "C-1002",
                name: "Marcus Lee",
                email: "marcus.lee@example.com",
                phone: "+60 11-7878 4555",
                joined: "2024-10-18",
                bookings: 1,
                lastTour: "Kinabalu Sunrise Hike",
                status: "inactive",
            },
            {
                id: "C-1003",
                name: "Nurul Huda",
                email: "nurul.h@example.com",
                phone: "+60 13-222 1111",
                joined: "2024-09-05",
                bookings: 5,
                lastTour: "Kundasang Farm Tour",
                status: "active",
            },
        ],
        []
    );

    const [query, setQuery] = useState("");

    const filtered = useMemo(() => {
        const q = query.toLowerCase();
        return data.filter(
            (c) =>
                c.name.toLowerCase().includes(q) ||
                c.email.toLowerCase().includes(q) ||
                c.phone.toLowerCase().includes(q) ||
                c.id.toLowerCase().includes(q)
        );
    }, [data, query]);

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Customers</h1>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-slate-600">
                    Demo list — showing <strong>{filtered.length}</strong> of {data.length}
                </div>
                <div className="relative w-full sm:w-80">
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search by name, email, phone, or ID"
                        className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        ⌕
                    </span>
                </div>
            </div>

            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3 text-left">Contact</th>
                            <th className="px-4 py-3 text-left">Joined</th>
                            <th className="px-4 py-3 text-left">Bookings</th>
                            <th className="px-4 py-3 text-left">Last Tour</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((c) => (
                            <tr key={c.id} className="border-t">
                                <td className="px-4 py-3">
                                    <div className="font-medium">{c.name}</div>
                                    <div className="text-xs text-slate-500">{c.id}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div>{c.email}</div>
                                    <div className="text-xs text-slate-500">{c.phone}</div>
                                </td>
                                <td className="px-4 py-3">{c.joined}</td>
                                <td className="px-4 py-3">{c.bookings}</td>
                                <td className="px-4 py-3">{c.lastTour ?? "—"}</td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs ${c.status === "active"
                                                ? "bg-emerald-100 text-emerald-700"
                                                : "bg-slate-200 text-slate-700"
                                            }`}
                                    >
                                        {c.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <button className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50">
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filtered.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                                    No customers match your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Demo note */}
            <div className="rounded-xl border bg-sky-50 p-4 text-sm text-sky-800">
                This is a demo-only view. Hook this table to your database later to load real customers.
            </div>
        </div>
    );
}
