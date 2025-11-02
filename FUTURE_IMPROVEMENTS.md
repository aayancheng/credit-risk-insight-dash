# Future Improvement Plan

The initiatives below are ordered by impact on dashboard reliability, accessibility, and team velocity. Each item now carries a status update so we can track momentum.

| Rank | Initiative | Status | Rationale | Complexity | Productivity Gain |
| --- | --- | --- | --- | --- | --- |
| 1 | Stabilize sidebar-responsive layout | ✅ Completed — content now respects sidebar width at all breakpoints. | Reinstate a consistent content offset for sub-`lg` viewports so analytics remain visible when the sidebar toggles widths. Prevents previous overlap that blocked mobile workflows. | Medium | High |
| 2 | Wire accessible interactions for `RiskHeatmap` cells | ✅ Completed — heatmap cells announce context, support keyboard focus, and surface live status feedback. | Replace inert buttons with actionable handlers (e.g., drill-down modal) and ARIA labels to support keyboard and screen-reader users, aligning with accessibility goals. | Medium | Medium |
| 3 | Stand up Vitest + React Testing Library suite | ⏳ Planned | Introduce component and hook tests for risk analytics and navigation flows, unlocking CI confidence and coverage for future refactors called out in `IMPROVEMENT_CHECKLIST.md`. | Medium-High | High |
| 4 | Modularize data services and state management | ⏳ Planned | Split fetching, transformation, and caching into dedicated modules and consider a lightweight store (Zustand) to reduce prop drilling and duplicate queries. | High | Medium-High |
| 5 | Automate data quality monitoring pipeline | ⏳ Planned | Expand the deterministic seeding script into scheduled validation checks (missing values, outliers) with alerts, ensuring dashboards stay trustworthy as data sources scale. | High | High |

Next priority: invest in rank 3 to lay testing groundwork before tackling broader architectural and data-governance upgrades (ranks 4–5).

## RiskHeatmap Interaction Workstream
- **Complete**: Cells are now focusable buttons with ARIA semantics, selection rings, and a live status region that narrates the active segment.
- **Next**: Decide whether to trigger a modal or dispatch filters to downstream charts when a cell is activated; capture the chosen behavior in analytics.
- **Enhance**: Layer tooltip metadata (top counterparties, exposure deltas) sourced from the portfolio service to enrich the at-a-glance experience without extra navigation.
- **QA plan**: Pair manual screen-reader sweeps with the upcoming Vitest suite to cover keyboard traversal, announced summaries, and any new drill-down behaviors.
