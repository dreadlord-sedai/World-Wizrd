# Development

## Prerequisites

- Node.js 18+ recommended (ES modules & Vite compatibility).
- npm 9+.

## Install

```sh
git clone https://github.com/your-username/world-wizard.git
cd world-wizard
npm install
```

## Scripts

| Script            | Purpose                          |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start Vite dev server (HMR)      |
| `npm run build`   | Production build to `dist/`      |
| `npm run preview` | Preview production build locally |
| `npm run lint`    | Run ESLint over source files     |
| `npm run server`  | Start JSON Server (port 8000)    |

## Running JSON Server

```sh
npm run server
```

Endpoints exposed at `http://localhost:8000/cities` reading from `src/data/cities.json`. Changes made through the app persist by writing back to this file.

## Launch App

In a separate terminal:

```sh
npm run dev
```

Open the printed URL (default `http://localhost:5173`).

## Authentication

Fake credentials:

- Email: `jack@example.com`
- Password: `qwerty`

Login sets in-memory state only; refreshing the browser logs you out.

## Environment Variables

None required currently. Potential future variables:

- `VITE_GEOCODE_BASE_URL` to override reverse geocoding endpoint.

## Code Style

- React function components.
- CSS Modules for scoped styles.
- No Redux; contexts for global state.
- Dates stored as ISO strings.

## Adding a New Feature

1. Create branch: `git checkout -b feature/short-description`.
2. Implement component, co-located CSS Module.
3. Update docs if data model or architecture changes.
4. Run lint & manual test.
5. Commit with conventional prefix (`feat:`, `fix:`, etc.).
6. Open PR.

## Troubleshooting

| Symptom               | Cause                              | Fix                                         |
| --------------------- | ---------------------------------- | ------------------------------------------- |
| Map not loading tiles | Network / blocked domain           | Check console; verify tile URL availability |
| Reverse geocode error | API response missing `countryCode` | Click a different map location              |
| Unauthorized redirect | Not logged in                      | Use fake credentials again                  |
| Cities not persisting | Server not running                 | Start JSON Server before adding cities      |

## Suggested Improvements

- Add editing (PUT/PATCH) support.
- Pagination / virtualization for large city lists.
- Basic unit & integration tests.

---

See [`architecture.md`](architecture.md) and [`data-model.md`](data-model.md) for complementary information.
