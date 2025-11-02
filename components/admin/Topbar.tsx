"use client";

type Props = {
    onMenuClick?: () => void;
};

export default function Topbar({ onMenuClick }: Props) {
    const signOut = () => {
        localStorage.removeItem("admin_demo_auth");
        window.location.href = "/";
    };

    return (
        <div className="h-14 border-b border-slate-200 bg-white/80 backdrop-blur flex items-center justify-between px-4 sticky top-0 z-30">
            <div className="flex items-center gap-3">
                {/* Hamburger button - only visible on mobile */}
                {/* Minimal clean hamburger */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden flex flex-col justify-center items-center w-9 h-9 rounded-lg hover:bg-slate-100 active:bg-slate-200 transition"
                    aria-label="Open menu"
                >
                    <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-200"></span>
                    <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 mt-1.5"></span>
                    <span className="block w-5 h-0.5 bg-slate-700 dark:bg-slate-200 mt-1.5"></span>
                </button>


                <div className="font-medium">Admin Panel</div>
            </div>

            <button
                onClick={signOut}
                className="rounded-xl border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50"
            >
                Sign out
            </button>
        </div>
    );
}
