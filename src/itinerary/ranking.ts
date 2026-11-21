import type { RouteOption, TripPreference } from "../types/models.js";

export function rankRoutes(routes: RouteOption[], preference: TripPreference): RouteOption[] {
  return routes
    .map((route) => {
      let score = 100;
      if (preference === "fastest") score -= route.totalDurationMinutes;
      if (preference === "fewest-transfers") score -= route.transferCount * 20;
      if (preference === "accessible") {
        score -= route.accessibilityUnknown ? 30 : 0;
        score -= route.totalWalkingMinutes;
      }
      if (preference === "balanced") {
        score -= route.totalDurationMinutes * 0.5;
        score -= route.transferCount * 5;
        score -= route.totalWalkingMinutes * 0.5;
      }
      return { ...route, score: Math.round(score) };
    })
    .sort((a, b) => b.score - a.score);
}

export function validateLegCount(route: RouteOption): void {
  const ids = new Set<string>();
  for (const stage of route.stages) {
    for (const leg of stage.legs) {
      if (!leg.id || ids.has(leg.id)) throw new Error("Each route leg must have a unique ID");
      ids.add(leg.id);
      if (leg.durationMinutes < 0) throw new Error("Leg duration cannot be negative");
    }
  }
}
