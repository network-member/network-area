---
applyTo: 'ui/**'
---

# UI Workspace Instructions

## Authentication

- Client auto-refreshes access token with 5-second expiration buffer (`ui/src/api/interceptors.ts`)

## Conventions

- Path alias: `@/` → `ui/src/`
- Forms use React Hook Form + Zod resolvers; API calls use `@/api/client`
- Material UI is the main UI tool. The goal is to use its built-in functionality: components (user inputs / data displays / layouts / etc) and utils (styling / theming / etc) to handle as much of the UI as possible, avoiding writing pure CSS or reinventing common controls. Custom components should be created only when necessary, and should leverage MUI's design system for consistency.
