# World Wizard

![image](screenshot.png)

[![Watch on YouTube](https://img.youtube.com/vi/cPBOXLhCfGw/maxresdefault.jpg)](https://youtu.be/cPBOXLhCfGw?si=W4Z-2ZXJtg_5bcoi)

## Table of Contents

- [World Wizard](#world-wizard)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Scripts](#scripts)
  - [Architecture](#architecture)
  - [Data Model](#data-model)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)

## Introduction

World Wizard is a React + Vite single-page application that helps travelers keep a personal log of places they've visited. Add cities directly by clicking the interactive map, automatically reverse‑geocode their names and countries, attach visit dates and notes, and visualize all trips with country grouping. Authentication (mock) protects your personal travel diary, while a lightweight JSON Server powers CRUD operations for city entries.

## Features

- Interactive map (Leaflet) with click-to-add city workflow
- Automatic reverse geocoding (BigDataCloud API) for city/country + flag emoji
- Visit log: date picker, personal notes, country flag, persistent storage
- City list & country aggregation views with quick navigation
- Detail view per city and deletion capability
- Geolocation centering & deep-link map positioning via URL query params
- Protected routes (mock auth) for the diary portion
- Responsive UI with modular CSS & loading/error states

## Technologies Used

- **HTML5**: Semantic markup foundations enabling accessibility and structure.
- **CSS3**: Scoped styling via CSS Modules for maintainable component styles.
- **JavaScript (ESNext)**: Modern language features powering state & side-effects.
- **React**: Context-driven state management (auth, cities) & declarative UI.
- **React Router**: Nested routing, protected routes, URL state (lat/lng params).
- **React Leaflet + Leaflet**: Map rendering, markers, click events.
- **Vite**: Fast dev server, HMR, optimized production builds.
- **JSON Server**: Lightweight REST API for cities CRUD at `http://localhost:8000`.
- **React DatePicker**: User-friendly visit date selection.

<p align="left">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=react,js,nodejs,css" />
  </a>
</p>


## Installation

Clone and run locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/world-wizard.git
   ```

2. Enter the directory:

   ```sh
   cd world-wizard
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

4. (Optional) Start JSON API server for persistent data:

   ```sh
   npm run server
   ```

   This serves REST endpoints at `http://localhost:8000/cities`.

5. Start the dev app:

   ```sh
   npm run dev
   ```

6. Open the printed local URL (default `http://localhost:5173`).

## Usage

1. Navigate to the map (log in first; use email `jack@example.com` and password `qwerty`).
2. Click anywhere on the map to prefill a new city form via reverse geocoding.
3. Adjust city name (if needed), pick visit date, add notes, then save.
4. View all saved cities under the Cities list or grouped countries under Countries.
5. Click a marker or list item to view city details or delete an entry.
6. Use the "Use your position" button to center the map on current geolocation.
7. Share links with lat/lng query to deep-link to a position (e.g. `/app/form?lat=48.12&lng=11.58`).

## Scripts

Available npm scripts:

| Script            | Purpose                        |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start Vite dev server          |
| `npm run build`   | Production build               |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Lint source files              |
| `npm run server`  | Start JSON Server on port 8000 |

## Architecture

See detailed diagram & notes in [`docs/architecture.md`](docs/architecture.md). High‑level pieces:

- `contexts/CitiesContext.jsx`: Manages loading, caching, CRUD for city entries.
- `contexts/FakeAuthContext.jsx`: Simple in-memory auth & protected route gating.
- `components/Map.jsx`: Leaflet map, geolocation, click-to-add logic.
- `components/Form.jsx`: Reverse geocode + city creation with date & notes.
- `hooks/useGeolocation.js` & `hooks/useUrlPosition.js`: Encapsulate browser APIs and URL param parsing.
- `pages/AppLayout.jsx`: Shell for sidebar + map + content area.

## Data Model

City object (persisted by JSON Server):

```ts
type City = {
  id: string; // UUID or timestamp string
  cityName: string; // Display name of the city
  country: string; // Country name
  emoji: string; // Flag emoji for country
  date: string; // ISO date string of visit
  notes: string; // Optional user notes
  position: {
    // Geographic coordinates
    lat: number; // Latitude
    lng: number; // Longitude
  };
};
```

Endpoints (assuming server running):

- `GET /cities` – list all cities
- `GET /cities/:id` – retrieve a single city
- `POST /cities` – create new city (server returns created entity)
- `DELETE /cities/:id` – remove a city

## Contributing

1. Fork the repository.
1. Create a feature branch:

```sh
git checkout -b feature/your-feature-name
```

1. Run lint before committing:

```sh
npm run lint
```

1. Commit changes:

```sh
git commit -m "feat: add new travel feature"
```

1. Push:

```sh
git push origin feature/your-feature-name
```

1. Open a Pull Request describing motivation and screenshots (if UI changes).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For questions or feedback:

- **Dahami Fabio**: [dahamifabbio@gmail.com](mailto:dahamifabbio@gmail.com)
- **GitHub**: [dreadlord_sedai](https://github.com/dreadlord-sedai)

---

Additional docs: [`docs/development.md`](docs/development.md) • [`docs/data-model.md`](docs/data-model.md) • [`docs/architecture.md`](docs/architecture.md)
