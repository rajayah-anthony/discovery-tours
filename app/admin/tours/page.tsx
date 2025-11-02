"use client";

import { useState } from "react";

type Tour = {
    id: string;
    title: string;
    location: string;
    price: number;
    status: "active" | "draft";
};

const demoTours: Tour[] = [
    { id: "t1", title: "Kinabalu Sunrise Hike", location: "Kundasang", price: 350, status: "active" },
    { id: "t2", title: "Klias River Cruise", location: "Beaufort", price: 180, status: "active" },
    { id: "t3", title: "Island Hopping", location: "Kota Kinabalu", price: 190, status: "draft" },
];

export default function AdminToursPage() {
    const [rows, setRows] = useState<Tour[]>(demoTours);

    const toggleStatus = (id: string) =>
        setRows((s) =>
            s.map((r) => (r.id === id ? { ...r, status: r.status === "active" ? "draft" : "active" } : r))
        );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Tours</h1>
                <button className="rounded-xl bg-sky-600 text-white px-4 py-2 text-sm hover:bg-sky-700">
                    + New Tour
                </button>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-left text-slate-500 border-b">
                            <th className="p-3">Title</th>
                            <th className="p-3">Location</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((t) => (
                            <tr key={t.id} className="border-b last:border-0">
                                <td className="p-3 font-medium">{t.title}</td>
                                <td className="p-3">{t.location}</td>
                                <td className="p-3">RM {t.price}</td>
                                <td className="p-3">
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs ${t.status === "active" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                                            }`}
                                    >
                                        {t.status}
                                    </span>
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-end gap-2">
                                        <button className="rounded-lg border px-3 py-1 hover:bg-slate-50">Edit</button>
                                        <button
                                            onClick={() => toggleStatus(t.id)}
                                            className="rounded-lg border px-3 py-1 hover:bg-slate-50"
                                        >
                                            {t.status === "active" ? "Disable" : "Activate"}
                                        </button>
                                        <button className="rounded-lg border px-3 py-1 text-red-600 hover:bg-red-50">Delete</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
