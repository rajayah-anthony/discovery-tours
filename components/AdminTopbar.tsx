// components/AdminTopbar.tsx
"use client";

type Props = { onMenuClick: () => void; title?: string };

export default function AdminTopbar({ onMenuClick, title = "Admin" }: Props) {
    return (
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-white/80 px-4 py-3 backdrop-blur md:px-6 dark:bg-slate-900/80">
            {/* Hamburger for mobile only */}
            <button
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border md:hidden"
                onClick={onMenuClick}
                aria-label="Open menu"
                aria-controls="mobile-admin-drawer"
                aria-expanded="false"
            >
                {/* Simple hamburger icon */}
                <span className="block h-0.5 w-5 bg-current"></span>
                <span className="mt-1 block h-0.5 w-5 bg-current"></span>
                <span className="mt-1 block h-0.5 w-5 bg-current"></span>
            </button>

            <h1 className="text-lg font-semibold">{title}</h1>
            <div className="ml-auto">{/* right-side actions if any */}</div>
        </header>
    );
}
