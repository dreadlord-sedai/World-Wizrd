# Data Model

## City Schema

Each city entry persisted by JSON Server conforms to:

```ts
interface City {
  id: string; // UUID or timestamp string assigned client-side
  cityName: string; // Human readable city name (from reverse geocode or user edit)
  country: string; // Country name
  emoji: string; // Country flag emoji derived from country code
  date: string; // ISO8601 visit date string
  notes: string; // Optional user notes (may be empty)
  position: {
    lat: number; // Latitude (normalized to number)
    lng: number; // Longitude (normalized to number)
  };
}
```

## Source of Truth

Runtime data is loaded from and saved to `src/data/cities.json` via JSON Server. POST and DELETE operations mutate this file.

## Example Record

```json
{
  "id": "73930385",
  "cityName": "Lisbon",
  "country": "Portugal",
  "emoji": "🇵🇹",
  "date": "2027-10-31T15:59:59.138Z",
  "notes": "My favorite city so far!",
  "position": { "lat": 38.727881642324164, "lng": -9.140900099907554 }
}
```

## Creation Normalization

`createCity` in `CitiesContext` ensures:

- Generates `id` (UUID if available, else timestamp string).
- Converts `date` to ISO string for consistency.
- Coerces `position.lat` / `position.lng` to numbers (some reverse geocode libs may return strings).
- Ensures `notes` field exists (empty string default).

## Allowed Operations

| Method | Endpoint    | Description           |
| ------ | ----------- | --------------------- |
| GET    | /cities     | Fetch all cities      |
| GET    | /cities/:id | Fetch a specific city |
| POST   | /cities     | Create a new city     |
| DELETE | /cities/:id | Remove a city         |

## Validation & Error Handling

Currently validation is minimal; the client prevents submission unless required fields (`cityName`, `date`) are present. Potential hardening steps:

- Reject coordinates outside valid lat/lng ranges.
- Enforce max note length.
- Distinguish user-specific data (multi-user scenario) via an added `userId` field.

## Extending the Model

Add fields by updating `createCity` and adjusting components:

- `rating?: number` – subjective enjoyment score.
- `photos?: string[]` – list of image URLs.
- `tags?: string[]` – categorization ("food", "culture").

## Data Consistency Tips

- Keep dates as ISO strings to simplify sorting and time zone handling.
- Prefer numeric lat/lng to avoid string parsing later.
- Derive `emoji` only from authoritative country code; avoid manual edits to prevent inconsistencies.

---

See [`architecture.md`](architecture.md) for lifecycle details and [`development.md`](development.md) for setup.
