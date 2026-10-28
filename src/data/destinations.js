export const categories = [
  "All",
  "Beach",
  "Mountain",
  "City",
  "Cultural",
  "Adventure",
];

export const destinations = [
  {
    slug: "bali-indonesia",
    name: "Bali, Indonesia",
    description:
      "Discover the Island of Gods with its stunning temples, lush rice terraces, and world-class surfing beaches. Bali offers the perfect blend of culture and relaxation.",
    shortDescription: "Tropical paradise with temples and rice terraces.",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&h=600&fit=crop",
    price: 1200,
    rating: 4.8,
    duration: "7 Days",
    highlights: [
      "Ubud Monkey Forest",
      "Tanah Lot Temple",
      "Tegallalang Rice Terraces",
      "Seminyak Beach",
    ],
  },
  {
    slug: "swiss-alps",
    name: "Swiss Alps, Switzerland",
    description:
      "Experience the majestic beauty of the Swiss Alps. From snow-capped peaks to charming villages, every moment in Switzerland feels like stepping into a postcard.",
    shortDescription: "Majestic peaks, skiing, and alpine villages.",
    category: "Mountain",
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
    price: 2500,
    rating: 4.9,
    duration: "5 Days",
    highlights: [
      "Jungfraujoch",
      "Zermatt & Matterhorn",
      "Lake Geneva",
      "Glacier Express",
    ],
  },
  {
    slug: "tokyo-japan",
    name: "Tokyo, Japan",
    description:
      "Explore the dazzling capital of Japan where ancient temples stand alongside futuristic skyscrapers. Tokyo is a city of endless discovery, incredible food, and rich tradition.",
    shortDescription: "Ancient traditions meet futuristic innovation.",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    price: 1800,
    rating: 4.7,
    duration: "6 Days",
    highlights: [
      "Shibuya Crossing",
      "Senso-ji Temple",
      "Tsukiji Fish Market",
      "Mount Fuji Day Trip",
    ],
  },
  {
    slug: "santorini-greece",
    name: "Santorini, Greece",
    description:
      "Wander through whitewashed villages perched on volcanic cliffs overlooking the deep blue Aegean Sea. Santorini is the ultimate romantic escape.",
    shortDescription: "Iconic white-and-blue island sunsets.",
    category: "Beach",
    image:
      "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop",
    price: 2000,
    rating: 4.9,
    duration: "5 Days",
    highlights: ["Oia Sunset", "Red Beach", "Akrotiri Ruins", "Wine Tasting"],
  },
  {
    slug: "machu-picchu-peru",
    name: "Machu Picchu, Peru",
    description:
      "Trek through the Andes to reach the legendary lost city of the Incas. Machu Picchu is one of the most iconic archaeological sites on the planet.",
    shortDescription: "Ancient Incan citadel high in the Andes.",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop",
    price: 1600,
    rating: 4.8,
    duration: "8 Days",
    highlights: [
      "Inca Trail Trek",
      "Sun Gate Sunrise",
      "Sacred Valley",
      "Cusco Old Town",
    ],
  },
  {
    slug: "kyoto-japan",
    name: "Kyoto, Japan",
    description:
      "Step back in time in Japan's cultural heart. Kyoto's thousands of temples, traditional tea houses, and stunning bamboo groves offer a serene escape from the modern world.",
    shortDescription: "Temples, geishas, and bamboo forests.",
    category: "Cultural",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    price: 1700,
    rating: 4.8,
    duration: "5 Days",
    highlights: [
      "Fushimi Inari Shrine",
      "Arashiyama Bamboo Grove",
      "Kinkaku-ji Temple",
      "Geisha District",
    ],
  },
  {
    slug: "patagonia-argentina",
    name: "Patagonia, Argentina",
    description:
      "Venture to the end of the world where glaciers carve through dramatic mountain landscapes. Patagonia is a paradise for hikers and nature lovers.",
    shortDescription: "Glaciers, peaks, and untouched wilderness.",
    category: "Adventure",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=600&fit=crop",
    price: 2200,
    rating: 4.7,
    duration: "10 Days",
    highlights: [
      "Perito Moreno Glacier",
      "Torres del Paine",
      "El Chaltén Hiking",
      "Tierra del Fuego",
    ],
  },
  {
    slug: "new-york-usa",
    name: "New York, USA",
    description:
      "The city that never sleeps offers world-class museums, Broadway shows, iconic landmarks, and the most diverse food scene on the planet.",
    shortDescription: "The iconic city that never sleeps.",
    category: "City",
    image:
      "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    price: 1500,
    rating: 4.6,
    duration: "4 Days",
    highlights: [
      "Statue of Liberty",
      "Central Park",
      "Times Square",
      "Brooklyn Bridge",
    ],
  },
];


export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug);
}


export function filterDestinations(category, searchQuery) {
  let filtered = destinations;

  if (category && category !== "All") {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(query) ||
        d.shortDescription.toLowerCase().includes(query) ||
        d.category.toLowerCase().includes(query)
    );
  }

  return filtered;
}
