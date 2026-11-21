import type { RouteOption, TripPlan, TripRequest } from "../types/models.js";
import { rankRoutes, validateLegCount } from "../itinerary/ranking.js";
import type { RoutingProvider } from "../routing/providers/demo.js";

export class TravelRouteAgent {
  constructor(private readonly provider: RoutingProvider) {}

  async plan(request: TripRequest): Promise<TripPlan> {
    const rawRoutes = await this.provider.plan(request);
    for (const route of rawRoutes) validateLegCount(route);

    const routes = rankRoutes(rawRoutes, request.preference);
    const selected = routes[0] ?? null;

    const assumptions = [
      "Route details are placeholders until a live routing provider is configured.",
      "Location coordinates are not stored by this demo.",
      "Accessibility fields have not been verified.",
    ];

    const summary = selected
      ? `The leading option is ${selected.summary}, with an estimated duration of ${selected.totalDurationMinutes} minutes and ${selected.transferCount} transfer(s). Please verify live schedules and access before traveling.`
      : "No route could be found.";

    return {
      request,
      routes,
      selectedRouteId: selected?.id ?? null,
      assumptions,
      summary,
    };
  }
}
