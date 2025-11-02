// app/destinations/[slug]/loading.tsx
export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl px-6 py-14">
            <div className="animate-pulse space-y-4">
                <div className="h-72 rounded-2xl bg-gray-200" />
                <div className="h-6 w-1/3 bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                <div className="grid grid-cols-2 gap-3">
                    <div className="h-32 bg-gray-200 rounded-xl" />
                    <div className="h-32 bg-gray-200 rounded-xl" />
                </div>
            </div>
        </div>
    );
}
