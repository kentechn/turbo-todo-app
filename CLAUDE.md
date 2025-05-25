# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps
- `pnpm lint` - Run ESLint across all apps
- `pnpm check-types` - Run TypeScript type checking
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests (currently no tests implemented)
- `pnpm clean` - Clean build outputs and caches

### Package Management
- `pnpm install` - Install dependencies for all workspaces
- `pnpm add <package> --filter <workspace>` - Add dependency to specific workspace (e.g., `--filter frontend`)

## Architecture

This is a Turborepo monorepo with the following structure:

- **apps/backend**: Hono REST API server (port 3000)
  - Framework: Hono (lightweight web framework)
  - Development: Uses tsx for TypeScript execution
  - Entry: src/index.ts

- **apps/frontend**: React SPA
  - Framework: React + TypeScript + Vite
  - Development server: Vite (default port 5173)
  - Entry: src/main.tsx

- **packages/**: Directory for shared packages (currently empty)

### Key Technologies
- Build system: Turborepo for orchestrating builds
- Package manager: pnpm with workspaces
- Language: TypeScript throughout
- Node version: >=18

### Turborepo Pipeline
The `turbo.json` defines the following tasks:
- `build`: Depends on upstream builds, outputs to dist/out directories
- `dev`: Persistent development task
- `lint`, `check-types`, `test`: Standard validation tasks

## Current State
This is a fresh monorepo setup from Turborepo's kitchen-sink template. The todo app functionality has not been implemented yet. The backend has a minimal Hono server, and the frontend contains the default Vite React template.