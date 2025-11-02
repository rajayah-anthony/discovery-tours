// lib/destinations.ts
export type Destination = {
    slug: string;
    name: string;
    tagline: string;
    summary: string;
    hero: string;            // /public path
    gallery?: string[];
    quickFacts?: { label: string; value: string }[];
    highlights?: string[];
    map?: { lat: number; lng: number; zoom?: number };
};

export const DESTINATIONS: Destination[] = [
    {
        slug: "kota-kinabalu",
        name: "Kota Kinabalu",
        tagline: "City vibes, island escapes, and sunset magic",
        summary:
            "Sabah’s capital blends waterfront sunsets, street food, island hopping to Tunku Abdul Rahman Marine Park, and easy access to Kinabalu National Park.",
        hero: "/images/destinations/kk-hero.jpg",
        gallery: [
            "/images/destinations/kk-1.jpg",
            "/images/destinations/kk-2.jpg",
            "/images/destinations/kk-3.jpg",
        ],
        quickFacts: [
            { label: "Best for", value: "Island hopping, food, family trips" },
            { label: "Season", value: "All year (Mar–Oct driest)" },
            { label: "Airport", value: "BKI (15 min to city)" },
        ],
        highlights: [
            "Island hop: Manukan, Mamutik, Sapi",
            "KK sunset at Tanjung Aru Beach",
            "Gaya Street Sunday Market",
            "Day trip to Kinabalu Park",
        ],
        map: { lat: 5.9804, lng: 116.0735, zoom: 11 },
    },
    {
        slug: "kundasang",
        name: "Kundasang",
        tagline: "Highland chill with Mt. Kinabalu views",
        summary:
            "Rolling farms, cool air and sweeping views beneath Southeast Asia’s tallest mountain. Perfect for sunrise missions and flower farms.",
        hero: "/images/destinations/kundasang-hero.jpg",
        gallery: [
            "/images/destinations/kundasang-1.jpg",
            "/images/destinations/kundasang-2.jpg",
            "/images/destinations/kundasang-3.jpg",
        ],
        quickFacts: [
            { label: "Altitude", value: "≈ 1,900 m" },
            { label: "Drive", value: "2h 15m from KK" },
            { label: "Vibe", value: "Farms, sunrise, crisp air" },
        ],
        highlights: [
            "Kinabalu Park & Botanical Garden",
            "Desa Dairy Farm",
            "Cabbage & strawberry farms",
            "Sunrise photo spots",
        ],
        map: { lat: 6.0240, lng: 116.6050, zoom: 11 },
    },
    {
        slug: "sandakan",
        name: "Sandakan",
        tagline: "Wildlife gateway of Borneo’s east coast",
        summary:
            "Your launchpad to Sepilok Orangutan, Bornean Sun Bear Centre, and Kinabatangan River cruises packed with proboscis monkeys and hornbills.",
        hero: "/images/destinations/sandakan-hero.jpg",
        gallery: [
            "/images/destinations/sandakan-1.jpg",
            "/images/destinations/sandakan-2.jpg",
            "/images/destinations/sandakan-3.jpg",
        ],
        quickFacts: [
            { label: "Best for", value: "Wildlife & river cruises" },
            { label: "Airport", value: "SDK (20 min to town)" },
            { label: "Stay", value: "2–3 nights" },
        ],
        highlights: [
            "Sepilok Orangutan Rehabilitation",
            "Bornean Sun Bear Conservation Centre",
            "Rainforest Discovery Centre",
            "Kinabatangan River wildlife cruise",
        ],
        map: { lat: 5.8394, lng: 118.1170, zoom: 11 },
    },
    {
        slug: "semporna",
        name: "Semporna",
        tagline: "Turquoise seas & world-class diving",
        summary:
            "A mosaic of islands with glassy water—gateway to Sipadan, Mabul, and Kapalai. Snorkel, dive and laze on sandbars.",
        hero: "/images/destinations/semporna-hero.jpg",
        gallery: [
            "/images/destinations/semporna-1.jpg",
            "/images/destinations/semporna-2.jpg",
            "/images/destinations/semporna-3.jpg",
        ],
        quickFacts: [
            { label: "Star", value: "Sipadan (advanced diving)" },
            { label: "Snorkel", value: "Mabul, Kapalai, Mataking" },
            { label: "Best time", value: "Apr–Oct" },
        ],
        highlights: [
            "Dive Sipadan (permits limited)",
            "Mabul village & macro life",
            "Sandbar picnics",
            "Island-hopping day trips",
        ],
        map: { lat: 4.4811, lng: 118.6112, zoom: 12 },
    },
];

export function getDestination(slug: string) {
    return DESTINATIONS.find((d) => d.slug === slug);
}
