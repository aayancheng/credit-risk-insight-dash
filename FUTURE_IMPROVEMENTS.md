# Future Improvement Plan

The initiatives below are ordered by impact on dashboard reliability, accessibility, and team velocity. Each item includes a short rationale along with complexity and expected productivity gain estimates to guide planning.

| Rank | Initiative | Rationale | Complexity | Productivity Gain |
| --- | --- | --- | --- | --- |
| 1 | Stabilize sidebar-responsive layout | Reinstate a consistent content offset for sub-`lg` viewports so analytics remain visible when the sidebar toggles widths. Prevents current overlap that blocks mobile workflows. | Medium | High |
| 2 | Wire accessible interactions for `RiskHeatmap` cells | Replace inert buttons with actionable handlers (e.g., drill-down modal) and ARIA labels to support keyboard and screen-reader users, aligning with accessibility goals. Layer in hover/click tooltips that expose portfolio summaries so analysts can inspect concentration risk without leaving the main dashboard. | Medium | Medium |
| 3 | Stand up Vitest + React Testing Library suite | Introduce component and hook tests for risk analytics and navigation flows, unlocking CI confidence and coverage for future refactors called out in `IMPROVEMENT_CHECKLIST.md`. | Medium-High | High |
| 4 | Modularize data services and state management | Split fetching, transformation, and caching into dedicated modules and consider a lightweight store (Zustand) to reduce prop drilling and duplicate queries. | High | Medium-High |
| 5 | Automate data quality monitoring pipeline | Expand the deterministic seeding script into scheduled validation checks (missing values, outliers) with alerts, ensuring dashboards stay trustworthy as data sources scale. | High | High |

Focus on ranks 1–2 during the next sprint to resolve blocking usability issues called out in reviews. Ranks 3–5 can be sequenced into subsequent iterations, with test infrastructure laying the groundwork for safer service refactors and data governance upgrades.

## RiskHeatmap Interaction Workstream
- **Interaction model**: Convert each cell into a focusable button that toggles the risk-segment detail drawer and dispatches filters to downstream charts.
- **Accessibility polish**: Annotate the grid with ARIA roles, stateful labels (e.g., `aria-pressed`), and keyboard shortcuts that mirror the pointer experience.
- **Contextual insights**: Introduce tooltip metadata (top counterparties, exposure deltas) that load from the existing portfolio service to keep interactions performant.
- **QA plan**: Pair manual screen reader sweeps with new Vitest integration tests to validate keyboard navigation, filter dispatching, and tooltip visibility.
