# Contributing

## Workflow

1. Fork repository.
2. Create feature branch: `git checkout -b feat/short-description`.
3. Implement changes (co-locate CSS Modules with components).
4. Run lint: `npm run lint`.
5. Test manually (add/delete city, login/logout, map click -> form workflow).
6. Commit: `git commit -m "feat: short description"`.
7. Push & open Pull Request.

## Commit Message Guidelines

Use Conventional Commits:

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only changes
- `refactor:` code change that neither fixes a bug nor adds a feature
- `chore:` build tasks, dependency bumps

## PR Checklist

- [ ] Description of change & motivation
- [ ] Screenshots for UI changes (desktop & mobile)
- [ ] Lint passes (`npm run lint`)
- [ ] No console errors in dev
- [ ] README or docs updated if data model/architecture changed

## Code Style

- Prefer small, focused components.
- Keep context providers minimal (avoid unrelated state).
- Avoid premature optimization; measure before refactoring.
- Keep public API of contexts stable (`CitiesContext`, `FakeAuthContext`).

## Adding Data Fields

If you add new properties to `City`:

1. Update `createCity` normalization in `CitiesContext`.
2. Adjust list/detail rendering components.
3. Update `docs/data-model.md`.
4. Provide fallback defaults.

## Testing Suggestions (Optional)

While tests are not yet implemented, you may add:

- City reducer unit tests.
- Integration test for add/delete flow using testing library (+ msw to mock API).

## Issues & Discussions

Open GitHub Issues for:

- Feature requests
- Bugs (include reproduction steps & environment details)

Discussions (if enabled) for broader design questions.

## Security Note

Authentication is mocked; do not submit PRs adding sensitive data. For real auth integration propose design first.

---

See also [`architecture.md`](architecture.md) and [`development.md`](development.md).
