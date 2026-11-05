import {
  destinations,
  categories,
  getDestinationBySlug,
  filterDestinations,
} from "@/data/destinations";

const SYSTEM_PROMPT = `You are **TravelBot**, the friendly AI travel assistant for Travel Tour.

Your job is to help users discover destinations, plan trips, compare options, and answer travel-related questions using the available tools.

## Guidelines
- Always use your tools to look up real destination data from the catalog.
- Proactively suggest destinations based on budget, interests, and duration.
- Format prices in USD. Keep responses concise and engaging.
- When recommending, explain WHY a destination suits the user.
- Link to destination pages using the format: /destinations/{slug}
- Be warm, enthusiastic, and use occasional travel-themed emoji (🌍 ✈️ 🏖️ ⛰️ 🏙️ 🎭 🧗).

## Available Categories
Beach, Mountain, City, Cultural, Adventure
`;

// ── Smart local engine (instant, zero-latency, full catalog search) ──────────

function handleLocalQuery(userQuery) {
  const q = userQuery.toLowerCase().trim();

  // Check for specific destination details first
  for (const d of destinations) {
    const slugMatch = d.slug.replace(/-/g, " ");
    const nameMatch = d.name.toLowerCase();
    const cityMatch = d.name.split(",")[0].toLowerCase();

    if (q.includes(cityMatch) || q.includes(slugMatch) || q.includes(nameMatch)) {
      // Check if user is asking to compare
      if (q.includes("compare")) break; // let compare handler take care of it

      return [
        `🌍 **[${d.name}](/destinations/${d.slug})** (${d.category})`,
        `⭐ **Rating:** ${d.rating}/5 | ⏱️ **Duration:** ${d.duration} | 💵 **Price:** $${d.price} per person`,
        ``,
        `> ${d.description}`,
        ``,
        `✨ **Trip Highlights:**`,
        ...d.highlights.map((h) => `• ${h}`),
        ``,
        `👉 [Click here to view full details and book /destinations/${d.slug}](/destinations/${d.slug})`,
      ].join("\n");
    }
  }

  // Compare query
  if (q.includes("compare")) {
    const matched = destinations.filter((d) =>
      q.includes(d.name.split(",")[0].toLowerCase())
    );
    const toCompare = matched.length >= 2 ? matched : destinations.slice(0, 4);

    const rows = toCompare.map(
      (d) =>
        `| [${d.name}](/destinations/${d.slug}) | $${d.price} | ${d.duration} | ⭐ ${d.rating} | $${Math.round(d.price / parseInt(d.duration))}/day |`
    );

    return [
      `## ⚖️ Destination Comparison`,
      ``,
      `| Destination | Total Price | Duration | Rating | Daily Avg |`,
      `|---|---|---|---|---|`,
      ...rows,
      ``,
      `*Need more details on any of these? Just ask!*`,
    ].join("\n");
  }

  // Categories
  if (q.includes("beach")) {
    return formatList("🏖️ **Beach Getaways:**", filterDestinations("Beach"));
  }
  if (q.includes("mountain") || q.includes("snow") || q.includes("alps")) {
    return formatList("⛰️ **Mountain Escapes:**", filterDestinations("Mountain"));
  }
  if (q.includes("city") || q.includes("urban")) {
    return formatList("🏙️ **Vibrant City Tours:**", filterDestinations("City"));
  }
  if (q.includes("adventure") || q.includes("hike") || q.includes("trek")) {
    return formatList("🧗 **Adventure & Wilderness Trips:**", filterDestinations("Adventure"));
  }
  if (q.includes("cultural") || q.includes("culture") || q.includes("temple")) {
    return formatList("🎭 **Cultural & Heritage Journeys:**", filterDestinations("Cultural"));
  }

  // Cheapest / Best Value
  if (q.includes("cheap") || q.includes("lowest") || q.includes("affordable")) {
    const sorted = [...destinations].sort((a, b) => a.price - b.price);
    return formatList("🏷️ **Most Affordable Destinations:**", sorted.slice(0, 3));
  }

  // Duration search (e.g., "5 days")
  const durationMatch = q.match(/(\d+)\s*days?/);
  if (durationMatch) {
    const days = parseInt(durationMatch[1], 10);
    const matched = destinations.filter((d) => parseInt(d.duration) === days);
    if (matched.length > 0) {
      return formatList(`⏱️ **${days}-Day Trips Available:**`, matched);
    }
  }

  // Budget search: e.g. "under $1500" or "$2000"
  const priceMatch = q.match(/\$?(\d{3,5})/);
  if (q.includes("under") || q.includes("budget") || priceMatch) {
    const maxBudget = priceMatch ? parseInt(priceMatch[1], 10) : 1800;
    const matches = destinations
      .filter((d) => d.price <= maxBudget)
      .sort((a, b) => a.price - b.price);

    if (matches.length > 0) {
      return formatList(`💰 **Destinations within your $${maxBudget} budget:**`, matches);
    }
  }

  // Top-rated / popular
  if (q.includes("top") || q.includes("best") || q.includes("rating")) {
    const top = [...destinations].sort((a, b) => b.rating - a.rating).slice(0, 4);
    return formatList("⭐ **Top-Rated Destinations:**", top);
  }

  // Search keyword match
  const found = destinations.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q) ||
      d.category.toLowerCase().includes(q) ||
      d.highlights.some((h) => h.toLowerCase().includes(q))
  );
  if (found.length > 0) return formatList(`✈️ **Matching destinations:**`, found);

  // Default welcome
  return (
    `🌍 **Welcome to Travel Tour!** I can help you plan and explore:\n\n` +
    `• 🏖️ *"Show me beach destinations"*\n` +
    `• 💰 *"Trips under $1500"*\n` +
    `• ⛰️ *"Tell me about the Swiss Alps"*\n` +
    `• ⚖️ *"Compare Tokyo and Kyoto"*\n` +
    `• ⭐ *"What are your top-rated trips?"*\n\n` +
    `What type of vacation are you dreaming of?`
  );
}

function formatList(title, list) {
  return [
    title,
    ...list.map(
      (d) =>
        `• **[${d.name}](/destinations/${d.slug})** (${d.category}) — **$${d.price}** for ${d.duration}, ⭐ ${d.rating}\n  ${d.shortDescription}`
    ),
  ].join("\n\n");
}

// ── Route handler ───────────────────────────────────────────────────────────

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const lastUserMessage = [...messages].reverse().find((m) => m.role === "user");
    const userPrompt = lastUserMessage?.content || "";

    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // Try Gemini AI with tool-calling
    if (apiKey && apiKey !== "your_api_key_here") {
      try {
        const { google } = await import("@ai-sdk/google");
        const ai = await import("ai");
        const { z } = await import("zod");

        const tools = {
          searchDestinations: ai.tool({
            description: "Search travel destinations by query or category",
            parameters: z.object({
              query: z.string().optional().describe("Search keyword"),
              category: z.string().optional().describe("Category filter"),
            }),
            execute: async ({ query, category }) => {
              return filterDestinations(category, query);
            },
          }),
          getDestinationDetails: ai.tool({
            description: "Get details for a specific destination by slug",
            parameters: z.object({
              slug: z.string().describe("Destination slug"),
            }),
            execute: async ({ slug }) => {
              return getDestinationBySlug(slug) || { error: "Not found" };
            },
          }),
          listCategories: ai.tool({
            description: "List all travel categories with destination counts",
            parameters: z.object({}),
            execute: async () => {
              return categories.filter((c) => c !== "All").map((c) => ({
                name: c,
                count: destinations.filter((d) => d.category === c).length,
              }));
            },
          }),
        };

        // Modern Gemini 3.8 models. maxRetries: 0 so we don't hang if Google is at peak capacity
        const candidateModels = ["gemini-3.8-flash", "gemini-3.8-pro"];
        let lastError = null;

        for (const modelName of candidateModels) {
          try {
            const result = await ai.generateText({
              model: google(modelName),
              system: SYSTEM_PROMPT,
              messages,
              tools,
              maxSteps: 3,
              maxRetries: 0,
            });

            if (result?.text) {
              return Response.json({ reply: result.text });
            }
          } catch (modelErr) {
            lastError = modelErr;
            // Spikes on flash are common, proceed to pro or instant fallback
          }
        }

        if (lastError) {
          console.warn("AI endpoint high demand, falling back immediately:", lastError?.message);
        }
      } catch (geminiError) {
        console.warn("AI generation setup error:", geminiError?.message);
      }
    }

    // Fast fallback: instant local catalog response (< 10ms)
    const reply = handleLocalQuery(userPrompt);
    return Response.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ error: "Failed to process chat message." }, { status: 500 });
  }
}
