"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const [allowed, setAllowed] = useState<boolean | null>(null);

    useEffect(() => {
        // Simple demo guard (replace with Supabase/NextAuth later)
        const ok = typeof window !== "undefined" && localStorage.getItem("admin_demo_auth") === "true";
        setAllowed(ok);
    }, []);

    if (allowed === null) {
        return (
            <div className="min-h-[60vh] grid place-items-center">
                <div className="text-slate-500 text-sm">Checking access…</div>
            </div>
        );
    }

    if (!allowed) {
        return (
            <div className="min-h-[70vh] grid place-items-center px-6">
                <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold">Access Restricted</h2>
                    <p className="mt-2 text-sm text-slate-600">
                        This page is for admins only. Please use{" "}
                        <span className="font-medium">Admin Login</span> in the navbar
                        (demo: <code>admin@demo.com</code> / <code>demo123</code>), then try again.
                    </p>
                    <Link
                        href="/"
                        className="mt-4 inline-flex items-center rounded-xl border border-sky-600 px-4 py-2 text-sm hover:bg-sky-50"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
