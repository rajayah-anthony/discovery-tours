// lib/deals.ts
export type Deal = {
    slug: string;
    title: string;
    location: string;
    type: "Adventure" | "Nature" | "Cultural" | "Island" | "City" | "Luxury";
    duration: string;
    originalPrice: number;
    salePrice: number;
    image: string;
    tags?: string[];
    source?: "MATTA" | "Seasonal" | "Partner";
    promoCode?: string;
    startsAt?: string;
    endsAt?: string;
    featured?: boolean;
    quotaLeft?: number;
    highlight?: string;

    // NEW optional long-form fields
    description?: string;
    includes?: string[];
    exclusions?: string[];
    itinerary?: string[];       // bullet list or per-day outline
    terms?: string[];           // T&Cs / notes
    meetingPoint?: string;      // where to gather / pickup range
    difficulty?: "Easy" | "Moderate" | "Challenging";
    gallery?: string[];         // extra images
};

export const deals: Deal[] = [
    // --- existing sample deals ---
    {
        slug: "kinabalu-sunrise-hike-matta",
        title: "Kinabalu Sunrise Hike (MATTA Fair Deal)",
        location: "Kundasang, Sabah",
        type: "Adventure",
        duration: "Full Day",
        originalPrice: 350,
        salePrice: 299,
        image: "/images/kinabalu.jpg",
        tags: ["Proboscis", "Sunrise", "Guide"],
        source: "MATTA",
        promoCode: "MATTA10",
        startsAt: "2025-11-01",
        endsAt: "2025-11-10",
        featured: true,
        quotaLeft: 14,
        highlight: "Guided hike + breakfast",
    },
    {
        slug: "klias-river-cruise-matta",
        title: "Klias River Cruise (Proboscis) – MATTA 20% Off",
        location: "Beaufort, Sabah",
        type: "Nature",
        duration: "Half Day (PM)",
        originalPrice: 180,
        salePrice: 144,
        image: "/images/klias-river.jpg",
        tags: ["Wildlife", "Fireflies"],
        source: "MATTA",
        promoCode: "MATTA20",
        startsAt: "2025-11-01",
        endsAt: "2025-11-12",
        featured: true,
        quotaLeft: 28,
        highlight: "Fireflies & Proboscis",
    },
    {
        slug: "mantanani-island-daytrip",
        title: "Mantanani Island Day Trip – Seasonal 15%",
        location: "Kota Belud, Sabah",
        type: "Island",
        duration: "Full Day",
        originalPrice: 420,
        salePrice: 357,
        image: "/images/mantanani.jpg",
        tags: ["Snorkel", "Island"],
        source: "Seasonal",
        promoCode: "SEA15",
        startsAt: "2025-11-05",
        endsAt: "2025-12-05",
        featured: false,
        quotaLeft: 10,
        highlight: "2 snorkel spots",
    },

    // --- NEW: 4D3N Maliau Basin (MATTA) ---
    {
        slug: "maliau-basin-4d3n-matta",
        title: "4D3N Maliau Basin – MATTA Fair Promotion",
        location: "Tawau, Sabah",
        type: "Adventure",
        duration: "4 Days 3 Nights",
        originalPrice: 2800,
        salePrice: 2380,
        image: "/images/maliau-basin.jpg",
        tags: ["Rainforest", "Hiking", "Conservation"],
        source: "MATTA",
        promoCode: "MATTA15",
        startsAt: "2025-11-01",
        endsAt: "2025-11-15",
        featured: true,
        quotaLeft: 8,
        highlight: "Explore the 'Lost World' with licensed guides",
        difficulty: "Challenging",
        description:
            "Discover the legendary Maliau Basin—an ancient, bowl-shaped rainforest often called Sabah’s ‘Lost World’. This 4D3N expedition blends jungle trekking, canopy observation, waterfalls, and conservation learning with experienced ranger-guides and proper safety protocols.",
        includes: [
            "Licensed English/Malay-speaking guide & ranger permits",
            "3 nights accommodation (hostel/lodge in Maliau Study Centre or equivalent)",
            "All park entry fees & conservation fees",
            "Meals: Day 1 lunch–Day 4 lunch",
            "4WD transfers within conservation area",
            "Basic first-aid & emergency communication support",
        ],
        exclusions: [
            "Return flights to Tawau",
            "Personal porters & personal gear (trekking poles, rain jacket, etc.)",
            "Travel insurance",
            "Alcoholic beverages & snacks not stated",
            "Tips & personal expenses",
        ],
        itinerary: [
            "Day 1: Tawau → Maliau Study Centre • Safety briefing • Short canopy/interpretive walk • Sunset briefing",
            "Day 2: Jungle trek to main waterfall area • Multi-stop observation points • Swim (weather permitting)",
            "Day 3: Long trek loop • Flora & fauna spotting • Night walk (optional, weather permitting)",
            "Day 4: Check-out • Return transfer to Tawau",
        ],
        terms: [
            "Good physical fitness required; uneven terrain & leeches expected.",
            "Weather may alter daily plan for safety reasons.",
            "Minimum 4 pax to run; otherwise surcharge or alternative dates offered.",
            "Free reschedule with ≥14 days notice; cancellation policy applies.",
        ],
        meetingPoint: "Tawau Airport / town hotels (08:00–09:00 pickup window)",
        gallery: [
            "/images/maliau-basin-1.jpg",
            "/images/maliau-basin-2.jpg",
            "/images/maliau-basin-3.jpg",
        ],
    },

    // --- NEW: 3D2N Explore Trusmadi (MATTA) ---
    {
        slug: "trusmadi-3d2n-matta",
        title: "3D2N Explore Trusmadi – MATTA Fair Promotion",
        location: "Tambunan, Sabah",
        type: "Adventure",
        duration: "3 Days 2 Nights",
        originalPrice: 1600,
        salePrice: 1350,
        image: "/images/trusmadi.jpg",
        tags: ["Hiking", "Mountain", "Eco-Tourism"],
        source: "MATTA",
        promoCode: "MATTA15",
        startsAt: "2025-11-01",
        endsAt: "2025-11-15",
        featured: true,
        quotaLeft: 12,
        highlight: "Summit Malaysia’s #2 highest peak",
        difficulty: "Moderate",
        description:
            "Mount Trusmadi offers a raw, less-crowded climb with stunning mossy forest, orchids, and classic ridge views of Mount Kinabalu on clear mornings. This guided 3D2N trek balances challenge and safety with proper acclimatisation.",
        includes: [
            "Licensed mountain guide (Sabah Parks/Forestry permits)",
            "2 nights basic lodge/camp accommodation",
            "Meals from Day 1 dinner–Day 3 lunch",
            "Entrance & climbing fees",
            "Return 4x4 transfers from Tambunan base to trailhead",
            "Headlamp on loan (limited units—first-come basis)",
        ],
        exclusions: [
            "Transport to Tambunan base (can be arranged at add-on cost)",
            "Personal climbing gear & porter services",
            "Travel insurance",
            "Any items not stated",
        ],
        itinerary: [
            "Day 1: Arrive Tambunan base • Gear check • Safety briefing • Overnight at lodge",
            "Day 2: Early 4x4 to trailhead • Ascend through mossy forest • Reach camp • Sunset tips",
            "Day 3: Pre-dawn summit push • Sunrise at peak (weather permitting) • Descend • Return to base",
        ],
        terms: [
            "Suitable for active hikers with recent trekking experience.",
            "Pace & timing subject to park authority & weather conditions.",
            "Group size: 6–14 pax for best experience.",
        ],
        meetingPoint: "Tambunan town (exact hotel/point confirmed after booking)",
        gallery: [
            "/images/trusmadi-1.jpg",
            "/images/trusmadi-2.jpg",
            "/images/trusmadi-3.jpg",
        ],
    },

    // --- NEW: 3D2N Nexus Karambunai (MATTA) ---
    {
        slug: "nexus-karambunai-3d2n-matta",
        title: "3D2N Nexus Karambunai Resort – MATTA Fair Promotion",
        location: "Kota Kinabalu, Sabah",
        type: "Luxury",
        duration: "3 Days 2 Nights",
        originalPrice: 2200,
        salePrice: 1760,
        image: "/images/nexus-karambunai.jpg",
        tags: ["Beach Resort", "Relaxation", "Couple Getaway"],
        source: "MATTA",
        promoCode: "MATTA20",
        startsAt: "2025-11-01",
        endsAt: "2025-11-20",
        featured: true,
        quotaLeft: 15,
        highlight: "Beachfront stay + breakfast for 2",
        difficulty: "Easy",
        description:
            "Unwind with a 3D2N beachfront escape at Nexus Karambunai. Enjoy sunrise walks, pool access, optional spa, and a gentle itinerary perfect for couples or families looking to slow down near Kota Kinabalu.",
        includes: [
            "2 nights resort room (twin/double)",
            "Daily breakfast for 2",
            "Welcome drink & express check-in (subject to arrival time)",
            "Complimentary access to pools & private beach",
            "Resort shuttle to KK city (fixed schedule, subject to availability)",
        ],
        exclusions: [
            "Return airport transfers (add-on available)",
            "Lunch & dinner unless specified",
            "Spa & water sports activities",
            "Tourism tax where applicable",
        ],
        itinerary: [
            "Day 1: Arrival • Check-in • Beach/pool time • Optional sunset drink",
            "Day 2: Leisure day • Optional spa/golf/watersports • Evening resort dining",
            "Day 3: Breakfast • Free time • Check-out • Optional city tour add-on",
        ],
        terms: [
            "Blackout dates may apply (public holidays/school breaks).",
            "Room type subject to availability; upgrades available at surcharge.",
            "Free reschedule with ≥7 days notice; cancellation policy applies.",
        ],
        meetingPoint: "Resort lobby (airport transfer add-on available on request)",
        gallery: [
            "/images/nexus-karambunai-1.jpg",
            "/images/nexus-karambunai-2.jpg",
            "/images/nexus-karambunai-3.jpg",
        ],
    },
];

export const getDiscountPercent = (d: Deal) =>
    Math.max(0, Math.round(((d.originalPrice - d.salePrice) / d.originalPrice) * 100));

export const isActiveDeal = (d: Deal, now = new Date()) => {
    const startOk = d.startsAt ? new Date(d.startsAt) <= now : true;
    const endOk = d.endsAt ? now <= new Date(d.endsAt) : true;
    return startOk && endOk && d.salePrice < d.originalPrice;
};

/* ========= Small helpers for cleaner imports across the app ========= */

/** Curried predicate for Array.filter: deals.filter(activeNow()) */
export const activeNow =
    (now = new Date()) =>
        (d: Deal) =>
            isActiveDeal(d, now);

/** Get a single deal by slug */
export function getDealBySlug(slug: string): Deal | undefined {
    return deals.find((d) => d.slug === slug);
}

/** Quick tag for MATTA-only lists */
export const isMattaDeal = (d: Deal) => d.source === "MATTA";

/** Use for urgency badges (e.g., within 48h) */
export function endsSoon(d: Deal, withinHours = 48, now = new Date()): boolean {
    if (!d.endsAt) return false;
    const msRemaining = new Date(d.endsAt).getTime() - now.getTime();
    return msRemaining > 0 && msRemaining <= withinHours * 60 * 60 * 1000;
}
