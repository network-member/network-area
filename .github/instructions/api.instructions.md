---
applyTo: 'api/**'
---

# API Workspace Instructions

## Domain Pattern

Each domain folder exports one barrel `index.ts`. A full domain has:

```
domains/feature/
  feature.entity.ts         # MikroORM entity with decorators
  feature.service.ts        # Business logic, takes req.em as EntityManager
  feature.controller.ts     # Express Router, calls service
  feature.middleware.ts     # Request-level guards (optional)
  index.ts                  # Re-export public API
```

## Request Lifecycle

```
contextualLogger → json/cookies → req.em (EntityManager fork) →
  CORS → router → authenticate middleware → controller → validateApiRoutePayload (Zod)
  → service → response → global error handler
```

## Error Handling

- Throw `ApiError` subclasses (`BadRequestApiError`, `UnauthorizedApiError`) from `@/errors`
- Global error middleware in `errors-handling.middleware.ts` catches all unhandled errors

## Database

- Always access DB via `req.em` (request-scoped fork, injected by middleware)
- Always create migrations via `orm:cli`

## Logging

- Use the Pino logger from `@/logger` — it reads `traceId` from AsyncLocalStorage automatically
- For startup/background code (outside request context), pass `{ traceId: 'startup' }` explicitly to avoid ALS invariant failures
