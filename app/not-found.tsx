// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-[60vh] grid place-items-center px-6 py-16">
            <div className="text-center max-w-xl">
                <p className="text-sm font-medium text-emerald-600">404</p>
                <h1 className="mt-2 text-3xl font-bold tracking-tight">Page not found</h1>
                <p className="mt-3 text-slate-600">
                    Sorry, we couldn’t find the page you’re looking for.
                </p>
                <div className="mt-6">
                    <Link href="/" className="inline-flex items-center rounded-lg border px-4 py-2">
                        Back to home
                    </Link>
                </div>
            </div>
        </main>
    );
}
