import StatCard from "../../components/admin/StatCard";

export default function AdminDashboardPage() {
    return (
        <div className="space-y-6">
            <section>
                <h1 className="text-xl font-semibold">Dashboard</h1>
                <p className="text-sm text-slate-600">
                    Quick overview of your tours, bookings, and operators.
                </p>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Active Tours" value="18" hint="+2 this week" />
                <StatCard title="Bookings (30d)" value="241" hint="↑ 12% vs prev" />
                <StatCard title="Revenue (30d)" value="RM 32,400" hint="Avg RM134 / booking" />
                <StatCard title="Operators" value="11" hint="2 pending verification" />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="font-medium">Recent Bookings</div>
                    <ul className="mt-3 space-y-2 text-sm">
                        <li className="flex justify-between">
                            <span>Klias River Cruise — 2 pax</span><span className="text-slate-500">RM360</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Kinabalu Sunrise Hike — 1 pax</span><span className="text-slate-500">RM350</span>
                        </li>
                        <li className="flex justify-between">
                            <span>Island Hopping — 4 pax</span><span className="text-slate-500">RM760</span>
                        </li>
                    </ul>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="font-medium">Tasks</div>
                    <ul className="mt-3 list-disc pl-5 text-sm space-y-1">
                        <li>Verify new operator: <span className="font-medium">Sabah Outdoor</span></li>
                        <li>Update price: <span className="font-medium">Island Hopping</span></li>
                        <li>Reply to inquiry: <span className="font-medium">Mr. Tan (4 pax)</span></li>
                    </ul>
                </div>
            </section>
        </div>
    );
}
