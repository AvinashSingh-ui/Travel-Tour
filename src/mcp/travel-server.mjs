#!/usr/bin/env node

/**
 * MCP Travel Server
 *
 * A Model Context Protocol server that exposes travel destination
 * data and search capabilities as tools for AI agents.
 */

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// ── Inline destination data (mirrors src/data/destinations.js) ──────────────

const categories = ["All", "Beach", "Mountain", "City", "Cultural", "Adventure"];

const destinations = [
  {
    slug: "bali-indonesia",
    name: "Bali, Indonesia",
    description:
      "Discover the Island of Gods with its stunning temples, lush rice terraces, and world-class surfing beaches. Bali offers the perfect blend of culture and relaxation.",
    shortDescription: "Tropical paradise with temples and rice terraces.",
    category: "Beach",
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

// ── Helper functions ────────────────────────────────────────────────────────

function searchDestinations(query, category) {
  let filtered = destinations;

  if (category && category !== "All") {
    filtered = filtered.filter((d) => d.category === category);
  }

  if (query) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.shortDescription.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q)
    );
  }

  return filtered;
}

function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug) || null;
}

function getRecommendations({ maxBudget, minRating, category, maxDuration }) {
  let results = destinations;

  if (maxBudget) {
    results = results.filter((d) => d.price <= maxBudget);
  }
  if (minRating) {
    results = results.filter((d) => d.rating >= minRating);
  }
  if (category && category !== "All") {
    results = results.filter((d) => d.category === category);
  }
  if (maxDuration) {
    results = results.filter(
      (d) => parseInt(d.duration) <= maxDuration
    );
  }

  return results.sort((a, b) => b.rating - a.rating);
}

function comparePrices(slugs) {
  const found = slugs
    .map((s) => getDestinationBySlug(s))
    .filter(Boolean);
  return found
    .sort((a, b) => a.price - b.price)
    .map((d) => ({
      name: d.name,
      price: d.price,
      duration: d.duration,
      rating: d.rating,
      pricePerDay: Math.round(d.price / parseInt(d.duration)),
    }));
}

// ── MCP Server Setup ────────────────────────────────────────────────────────

const server = new McpServer({
  name: "travel-tour-mcp",
  version: "1.0.0",
  description:
    "MCP server for Travel Tour — provides destination search, details, recommendations, and comparisons.",
});

// Tool: Search Destinations
server.tool(
  "search_destinations",
  "Search and filter travel destinations by name, keyword, or category. Returns matching destinations with key details.",
  {
    query: z
      .string()
      .optional()
      .describe("Search query to match against destination names and descriptions"),
    category: z
      .enum(["All", "Beach", "Mountain", "City", "Cultural", "Adventure"])
      .optional()
      .describe("Filter by destination category"),
  },
  async ({ query, category }) => {
    const results = searchDestinations(query, category);
    if (results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No destinations found matching your criteria.",
          },
        ],
      };
    }
    const summary = results.map(
      (d) =>
        `• **${d.name}** (${d.category}) — $${d.price} for ${d.duration}, ⭐ ${d.rating}\n  ${d.shortDescription}`
    );
    return {
      content: [
        {
          type: "text",
          text: `Found ${results.length} destination(s):\n\n${summary.join("\n\n")}`,
        },
      ],
    };
  }
);

// Tool: Get Destination Details
server.tool(
  "get_destination_details",
  "Get full details about a specific travel destination by its slug identifier.",
  {
    slug: z
      .string()
      .describe(
        "The destination slug (e.g., 'bali-indonesia', 'tokyo-japan')"
      ),
  },
  async ({ slug }) => {
    const d = getDestinationBySlug(slug);
    if (!d) {
      return {
        content: [
          {
            type: "text",
            text: `Destination with slug "${slug}" not found. Use search_destinations to find available destinations.`,
          },
        ],
      };
    }
    return {
      content: [
        {
          type: "text",
          text: [
            `# ${d.name}`,
            `**Category:** ${d.category}`,
            `**Price:** $${d.price} per person`,
            `**Duration:** ${d.duration}`,
            `**Rating:** ⭐ ${d.rating}/5`,
            ``,
            `## Description`,
            d.description,
            ``,
            `## Trip Highlights`,
            ...d.highlights.map((h) => `- ${h}`),
            ``,
            `🔗 View page: /destinations/${d.slug}`,
          ].join("\n"),
        },
      ],
    };
  }
);

// Tool: List Categories
server.tool(
  "list_categories",
  "List all available destination categories.",
  {},
  async () => {
    const categoryCounts = {};
    for (const cat of categories.filter((c) => c !== "All")) {
      categoryCounts[cat] = destinations.filter(
        (d) => d.category === cat
      ).length;
    }
    const lines = Object.entries(categoryCounts).map(
      ([cat, count]) => `• ${cat}: ${count} destination(s)`
    );
    return {
      content: [
        {
          type: "text",
          text: `Available categories:\n\n${lines.join("\n")}\n\nTotal: ${destinations.length} destinations`,
        },
      ],
    };
  }
);

// Tool: Get Recommendations
server.tool(
  "get_recommendations",
  "Get personalized destination recommendations based on budget, rating, category, and trip duration preferences.",
  {
    maxBudget: z
      .number()
      .optional()
      .describe("Maximum budget per person in USD"),
    minRating: z
      .number()
      .optional()
      .describe("Minimum rating (out of 5)"),
    category: z
      .enum(["All", "Beach", "Mountain", "City", "Cultural", "Adventure"])
      .optional()
      .describe("Preferred category"),
    maxDuration: z
      .number()
      .optional()
      .describe("Maximum trip duration in days"),
  },
  async ({ maxBudget, minRating, category, maxDuration }) => {
    const results = getRecommendations({
      maxBudget,
      minRating,
      category,
      maxDuration,
    });
    if (results.length === 0) {
      return {
        content: [
          {
            type: "text",
            text: "No destinations match your preferences. Try relaxing your filters.",
          },
        ],
      };
    }
    const lines = results.map(
      (d) =>
        `• **${d.name}** — $${d.price}, ${d.duration}, ⭐ ${d.rating}\n  ${d.shortDescription}`
    );
    return {
      content: [
        {
          type: "text",
          text: `Recommended destinations (${results.length}):\n\n${lines.join("\n\n")}`,
        },
      ],
    };
  }
);

// Tool: Compare Destinations
server.tool(
  "compare_destinations",
  "Compare prices and value of multiple destinations side by side.",
  {
    slugs: z
      .array(z.string())
      .min(2)
      .max(4)
      .describe(
        "Array of destination slugs to compare (2-4 slugs)"
      ),
  },
  async ({ slugs }) => {
    const comparison = comparePrices(slugs);
    if (comparison.length < 2) {
      return {
        content: [
          {
            type: "text",
            text: "Need at least 2 valid destinations to compare. Check the slugs and try again.",
          },
        ],
      };
    }
    const table = comparison.map(
      (d) =>
        `| ${d.name} | $${d.price} | ${d.duration} | ⭐ ${d.rating} | $${d.pricePerDay}/day |`
    );
    return {
      content: [
        {
          type: "text",
          text: [
            `## Destination Comparison`,
            ``,
            `| Destination | Price | Duration | Rating | Value |`,
            `|------------|-------|----------|--------|-------|`,
            ...table,
          ].join("\n"),
        },
      ],
    };
  }
);

// ── Start the server ────────────────────────────────────────────────────────

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Travel Tour MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});

