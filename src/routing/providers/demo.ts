import type { Leg, Location, RouteOption, TripRequest } from "../types/models.js";

export interface RoutingProvider {
  name: string;
  plan(request: TripRequest): Promise<RouteOption[]>;
}

export class DemoRoutingProvider implements RoutingProvider {
  name = "deterministic-demo";

  async plan(request: TripRequest): Promise<RouteOption[]> {
    const origin: Location = { name: request.origin };
    const destination: Location = { name: request.destination };

    const walkToTransit: Leg = {
      id: "leg-1",
      sequence: 1,
      mode: "walk",
      origin,
      destination: { name: "Nearest transit stop" },
      durationMinutes: 8,
      distanceMeters: 650,
      instructions: "Walk to the nearest available transit stop.",
      accessibility: { stepFree: null, lowFloor: null, assistanceAvailable: null },
      sourceStatus: "estimated",
    };

    const transit: Leg = {
      id: "leg-2",
      sequence: 2,
      mode: "transit",
      origin: walkToTransit.destination,
      destination: { name: "Destination area" },
      durationMinutes: 22,
      lineName: "Provider data required",
      instructions: "Board a transit service toward the destination area.",
      accessibility: { stepFree: null, lowFloor: null, assistanceAvailable: null },
      sourceStatus: "estimated",
    };

    const walkToDestination: Leg = {
      id: "leg-3",
      sequence: 3,
      mode: "walk",
      origin: transit.destination,
      destination,
      durationMinutes: 6,
      distanceMeters: 480,
      instructions: "Follow local pedestrian directions to the destination.",
      accessibility: { stepFree: null, lowFloor: null, assistanceAvailable: null },
      sourceStatus: "estimated",
    };

    return [{
      id: "route-demo-1",
      summary: `Travel from ${request.origin} to ${request.destination}`,
      stages: [
        { id: "stage-1", sequence: 1, title: "Leave origin", legs: [walkToTransit] },
        { id: "stage-2", sequence: 2, title: "Travel", legs: [transit] },
        { id: "stage-3", sequence: 3, title: "Arrive", legs: [walkToDestination] },
      ],
      totalDurationMinutes: 36,
      totalWalkingMinutes: 14,
      transferCount: 1,
      accessibilityUnknown: true,
      score: 100,
      providerName: this.name,
      sourceStatus: "estimated",
    }];
  }
}
