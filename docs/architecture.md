# Architecture

## Overview

World Wizard is a React + Vite single-page application with two primary surface areas:

1. Public marketing / access pages: `/` (Homepage), `/product`, `/pricing`, `/login`.
2. Protected diary workspace under `/app` featuring a sidebar (lists & detail), a map, and user info.

Routing is handled via **React Router v6** using nested routes. A `ProtectedRoute` component guards the `/app/*` tree by checking authentication state from `FakeAuthContext`.

## High-Level Flow

```text
App (BrowserRouter)
 ├── Public Pages
 │    ├── Homepage
 │    ├── Product
 │    ├── Pricing
 │    ├── Login (uses AuthContext.login)
 │    └── 404 (PageNotFound)
 └── ProtectedRoute (/app)
      └── AppLayout
           ├── Sidebar (nested outlet)
           │    ├── CityList (/app/cities)
           │    ├── CountryList (/app/countries)
           │    ├── City (detail /app/cities/:id)
           │    └── Form (add /app/form?...)
           ├── Map (markers + click navigation)
           └── User (avatar + logout)
```

## State Management

Two React Context providers encapsulate global state:

- `FakeAuthContext` – simple in-memory auth; exposes `{ user, isAuthenticated, login, logout }`.
- `CitiesContext` – city collection & current city; exposes `{ cities, currentCity, isLoading, error, getCity, createCity, deleteCity }`.

This approach avoids prop drilling while keeping complexity low (no Redux needed).

## Data Layer

A **JSON Server** instance (`npm run server`) serves CRUD endpoints:

- `GET /cities`
- `GET /cities/:id`
- `POST /cities`
- `DELETE /cities/:id`

Client code normalizes created city payloads (assigns an id, converts date to ISO, coerces coordinate numbers).

## Map & Geolocation

`react-leaflet` renders the interactive map:

- Markers generated from `cities` context.
- `DetectClick` navigates to `form?lat=...&lng=...` on map clicks.
- `useGeolocation` centers the map to browser position when requested.
- `useUrlPosition` parses `lat`/`lng` query params enabling deep links.

## Reverse Geocoding

The form calls BigDataCloud API to reverse geocode coordinates, retrieving city name, country, and country code (converted to flag emoji). Errors produce user-friendly retry messages.

## Error & Loading Handling

A reducer action pattern drives `isLoading` and `error` state. Components display `Spinner`, `SpinnerFullPage`, or `Message` when appropriate. Duplicate city fetches are avoided by short‑circuiting `getCity` if the requested id matches `currentCity.id`.

## Styling

Each component/page has a co-located CSS Module (e.g., `Map.module.css`) ensuring scoped styling and predictable class names. Global resets / base styles live in `index.css`.

## Security Considerations

Authentication is intentionally mocked and not suitable for production. The JSON Server is local only and assumes trusted usage. For real deployments you would replace FakeAuth with a secure auth provider and move data to a persistent database.

## Extensibility Notes

Potential enhancements:

- PUT/PATCH endpoint support for editing existing cities.
- Pagination or virtualized lists for large travel histories.
- Map clustering for dense regions.
- Syncing data to cloud storage or offline mode with service workers.
- Real authentication & user-specific data partitioning.

## Component Responsibility Summary

- `AppLayout` – structural shell.
- `Sidebar` – houses nested route content (lists, forms, details).
- `CityList` / `CountryList` – render aggregated data.
- `City` – loads and shows individual city details via `getCity`.
- `Form` – reverse geocode + submit new city.
- `Map` – render markers & capture click position.
- `User` – display user info & logout.

## Data Flow Diagram (Textual)

```text
User click Map -> URL query lat/lng -> Form reverse geocodes -> createCity POST
 -> JSON Server persists -> CitiesContext reducer adds city -> Map & lists re-render.
Select city in list -> getCity fetches -> currentCity updated -> City detail renders.
Logout -> AuthContext resets -> ProtectedRoute redirects to '/'.
```

## Performance Considerations

- Initial cities loaded once at mount.
- Marker rendering remains efficient at small to medium dataset size; consider clustering if thousands of cities.
- No heavy global re-renders: context values kept minimal.

## Testing Strategy (Future)

Current project lacks formal tests. Suggested areas:

- Reducer action tests for `CitiesContext`.
- Integration tests for add/delete city workflows.
- Geolocation & URL param parsing edge cases.

---

For setup and workflow details see [`development.md`](development.md). Data schema details live in [`data-model.md`](data-model.md).
