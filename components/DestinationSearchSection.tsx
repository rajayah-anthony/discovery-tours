"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function DestinationSearchSection() {
    const [query, setQuery] = useState("");
    const [destination, setDestination] = useState("");
    const [type, setType] = useState("");

    const handleSearch = () => {
        // Later: connect this to Supabase or filter logic
        console.log({ query, destination, type });
    };

    return (
        <section className="py-12 bg-gradient-to-b from-slate-50 to-white">
            <div className="max-w-6xl mx-auto text-center px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-2xl sm:text-3xl font-semibold mb-4 text-slate-800"
                >
                    Where do you want to go?
                </motion.h2>

                <p className="text-slate-500 mb-8">
                    Search by destination, type of package, or keywords.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                    <input
                        type="text"
                        placeholder="Try 'Kundasang', 'Island', 'Cultural Tour'..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full sm:w-2/5 px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full sm:w-1/5 px-4 py-3 rounded-xl border border-slate-300 text-slate-600"
                    >
                        <option value="">Destination</option>
                        <option value="Kota Kinabalu">Kota Kinabalu</option>
                        <option value="Kundasang">Kundasang</option>
                        <option value="Semporna">Semporna</option>
                        <option value="Sandakan">Sandakan</option>
                    </select>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="w-full sm:w-1/5 px-4 py-3 rounded-xl border border-slate-300 text-slate-600"
                    >
                        <option value="">Type</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Nature">Nature</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Wildlife">Wildlife</option>
                    </select>

                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl transition-all"
                    >
                        <Search size={18} />
                        Search
                    </button>
                </div>
            </div>
        </section>
    );
}
