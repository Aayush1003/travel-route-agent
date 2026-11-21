import { describe, expect, it } from "vitest";
import { DemoRoutingProvider } from "../src/routing/providers/demo.js";
import { TravelRouteAgent } from "../src/agent/travel-route-agent.js";

describe("TravelRouteAgent", () => {
  it("creates a route with loading stages and legs", async () => {
    const agent = new TravelRouteAgent(new DemoRoutingProvider());
    const plan = await agent.plan({
      origin: "Union Station",
      destination: "Griffith Observatory",
      preference: "balanced",
    });

    expect(plan.routes).toHaveLength(1);
    expect(plan.routes[0].stages.length).toBeGreaterThan(0);
    expect(plan.routes[0].stages.flatMap((stage) => stage.legs).length).toBeGreaterThan(0);
    expect(plan.selectedRouteId).toBe(plan.routes[0].id);
  });
});
