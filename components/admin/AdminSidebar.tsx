// components/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../lib/utils"; // optional: or replace with simple join logic

type Item = { label: string; href: string; icon?: React.ReactNode };

const items: Item[] = [
    { label: "Dashboard", href: "/admin" },
    { label: "Tours", href: "/admin/tours" },
    { label: "Bookings", href: "/admin/bookings" },
    { label: "Customers", href: "/admin/customers" },
    { label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar({ onNavigate }: { onNavigate?: () => void }) {
    const pathname = usePathname();

    return (
        <nav className="flex flex-col gap-1 p-3">
            {items.map((it) => {
                const active = pathname === it.href || pathname?.startsWith(it.href + "/");
                return (
                    <Link
                        key={it.href}
                        href={it.href}
                        onClick={onNavigate}
                        className={cn(
                            "rounded-lg px-3 py-2 text-sm transition",
                            active
                                ? "bg-blue-600 text-white"
                                : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
                        )}
                    >
                        {it.label}
                    </Link>
                );
            })}
        </nav>
    );
}

// If you don't have cn(), you can replace cn(a,b) with [a,b].filter(Boolean).join(" ")
