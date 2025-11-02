# Repository Guidelines

## Project Structure & Module Organization
- `src/pages` hosts route-level React screens; `src/components` houses reusable UI built with shadcn and Tailwind; `src/services` centralizes data providers while `src/lib` collects utility helpers.
- Global providers and routing live in `src/App.tsx`, with `src/main.tsx` wiring the React root. Styling globals sit in `src/index.css` and `src/App.css`.
- Static assets belong in `public/`. Built artifacts land in `dist/`. Sample datasets reside in `data/`, and `scripts/seedClientDatabase.ts` keeps the demo SQLite output deterministic.

## Build, Test & Development Commands
- `npm run dev` starts Vite with hot module reload at `http://localhost:5173`.
- `npm run build` produces an optimized bundle inside `dist/`; pair with `npm run preview` to verify the production build locally.
- `npm run lint` executes ESLint across the workspace; resolve all warnings before you push.
- `npm run seed:clients` writes `data/client_data.db` so you can inspect consistent credit-risk fixtures.

## Coding Style & Naming Conventions
- Stick to TypeScript, ES module imports, and 2-space indentation. Enable strict types when adding tsconfig settings.
- Name React components, hooks, and services with PascalCase files (`RiskHeatmap.tsx`, `usePortfolioFilters.ts`); utilities and constants may use camelCase (`formatCurrency.ts`).
- Favor Tailwind utility classes for layout; keep shared variants in component files and extend tokens through `tailwind.config.ts` when needed.

## Testing Guidelines
- Automated tests are not yet configured; add Vitest + React Testing Library coverage alongside new features (`src/components/__tests__/RiskHeatmap.test.tsx`).
- Target ≥80% coverage on new modules, focusing on data transforms and interactive flows. Document manual QA steps in the PR when tests are unavailable.
- Seed fresh data via `npm run seed:clients` before validating analytics or navigation scenarios.

## Commit & Pull Request Guidelines
- Write imperative, present-tense commit titles (`Revamp dashboard hero`, `chore(deps): update eslint`). Include a concise scope in parentheses only when it adds clarity.
- PRs should summarize the change, list validation commands, link issues or specs, and attach screenshots or clips for UI updates.
- Confirm `npm run lint` and `npm run build` succeed locally before requesting review. Call out follow-up tasks or known gaps explicitly to keep the dashboard stable.
