# Retail Platform: Microservices Engine

A high-performance, resilient retail platform built with **TypeScript**, **NestJS**, **Prisma**, and **PostgreSQL**. Managed as a monorepo using **TurboRepo** and **NPM Workspaces**.

---

## 🏗️ Architecture Overview

The platform is designed with a **"Staff Architect"** mindset, focusing on scalability, atomic consistency, and distributed resilience.

- **Monorepo Structure**: All services and shared packages live in a single repository for easy coordination.
- **Service Isolation**: Each service is a distinct NestJS application with its own database and bounded context.
- **Orchestration**: Powered by **TurboRepo** for parallel execution and intelligent caching.

### 🔌 Core Services & Ports
| Service | Port | Responsibility |
| :--- | :--- | :--- |
| **Auth** | `3000` | Stateful session validation & User Management |
| **Catalog** | `3001` | High-read product browsing & filtering |
| **Inventory** | `3002` | Atomic stock reservations (Pessimistic Locking) |
| **Orders** | `3003` | Saga orchestration for checkouts |
| **Payment** | `3004` | External gateway integration (Capture/Refund) |
| **Cart** | `3005` | Low-latency temporary storage |
| **Checkout** | `3006` | Frontend-facing checkout experience |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: v18+ 
- **Docker**: For running PostgreSQL/Redis locally.
- **Turbo**: Installed via root dependencies.

### 2. Running the System
We use **TurboRepo** to orchestrate the services. You don't need to open multiple terminals.

#### Run EVERYTHING (Full Platform)
Starts all 7 services in parallel with synchronized logs.
```bash
npm run dev
```

#### Run CORE Flow (Auth + Catalog)
Optimized script for focusing on the frontend entry-point flows.
```bash
npm run dev:core
```

#### Other Commands
- `npm run build`: Builds all services (with Turbo caching).
- `npm run lint`: Runs ESLint across the entire monorepo.
- `npm run test`: Executes unit and E2E tests for all services.


---

## 📜 Documentation
- **[AUTH_CURL_REQUESTS.md](./apps/auth-service/AUTH_CURL_REQUESTS.md)**: Testing guide for the Auth Service.
