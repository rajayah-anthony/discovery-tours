// lib/tours.ts
import type * as GeoJSON from "geojson";

/** Regions we support across the site */
export type Region = "Sabah" | "Sarawak" | "Brunei" | "Peninsular Malaysia";

export type Tour = {
  slug: string;
  title: string;
  location: string;
  duration: string;
  price: string;
  image: string;
  gallery?: string[];
  description?: string;
  includes?: string[];
  itinerary?: string[];
  tags?: string[];
  featured?: boolean;

  /** NEW: classification for filtering and subpages */
  region?: Region;

  // Map data (optional)
  map?: {
    center?: [number, number]; // [lat,lng]
    markers?: { position: [number, number]; label?: string; href?: string }[];
    route?: Array<[number, number]>;
    routeGeoJson?: GeoJSON.FeatureCollection;
  };
};

// Helper to make a Google Maps link from coords
const gm = (lat: number, lng: number) => `https://www.google.com/maps?q=${lat},${lng}`;

/** Infer region from location if region is not explicitly set */
const inferRegion = (location: string): Region => {
  const loc = location.toLowerCase();
  if (loc.includes("sabah")) return "Sabah";
  if (loc.includes("sarawak")) return "Sarawak";
  if (loc.includes("brunei")) return "Brunei";
  return "Peninsular Malaysia";
};

export const tourData: Tour[] = [
  {
    slug: "kinabalu-sunrise-hike",
    title: "Kinabalu Sunrise Hike",
    location: "Kundasang, Sabah",
    duration: "Full Day",
    price: "RM350",
    image: "/images/kinabalu.jpg",
    gallery: ["/images/kinabalu.jpg", "/images/kk-heritage.jpg"],
    description: `
      Witness the breathtaking sunrise from the slopes of Mount Kinabalu.
      Enjoy a refreshing breakfast at base camp and explore local farms after your descent.
    `,
    includes: ["Licensed guide", "Breakfast", "Transport", "Insurance"],
    tags: ["Adventure", "Nature"],
    featured: true,
    region: "Sabah",
    map: {
      center: [6.0744, 116.5588],
      markers: [
        { position: [6.0744, 116.5588], label: "Kinabalu Park HQ", href: gm(6.0744, 116.5588) },
        { position: [6.024, 116.6114], label: "Timpohon Gate", href: gm(6.024, 116.6114) },
      ],
      route: [
        [6.024, 116.6114],
        [6.0744, 116.5588],
      ],
    },
  },
  {
    slug: "klias-river-cruise",
    title: "Klias River Cruise (Proboscis Monkey)",
    location: "Beaufort, Sabah",
    duration: "Half Day (PM)",
    price: "RM180",
    image: "/images/klias-river.jpg",
    gallery: ["/images/klias-river.jpg", "/images/island-hopping.jpg"],
    description: `
      A relaxing evening cruise along the Klias River to spot proboscis monkeys and fireflies lighting up the mangrove trees after dusk.
    `,
    includes: ["Boat cruise", "Hi-tea & dinner", "Guide", "Insurance"],
    tags: ["Wildlife", "Family"],
    featured: true,
    region: "Sabah",
    map: {
      center: [5.3178, 115.6515],
      markers: [{ position: [5.3178, 115.6515], label: "Klias Wetlands Jetty", href: gm(5.3178, 115.6515) }],
    },
  },
  {
    slug: "kk-city-heritage-walk",
    title: "Kota Kinabalu City Heritage Walk",
    location: "Kota Kinabalu",
    duration: "3 Hours",
    price: "RM99",
    image: "/images/kk-heritage.jpg",
    gallery: ["/images/kk-heritage.jpg"],
    description: `
      Stroll through KK’s historic waterfront and landmarks while learning local stories and culture from our licensed guide.
    `,
    includes: ["Licensed guide", "Bottle water"],
    tags: ["Culture", "Easy"],
    featured: true,
    region: "Sabah",
    map: {
      center: [5.9804, 116.0735],
      markers: [
        { position: [5.9817, 116.0762], label: "Atkinson Clock Tower", href: gm(5.9817, 116.0762) },
        { position: [5.9863, 116.0785], label: "Gaya Street", href: gm(5.9863, 116.0785) },
        { position: [5.9781, 116.0715], label: "KK Waterfront", href: gm(5.9781, 116.0715) },
      ],
      route: [
        [5.9863, 116.0785],
        [5.9817, 116.0762],
        [5.9781, 116.0715],
      ],
    },
  },

  // 🆕 4D3N KK–Kundasang MATTA Fair Promo
  {
    slug: "4d3n-kk-kundasang-matta-fair",
    title: "4D3N Kota Kinabalu–Kundasang MATTA Fair Promotion",
    location: "Kota Kinabalu & Kundasang, Sabah",
    duration: "4 Days 3 Nights",
    price: "From RM998 / pax",
    image: "/images/matta-fair.jpg",
    featured: true,
    region: "Sabah",
    gallery: [
      "/images/matta-fair.jpg",
      "/images/kinabalu.jpg",
      "/images/kundasang-farm.jpg",
      "/images/poring-hot-spring.jpg",
    ],
    description: `
      Experience the best of Kota Kinabalu and Kundasang in this 4-day adventure.
      Visit scenic highlands, farms, and natural attractions, with comfortable stays and daily meals included.
      Perfect for families, couples, and groups who want a hassle-free holiday in Sabah.
    `,
    itinerary: [
      "Day 1 – Arrival KK / City Tour: Airport pick-up, visit Signal Hill, Atkinson Clock Tower, Filipino Market, and enjoy a seafood dinner. Overnight in Kota Kinabalu.",
      "Day 2 – KK → Kundasang: Visit Nabalu Market, Kinabalu Park HQ, Poring Hot Spring, Desa Dairy Farm, and Kundasang War Memorial. Overnight in Kundasang.",
      "Day 3 – Kundasang → KK: Enjoy local farm experiences, rabbit park visit, and scenic views of Mount Kinabalu before heading back to Kota Kinabalu.",
      "Day 4 – Departure: Free & easy until transfer to airport for departure flight.",
    ],
    includes: [
      "3 nights hotel accommodation (twin/triple sharing)",
      "Daily breakfast & selected meals",
      "Return airport transfer",
      "Tour with licensed guide",
      "Entrance fees & permits",
      "Travel insurance",
    ],
    tags: ["Package", "Family", "Nature", "Promotion"],
    map: {
      center: [5.9804, 116.0735],
      markers: [
        { position: [5.9804, 116.0735], label: "Kota Kinabalu City", href: gm(5.9804, 116.0735) },
        { position: [6.0744, 116.5588], label: "Kinabalu Park HQ", href: gm(6.0744, 116.5588) },
        { position: [6.0503, 116.7186], label: "Poring Hot Spring", href: gm(6.0503, 116.7186) },
        { position: [6.0205, 116.6065], label: "Desa Dairy Farm", href: gm(6.0205, 116.6065) },
      ],
      route: [
        [5.9804, 116.0735],
        [6.0744, 116.5588],
        [6.0503, 116.7186],
        [6.0205, 116.6065],
      ],
    },
  },

  // 🆕 Borneo packages (Matta Fair)
  {
    slug: "maliau-basin-4d3n-matta",
    title: "4D3N Maliau Basin (Matta Fair)",
    location: "Maliau Basin, Sabah",
    duration: "4 Days 3 Nights",
    price: "On request",
    image: "/images/maliau.jpg",
    description: "Deep rainforest expedition in Sabah’s ‘Lost World’.",
    tags: ["Jungle Trek", "Borneo"],
    region: "Sabah",
  },
  {
    slug: "trusmadi-3d2n-matta",
    title: "3D2N Explore Trusmadi (Matta Fair)",
    location: "Trusmadi, Sabah",
    duration: "3 Days 2 Nights",
    price: "On request",
    image: "/images/trusmadi.jpg",
    description: "Climb Malaysia’s second-highest peak.",
    tags: ["Hike", "Summit", "Borneo"],
    region: "Sabah",
  },
  {
    slug: "nexus-karambunai-3d2n-matta",
    title: "3D2N Nexus Karambunai (Matta Fair)",
    location: "Kota Kinabalu, Sabah",
    duration: "3 Days 2 Nights",
    price: "On request",
    image: "/images/karambunai.jpg",
    description: "Resort leisure stay with beach and spa indulgence.",
    tags: ["Resort", "Leisure", "Borneo"],
    region: "Sabah",
  },
];

/** Convenience helpers */
export const getToursByRegion = (region: Region) =>
  tourData.filter(
    (t) => (t.region ?? inferRegion(t.location)) === region
  );

export const getBorneoTours = () =>
  tourData.filter((t) => {
    const r = t.region ?? inferRegion(t.location);
    return r === "Sabah" || r === "Sarawak" || r === "Brunei";
  });

