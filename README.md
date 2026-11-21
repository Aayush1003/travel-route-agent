# Travel Route Agent

A human-centered, leg-level route planning agent for the web and API.

## What it does

- Loads and normalizes route options
- Breaks a journey into route loading stages and individual legs
- Compares routes by duration, walking, transfers, cost, and accessibility
- Uses a provider adapter for routing and map data
- Keeps uncertainty and missing data visible
- Produces a structured itinerary and user-friendly explanation

## Repository structure

```text
src/
  agent/       Agent intent, preferences, and explanations
  routing/     Routing providers and route normalization
  itinerary/   Route-loading lists and leg-level itinerary logic
  api/         HTTP routes
  types/       Shared data models
  index.ts     Application entry point
```

## Design principles

- Never present estimates as verified live facts.
- Ask only for missing information that materially affects the trip.
- Keep raw provider data separate from normalized route results.
- Rank routes transparently and let users change preferences.
- Redact and minimize location data.
- Return machine-readable output and a readable summary.

## API

`POST /v1/plan-trip`

```json
{
  "origin": "Union Station, Los Angeles",
  "destination": "Griffith Observatory, Los Angeles",
  "preference": "accessible",
  "departureTime": "2026-11-21T09:00:00-08:00"
}
```

The API returns route-loading stages, legs, alternatives, assumptions, and a natural-language summary.

## Development

```bash
npm install
npm run dev
npm test
npm run build
```

This repository starts with an OpenStreetMap/Nominatim-compatible provider interface and a deterministic demo provider. Production providers should be registered behind the same interface.
