# Issue: Activate Dashboard Filters

## Summary
- Portfolio filter controls on `src/pages/Index.tsx` capture state but downstream cards, charts, and tables continue to query the full dataset.
- Users click the filters expecting the rest of the dashboard to respond; the unresponsive experience erodes trust in the analytics.
- We need a shared data pipeline so every analytic respects the selected rating, sector, region, and search term.

## Impact
- Restores credibility by making the interface react instantly to user intent.
- Reduces context switching—analysts can zero in on risky segments without exporting data.
- Lays the groundwork for future drill-down workflows and coordinated filtering across routes.

## Execution Plan
1. Extract a `usePortfolioFilters` hook (or context provider) that exposes filter state, setters, and a derived `filteredCustomers` collection.
2. Refactor `CustomerDataService` access so components consume the filtered data instead of the raw `getAllCustomers()` collection.
3. Update `CreditDistributionChart`, `RiskHeatmap`, `TopClientsSpotlight`, and `TopExposuresTable` to accept data props or hook into the shared context; mirror empty-state messaging when filters return no rows.
4. Extend hero highlights and KPI cards to derive metrics from the filtered slice where appropriate, noting any values that must remain global.
5. QA: manual sanity checks (rating/sector/region combinations, search term) plus smoke tests for navigation; record follow-up tasks for perf tuning or caching once behavior is live.

## Acceptance Criteria
- Filters and search update all dashboard analytics within a frame, without page reloads.
- Empty/edge states render helpful guidance (e.g., “No customers match the current filters”).
- No regressions to initial load: default view mirrors today’s totals when filters are set to “all” and search is blank.
- Accessibility remains intact (keyboard tab order, focus management, ARIA labels) after wiring the filter interactions.
