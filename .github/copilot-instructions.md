# network-area-monorepo

Full-stack monorepo. Pet/portfolio project — single developer, full lifecycle from local dev to prod deployment on https://network-area.online.

## Architecture

Two workspaces:

- **`api/`** — Express 5 + MikroORM 6 (PostgreSQL) + Redis, TypeScript ESM, Node 24
- **`ui/`** — React 19 + React Router 7 + Material UI 7, Webpack 5 + SWC, TypeScript

**Node 24** required; check with `node -v` if build fails unexpectedly.

Local dev infra: PostgreSQL 18 + Redis 8 via docker-compose (default creds: `admin/admin`, exposed on standard ports)

## Codestyle

- Respect Eslint rules defined in the root config file.

## Build & Dev Commands

```bash
# Development (run from root)
npm run api:start        # Starts API in watch mode (ts-node ESM loader)
npm run ui:start         # Starts UI dev server (webpack, port 3000)

# Build (from root)
npm run api:build        # ESLint + tsc + tsc-alias (path resolution)
npm run ui:build         # ESLint + fork-ts-checker + webpack

# Type checking only
cd api && npm run check-types
cd ui  && npm run check-types

# Linting / formatting (root)
npm run lint             # ESLint across the workspace

# Database
cd api && npm run orm:cli -- migration:up   # Run pending migrations
cd api && npm run db:seeds                  # Run seeders
cd api && npm run db:wipe-data              # Wipe seeded data

# Docker (local infra: postgres + redis)
npm run docker:up        # Start docker-compose services
```

API runs on port **4000**, UI dev server on port **3000**.
