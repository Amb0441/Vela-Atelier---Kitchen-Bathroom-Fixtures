import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

const CATALOG_PRODUCTS = [
  { id: 1, title: "Cove Pop-Up Waste - Brushed Brass", price: "$59.90", room: "Bathroom", finish: "Brushed Brass", category: "Wastes", combo: "Brushed Brass + Pure White Quartz & Light Oak Cabinets" },
  { id: 2, title: "Cove Pop-Up Waste - Brushed Nickel", price: "$49.90", room: "Bathroom", finish: "Brushed Nickel", category: "Wastes", combo: "Brushed Nickel + Charcoal Terrazzo" },
  { id: 3, title: "Sink Basket Waste 50mm - Brushed Brass", price: "$59.90", room: "Kitchen", finish: "Brushed Brass", category: "Wastes", combo: "Brushed Brass + Dark Emerald Green Cabinetry" },
  { id: 4, title: "Arlo Double Kitchen Sink - Brushed Brass", price: "$899.00", room: "Kitchen", finish: "Brushed Brass", category: "Sinks", combo: "Brushed Brass + Pure White Quartz Countertop" },
  { id: 5, title: "Arlo Single Kitchen Sink - Matte Black", price: "$649.00", room: "Kitchen", finish: "Matte Black", category: "Sinks", combo: "Matte Black + Natural Oak Panels" },
  { id: 6, title: "Lumen Pull-Out Kitchen Mixer - Brushed Brass", price: "$459.00", room: "Kitchen", finish: "Brushed Brass", category: "Tapware", combo: "Brushed Brass + Travertine Stone Splashback" },
  { id: 7, title: "Lumen Basin Mixer - Matte Black", price: "$289.00", room: "Bathroom", finish: "Matte Black", category: "Tapware", combo: "Matte Black + Venetian Plaster Walls" },
  { id: 8, title: "Drift Outdoor Shower - Brushed Copper", price: "$1249.00", room: "Outdoor", finish: "Brushed Copper", category: "Showers", combo: "Brushed Copper + Raw Concrete & Wood Panels" },
  { id: 9, title: "Marlow Wall Mounted Basin Mixer - Brushed Copper", price: "$399.00", room: "Bathroom", finish: "Brushed Copper", category: "Tapware", combo: "Brushed Copper + Earthy Terracotta Tiles" },
  { id: 10, title: "Lumen Laundry Mixer - Matte Black", price: "$349.00", room: "Laundry", finish: "Matte Black", category: "Tapware", combo: "Matte Black + Terrazzo Floor Tiles" }
];

function supportReply(text: string): string {
  const lower = text.toLowerCase();

  if (lower.includes("ship") || lower.includes("delivery") || lower.includes("freight") || lower.includes("dispatch")) {
    return "🚚 **Vela Shipping & Delivery:**\n\n• Complimentary shipping on orders over **$1,000 AUD**.\n• In-stock pieces leave the Southport warehouse in **1–2 business days**.\n• Metro delivery is usually **2–5 days**, regional **5–8 days**.\n\nThis is a portfolio demo, so tracking numbers are not live.";
  }
  if (lower.includes("finish") || lower.includes("brass") || lower.includes("pvd") || lower.includes("nickel") || lower.includes("copper")) {
    return "✨ **Vela Finishes & Care:**\n\n• Finishes are shown as **PVD-coated** brass and stainless.\n• Clean with warm water, mild soap, and a soft cloth.\n• Skip acids, cream cleansers, and abrasive pads.";
  }
  if (lower.includes("return") || lower.includes("refund") || lower.includes("exchange")) {
    return "🔄 **Vela Returns:**\n\n• The demo policy is a **14-day window** for unopened pieces.\n• Start a return from Help Centre.\n• Nothing on this site is actually sold.";
  }
  if (lower.includes("showroom") || lower.includes("studio") || lower.includes("visit") || lower.includes("consult") || lower.includes("melbourne") || lower.includes("sydney") || lower.includes("perth") || lower.includes("southport")) {
    return "📍 **Vela Studios:**\n\n• **Southport:** 18 Harbour Lane, QLD\n• **Sydney:** 42 Studio Lane, Surry Hills, NSW\n• **Melbourne:** 9 Gallery Street, Fitzroy, VIC\n• **Perth:** 6 Workshop Road, Northbridge, WA\n\nThese addresses are fictional. Use **Book Consult** to try the appointment flow.";
  }

  return "Thank you for writing to Vela Atelier. Ask about shipping, finishes, returns, or the studios — replies on this site are scripted for the portfolio demo.";
}

function designReply(room: string, style: string, finish: string): string {
  const matched = CATALOG_PRODUCTS.filter((p) => p.room === room && p.finish === finish);
  let reply = `### ${style} ${room} in ${finish}\n\nPair the **${finish}** metal with stone or timber that has a little texture, then keep the rest of the room quiet.\n\n**From the catalogue:**\n`;

  if (matched.length > 0) {
    matched.forEach((p) => {
      reply += `• **${p.title}** (${p.price}) — ${p.combo}\n`;
    });
  } else {
    const nearby = CATALOG_PRODUCTS.filter((p) => p.room === room || p.finish === finish).slice(0, 3);
    if (nearby.length === 0) {
      reply += "• Browse the catalogue for the closest finish in this room.\n";
    } else {
      nearby.forEach((p) => {
        reply += `• **${p.title}** (${p.price}) — ${p.combo}\n`;
      });
    }
  }

  return reply;
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", mode: process.env.NODE_ENV || "development" });
});

app.post("/api/chat", (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages payload." });
  }
  const lastUserMessage = messages[messages.length - 1]?.text || "";
  return res.json({ text: supportReply(lastUserMessage) });
});

app.post("/api/assistant", (req, res) => {
  const { renovatingRoom, finderStyle, finderFinish, messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages payload." });
  }
  return res.json({
    text: designReply(renovatingRoom || "Bathroom", finderStyle || "Minimalist", finderFinish || "Brushed Brass")
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
