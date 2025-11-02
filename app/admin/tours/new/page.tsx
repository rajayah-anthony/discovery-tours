"use client";

export default function NewTourPage() {
    return (
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-2xl">
                <h1 className="text-3xl font-bold mb-6 text-center">Add New Tour</h1>

                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tour Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Kinabalu Sunrise Hike"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Location</label>
                        <input
                            type="text"
                            placeholder="Kundasang, Sabah"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Price (RM)</label>
                        <input
                            type="number"
                            placeholder="350"
                            className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                    >
                        Save Tour
                    </button>
                </form>
            </div>
        </main>
    );
}
