---
name: Activate dashboard filters
about: Track the work to make homepage analytics respond to portfolio filters.
title: "Activate Dashboard Filters"
labels: enhancement, frontend
---

## Summary

See `docs/issues/activate-dashboard-filters.md` for the detailed problem statement, impact, execution plan, and acceptance criteria.

## Action Items

- [ ] Implement shared filter state (`usePortfolioFilters` hook or provider) and derive filtered customer data.
- [ ] Update dashboard analytics (`CreditDistributionChart`, `RiskHeatmap`, `TopClientsSpotlight`, `TopExposuresTable`) to consume the filtered data.
- [ ] Align hero metrics and KPIs with filtered values or document any global-only exceptions.
- [ ] Add empty-state messaging when filters/search yield no customers.
- [ ] Complete manual QA notes and add follow-up tasks as needed.

## Validation

- [ ] All filters and search box update analytics instantly.
- [ ] Accessibility checks pass (keyboard navigation, screen reader output).
- [ ] No regression to default metrics when filters reset to "all".
