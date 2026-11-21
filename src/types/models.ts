export type TransportMode = "walk" | "transit" | "drive" | "bike" | "wait";
export type TripPreference = "fastest" | "fewest-transfers" | "accessible" | "cheapest" | "balanced";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  name: string;
  coordinates?: Coordinates;
}

export interface Leg {
  id: string;
  sequence: number;
  mode: TransportMode;
  origin: Location;
  destination: Location;
  durationMinutes: number;
  distanceMeters?: number;
  instructions: string;
  lineName?: string;
  fareMinor?: number;
  currency?: string;
  accessibility: {
    stepFree: boolean | null;
    lowFloor: boolean | null;
    assistanceAvailable: boolean | null;
  };
  sourceStatus: "estimated" | "live" | "provider-verified";
}

export interface LoadingStage {
  id: string;
  sequence: number;
  title: string;
  legs: Leg[];
}

export interface RouteOption {
  id: string;
  summary: string;
  stages: LoadingStage[];
  totalDurationMinutes: number;
  totalWalkingMinutes: number;
  transferCount: number;
  estimatedCostMinor?: number;
  currency?: string;
  accessibilityUnknown: boolean;
  score: number;
  providerName: string;
  sourceStatus: "estimated" | "live" | "provider-verified";
}

export interface TripRequest {
  origin: string;
  destination: string;
  departureTime?: string;
  preference: TripPreference;
  accessibilityNeeds?: string[];
}

export interface TripPlan {
  request: TripRequest;
  routes: RouteOption[];
  selectedRouteId: string | null;
  assumptions: string[];
  summary: string;
}
