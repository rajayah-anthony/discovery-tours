"use client";

import { useEffect, useMemo, useState } from "react";

type Booking = {
    id: string;
    date: string; // ISO
    name: string;
    email: string;
    phone: string;
    tour: string;
    pax: number;
    amount: number; // RM
    status: "pending" | "confirmed" | "cancelled" | "refunded";
    notes?: string;
};

// ---- Demo seed ----------------------------------------------------------------
const DEMO: Booking[] = [
    {
        id: "B-202411-0001",
        date: "2024-11-02T10:15:00+08:00",
        name: "Aina Razak",
        email: "aina@example.com",
        phone: "+60 12-345 6789",
        tour: "Klias River Cruise",
        pax: 2,
        amount: 360,
        status: "confirmed",
        notes: "Vegetarian meal.",
    },
    {
        id: "B-202410-0007",
        date: "2024-10-28T14:00:00+08:00",
        name: "Marcus Lee",
        email: "marcus.lee@example.com",
        phone: "+60 11-7878 4555",
        tour: "Kinabalu Sunrise Hike",
        pax: 1,
        amount: 350,
        status: "pending",
    },
    {
        id: "B-202410-0008",
        date: "2024-10-29T09:20:00+08:00",
        name: "Nurul Huda",
        email: "nurul.h@example.com",
        phone: "+60 13-222 1111",
        tour: "Kundasang Farm Tour",
        pax: 4,
        amount: 520,
        status: "confirmed",
    },
    {
        id: "B-202409-0012",
        date: "2024-09-14T08:30:00+08:00",
        name: "John Chan",
        email: "john.chan@example.com",
        phone: "+60 16-888 9999",
        tour: "Island Hopping",
        pax: 3,
        amount: 750,
        status: "cancelled",
        notes: "Flight delay.",
    },
    {
        id: "B-202409-0013",
        date: "2024-09-22T11:45:00+08:00",
        name: "Lydia Wong",
        email: "lydiaw@example.com",
        phone: "+60 19-555 1234",
        tour: "Padas White Water Rafting",
        pax: 2,
        amount: 700,
        status: "refunded",
    },
];

// ---- Helpers ------------------------------------------------------------------
function fmtDate(s: string) {
    const d = new Date(s);
    return d.toLocaleString(undefined, {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}
function statusPill(s: Booking["status"]) {
    const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs";
    switch (s) {
        case "confirmed":
            return `${base} bg-emerald-100 text-emerald-700`;
        case "pending":
            return `${base} bg-amber-100 text-amber-800`;
        case "cancelled":
            return `${base} bg-slate-200 text-slate-700`;
        case "refunded":
            return `${base} bg-rose-100 text-rose-700`;
    }
}

// ---- Modal component ----------------------------------------------------------
function BookingModal({
    open,
    booking,
    onClose,
    onSave,
    onRefund,
    onCancelBooking,
    onPrint,
}: {
    open: boolean;
    booking: Booking | null;
    onClose: () => void;
    onSave: (b: Booking) => void;
    onRefund: (id: string) => void;
    onCancelBooking: (id: string) => void;
    onPrint: (b: Booking) => void;
}) {
    const [draft, setDraft] = useState<Booking | null>(booking);

    useEffect(() => setDraft(booking), [booking, open]);

    // ESC to close
    useEffect(() => {
        if (!open) return;
        const h = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [open, onClose]);

    if (!open || !draft) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            role="dialog"
            aria-modal="true"
            onMouseDown={(e) => {
                // close when clicking overlay
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 w-full sm:max-w-2xl sm:rounded-2xl sm:border bg-white shadow-xl">
                <div className="flex items-center justify-between border-b px-4 py-3">
                    <div className="font-semibold text-sm">Booking {draft.id}</div>
                    <button
                        onClick={onClose}
                        className="rounded-lg border px-2 py-1 text-sm"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid gap-4 p-4 sm:p-6">
                    {/* Top summary */}
                    <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-xl border p-3">
                            <div className="text-xs text-slate-500">Customer</div>
                            <div className="font-medium">{draft.name}</div>
                            <div className="text-sm text-slate-600">{draft.email}</div>
                            <div className="text-sm text-slate-600">{draft.phone}</div>
                        </div>
                        <div className="rounded-xl border p-3">
                            <div className="text-xs text-slate-500">Tour & Date</div>
                            <div className="font-medium">{draft.tour}</div>
                            <div className="text-sm text-slate-600">{fmtDate(draft.date)}</div>
                            <div className="text-sm text-slate-600">
                                Pax: <strong>{draft.pax}</strong> • Amount: <strong>RM {draft.amount.toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>

                    {/* Editable fields */}
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
                            <select
                                value={draft.status}
                                onChange={(e) =>
                                    setDraft({ ...draft, status: e.target.value as Booking["status"] })
                                }
                                className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm bg-white"
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="cancelled">Cancelled</option>
                                <option value="refunded">Refunded</option>
                            </select>
                        </div>

                        <div>
                            <label className="mb-1 block text-xs font-medium text-slate-600">Internal notes</label>
                            <textarea
                                value={draft.notes ?? ""}
                                onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                                rows={3}
                                className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm"
                                placeholder="Special requests, follow-up reminders, etc."
                            />
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex flex-wrap gap-2">
                            <span className={statusPill(draft.status)}>{draft.status}</span>
                            <button
                                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                                onClick={() => onPrint(draft)}
                            >
                                Print invoice
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button
                                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                                onClick={() => onSave(draft)}
                            >
                                Save changes
                            </button>
                            <button
                                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                                onClick={() => onCancelBooking(draft.id)}
                            >
                                Mark cancelled
                            </button>
                            <button
                                className="rounded-xl border px-3 py-1.5 text-sm hover:bg-slate-50"
                                onClick={() => onRefund(draft.id)}
                            >
                                Mark refunded
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl border bg-sky-50 p-3 text-xs text-sky-800">
                        Demo-only: changes are stored in memory and reset on refresh.
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---- Page --------------------------------------------------------------------
export default function BookingsPage() {
    // local state copy to allow editing
    const [bookings, setBookings] = useState<Booking[]>(() => DEMO.map((b) => ({ ...b })));

    const [query, setQuery] = useState("");
    const [status, setStatus] = useState<Booking["status"] | "all">("all");
    const [range, setRange] = useState<"all" | "30d" | "7d" | "today">("all");
    const [sort, setSort] = useState<"date_desc" | "date_asc" | "amount_desc" | "amount_asc">(
        "date_desc"
    );
    const [page, setPage] = useState(1);
    const pageSize = 8;

    const [modalOpen, setModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const selected = useMemo(
        () => bookings.find((b) => b.id === selectedId) || null,
        [bookings, selectedId]
    );

    // filter/sort
    const filtered = useMemo(() => {
        const now = new Date();
        const start =
            range === "today"
                ? new Date(now.getFullYear(), now.getMonth(), now.getDate())
                : range === "7d"
                    ? new Date(now.getTime() - 7 * 86400000)
                    : range === "30d"
                        ? new Date(now.getTime() - 30 * 86400000)
                        : null;

        const q = query.toLowerCase();
        let arr = bookings.filter((b) => {
            const matchText =
                b.name.toLowerCase().includes(q) ||
                b.email.toLowerCase().includes(q) ||
                b.tour.toLowerCase().includes(q) ||
                b.id.toLowerCase().includes(q);
            const matchStatus = status === "all" ? true : b.status === status;
            const matchRange = start ? new Date(b.date).getTime() >= start.getTime() : true;
            return matchText && matchStatus && matchRange;
        });

        arr.sort((a, b) => {
            if (sort === "date_desc") return +new Date(b.date) - +new Date(a.date);
            if (sort === "date_asc") return +new Date(a.date) - +new Date(b.date);
            if (sort === "amount_desc") return b.amount - a.amount;
            return a.amount - b.amount;
        });

        return arr;
    }, [bookings, query, status, range, sort]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const pageSlice = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered.slice(start, start + pageSize);
    }, [filtered, page]);

    const resetPage = () => setPage(1);

    // csv export
    const exportCsv = () => {
        const header = [
            "id",
            "date",
            "name",
            "email",
            "phone",
            "tour",
            "pax",
            "amount_rm",
            "status",
            "notes",
        ];
        const rows = filtered.map((b) => [
            b.id,
            new Date(b.date).toISOString(),
            b.name,
            b.email,
            b.phone,
            b.tour,
            String(b.pax),
            String(b.amount),
            b.status,
            (b.notes ?? "").replace(/\n/g, " "),
        ]);
        const csv = [header, ...rows].map((r) => r.map(escapeCsv).join(",")).join("\n");
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "bookings_demo.csv";
        a.click();
        URL.revokeObjectURL(url);
    };
    function escapeCsv(value: string) {
        if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
        return value;
    }

    // modal handlers
    const openView = (id: string) => {
        setSelectedId(id);
        setModalOpen(true);
    };
    const saveBooking = (draft: Booking) => {
        setBookings((prev) => prev.map((b) => (b.id === draft.id ? { ...draft } : b)));
        setModalOpen(false);
    };
    const markRefunded = (id: string) => {
        setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: "refunded" } : b))
        );
    };
    const markCancelled = (id: string) => {
        setBookings((prev) =>
            prev.map((b) => (b.id === id ? { ...b, status: "cancelled" } : b))
        );
    };

    // printable invoice
    const printInvoice = (b: Booking) => {
        const win = window.open("", "_blank");
        if (!win) return;
        win.document.write(`
      <html>
      <head>
        <title>Invoice ${b.id}</title>
        <style>
          body { font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; padding: 24px; }
          h1 { font-size: 18px; margin-bottom: 8px; }
          .box { border: 1px solid #e5e7eb; border-radius: 12px; padding: 16px; margin-bottom: 12px; }
          .row { display: flex; justify-content: space-between; margin: 6px 0; }
          .muted { color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Discovery Tours — Invoice</h1>
        <div class="muted">Demo invoice for printing</div>

        <div class="box">
          <div class="row"><strong>Invoice #</strong><span>${b.id}</span></div>
          <div class="row"><strong>Date</strong><span>${fmtDate(b.date)}</span></div>
          <div class="row"><strong>Status</strong><span>${b.status}</span></div>
        </div>

        <div class="box">
          <div class="row"><strong>Customer</strong><span>${b.name}</span></div>
          <div class="row"><strong>Email</strong><span>${b.email}</span></div>
          <div class="row"><strong>Phone</strong><span>${b.phone}</span></div>
        </div>

        <div class="box">
          <div class="row"><strong>Tour</strong><span>${b.tour}</span></div>
          <div class="row"><strong>Pax</strong><span>${b.pax}</span></div>
          <div class="row"><strong>Amount</strong><span>RM ${b.amount.toFixed(2)}</span></div>
        </div>

        <p class="muted">Notes: ${b.notes ? b.notes.replace(/</g, '&lt;') : "-"}</p>

        <script>window.print();</script>
      </body>
      </html>
    `);
        win.document.close();
    };

    return (
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Bookings</h1>

            {/* Controls */}
            <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto_auto_auto] md:items-end">
                <div className="relative">
                    <label className="mb-1 block text-xs font-medium text-slate-600">Search</label>
                    <input
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            resetPage();
                        }}
                        placeholder="Name, email, tour or ID…"
                        className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-200"
                    />
                    <span className="pointer-events-none absolute right-3 top-[34px] -translate-y-1/2 text-slate-400 text-sm">
                        ⌕
                    </span>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Status</label>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value as any);
                            resetPage();
                        }}
                        className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm bg-white"
                    >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Date range</label>
                    <select
                        value={range}
                        onChange={(e) => {
                            setRange(e.target.value as any);
                            resetPage();
                        }}
                        className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm bg-white"
                    >
                        <option value="all">All time</option>
                        <option value="30d">Last 30 days</option>
                        <option value="7d">Last 7 days</option>
                        <option value="today">Today</option>
                    </select>
                </div>

                <div>
                    <label className="mb-1 block text-xs font-medium text-slate-600">Sort</label>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value as any)}
                        className="w-full rounded-xl border px-3 py-2 text-sm shadow-sm bg-white"
                    >
                        <option value="date_desc">Date (new → old)</option>
                        <option value="date_asc">Date (old → new)</option>
                        <option value="amount_desc">Amount (high → low)</option>
                        <option value="amount_asc">Amount (low → high)</option>
                    </select>
                </div>

                <button className="h-10 rounded-xl border px-3 text-sm hover:bg-slate-50" onClick={exportCsv}>
                    Export CSV
                </button>

                <div className="text-sm text-slate-600 md:text-right">
                    Showing <strong>{pageSlice.length}</strong> of {filtered.length}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border bg-white">
                <table className="min-w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600">
                        <tr>
                            <th className="px-4 py-3 text-left">Booking</th>
                            <th className="px-4 py-3 text-left">Customer</th>
                            <th className="px-4 py-3 text-left">Tour</th>
                            <th className="px-4 py-3 text-right">Pax</th>
                            <th className="px-4 py-3 text-right">Amount (RM)</th>
                            <th className="px-4 py-3 text-left">Status</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pageSlice.map((b) => (
                            <tr key={b.id} className="border-t">
                                <td className="px-4 py-3">
                                    <div className="font-medium">{b.id}</div>
                                    <div className="text-xs text-slate-500">{fmtDate(b.date)}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="font-medium">{b.name}</div>
                                    <div className="text-xs text-slate-500">{b.email}</div>
                                </td>
                                <td className="px-4 py-3">{b.tour}</td>
                                <td className="px-4 py-3 text-right">{b.pax}</td>
                                <td className="px-4 py-3 text-right">{b.amount.toFixed(2)}</td>
                                <td className="px-4 py-3">
                                    <span className={statusPill(b.status)}>{b.status}</span>
                                </td>
                                <td className="px-4 py-3 text-right">
                                    <div className="inline-flex gap-2">
                                        <button
                                            className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                                            onClick={() => openView(b.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="rounded-lg border px-2 py-1 text-xs hover:bg-slate-50"
                                            onClick={() => printInvoice(b)}
                                        >
                                            Invoice
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {pageSlice.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-4 py-10 text-center text-slate-500">
                                    No bookings found with the current filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between gap-3">
                <div className="text-sm text-slate-600">
                    Page {page} of {totalPages}
                </div>
                <div className="flex gap-2">
                    <button
                        className="rounded-xl border px-3 py-1.5 text-sm disabled:opacity-40"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page <= 1}
                    >
                        Prev
                    </button>
                    <button
                        className="rounded-xl border px-3 py-1.5 text-sm disabled:opacity-40"
                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {/* Demo note */}
            <div className="rounded-xl border bg-sky-50 p-4 text-sm text-sky-800">
                Demo only — edits are in-memory. Later: persist to Supabase.
            </div>

            {/* Modal */}
            <BookingModal
                open={modalOpen}
                booking={selected}
                onClose={() => setModalOpen(false)}
                onSave={saveBooking}
                onRefund={markRefunded}
                onCancelBooking={markCancelled}
                onPrint={printInvoice}
            />
        </div>
    );
}
