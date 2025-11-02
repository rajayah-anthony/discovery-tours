"use client";

import { useState, useEffect } from "react";
import AdminGuard from "../../components/admin/AdminGuard";
import AdminSidebar from "../../components/admin/AdminSidebar";
import Topbar from "../../components/admin/Topbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);

    // Prevent background scroll when drawer open
    useEffect(() => {
        document.body.style.overflow = mobileOpen ? "hidden" : "";
    }, [mobileOpen]);

    return (
        <AdminGuard>
            <div className="min-h-[100vh] flex bg-slate-50">
                {/* Desktop sidebar */}
                <aside className="hidden md:block">
                    <AdminSidebar />
                </aside>

                {/* Mobile drawer */}
                <div
                    className={`fixed inset-0 z-40 md:hidden transition-all ${mobileOpen ? "visible" : "invisible"
                        }`}
                >
                    {/* Background overlay */}
                    <div
                        className={`absolute inset-0 bg-black/40 transition-opacity ${mobileOpen ? "opacity-100" : "opacity-0"
                            }`}
                        onClick={() => setMobileOpen(false)}
                    ></div>

                    {/* Drawer itself */}
                    <div
                        className={`absolute left-0 top-0 h-full w-64 bg-white dark:bg-slate-900 shadow-xl transform transition-transform duration-200 ${mobileOpen ? "translate-x-0" : "-translate-x-full"
                            }`}
                    >
                        <div className="flex items-center justify-between border-b px-3 py-3">
                            <span className="font-semibold text-sm">Menu</span>
                            <button
                                type="button"
                                onClick={() => setMobileOpen(false)}
                                className="rounded-md border px-2 py-1 text-sm"
                            >
                                ✕
                            </button>
                        </div>
                        <AdminSidebar onNavigate={() => setMobileOpen(false)} />
                    </div>
                </div>

                {/* Main section */}
                <div className="flex-1 flex flex-col">
                    {/* Pass toggle handler to Topbar */}
                    <Topbar onMenuClick={() => setMobileOpen(true)} />
                    <main className="p-4 md:p-6 flex-1">{children}</main>
                </div>
            </div>
        </AdminGuard>
    );
}
