import express from "express";
import { z } from "zod";
import { TravelRouteAgent } from "../agent/travel-route-agent.js";
import { DemoRoutingProvider } from "../routing/providers/demo.js";

const app = express();
app.use(express.json({ limit: "64kb" }));

const planSchema = z.object({
  origin: z.string().trim().min(2).max(200),
  destination: z.string().trim().min(2).max(200),
  departureTime: z.string().datetime({ offset: true }).optional(),
  preference: z.enum(["fastest", "fewest-transfers", "accessible", "cheapest", "balanced"]).default("balanced"),
  accessibilityNeeds: z.array(z.string().max(100)).max(20).optional(),
});

const agent = new TravelRouteAgent(new DemoRoutingProvider());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.post("/v1/plan-trip", async (request, response) => {
  const parsed = planSchema.safeParse(request.body);
  if (!parsed.success) {
    response.status(400).json({ error: "Invalid trip request", issues: parsed.error.issues });
    return;
  }

  const plan = await agent.plan(parsed.data);
  response.json(plan);
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`Travel Route Agent listening on port ${port}`);
});
