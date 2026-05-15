<div align="center">

<img src="public/logo.png" width="120" height="120" style="border-radius:50%" alt="Aurelo Logo" />

# AURELO

### Premium Custom Apparel Platform

*Editorial luxury streetwear — crafted in Lahore, delivered across Pakistan.*

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178c6?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-c9a96e?style=flat-square)](LICENSE)

[Live Demo](#) · [Features](#features) · [Quick Start](#quick-start) · [Architecture](#architecture)

</div>

---

## Overview

Aurelo is a **production-grade portfolio project** — a full-featured custom apparel storefront built to demonstrate real-world frontend engineering. It runs 100% in demo mode without any paid backend, but is fully structured for Firebase or a Node API when needed.

**Design:** Dark luxury theme — charcoal `#0d0d0d`, gold accent `#c9a96e`, Cinzel serif + DM Sans, stitching motifs, and film-grain overlay.  
**Animations:** Page transitions, card hover, staggered grids, floating hero emblem, marquee strip — all respecting `prefers-reduced-motion`.

---

## Quick Start

```bash
git clone https://github.com/your-username/aurelo.git
cd aurelo
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

```bash
npm run build       # production build (zero errors)
npm run test        # Vitest + React Testing Library
npm run lint        # ESLint
npm run format      # Prettier
npm run preview     # preview production build locally
```

---

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Customer | `any@email.com` | `any password` |
| Admin | `admin@aurelo.pk` | `admin123` |

> First login automatically seeds 3 sample orders (pending, active, delivered) so the portfolio showcase is populated immediately.

---

## Features

### Storefront
| Page | What it does |
|------|-------------|
| **Home** | Hero section, floating logo emblem, marquee strip, collections grid, featured products, social proof stats, newsletter with fused input+button |
| **Shop** | Category / audience / price filters, debounced search (350ms), sort (newest, price, rating), load-more pagination |
| **Product detail** | 3-image gallery, size selector, size guide modal, star rating, verified reviews, related products |
| **Cart** | Persistent (Redux + localStorage), qty controls, per-line remove, shipping estimate, sticky summary |
| **Checkout** | 3-step flow (Shipping → Payment → Review), field-level Zod validation, PK payment methods: JazzCash, EasyPaisa, Bank Transfer |
| **Wishlist** | Toggle heart on any card, persisted in localStorage |

### Account
| Page | What it does |
|------|-------------|
| **Login / Register** | Demo mode (any credentials) + Firebase-ready service layer |
| **Account** | Profile, saved addresses (mock) |
| **Orders** | Tabs: All · Pending · Active · Delivered · Cancelled, timeline events, cancel pending orders |

### Admin *(protected)*
- Product catalogue table (46 items)
- All orders list with live status dropdown
- Demo credentials: `admin@aurelo.pk` / `admin123`

### System
- **404 / 500** styled error pages
- Mobile-first, fully responsive
- Focus rings, ARIA labels, keyboard navigation, AA color contrast

---

## Tech Stack

```
Frontend          React 19 · Vite 8 · TypeScript (strict mode)
State             Redux Toolkit · RTK Query (server state)
Routing           React Router 7 (lazy-loaded routes)
Styling           Tailwind CSS v4 · CSS custom properties (design tokens)
Forms             react-hook-form · Zod validation
Animation         Framer Motion (prefers-reduced-motion respected)
Notifications     Sonner
Testing           Vitest · React Testing Library
Linting           ESLint · Prettier
Deploy            Vercel (SPA rewrites in vercel.json)
```

---

## Environment Variables

Copy `.env.example` → `.env`:

```bash
cp .env.example .env
```

| Variable | Values | Default | Description |
|----------|--------|---------|-------------|
| `VITE_DATA_SOURCE` | `mock` · `firebase` · `api` | `mock` | Product & order data source |
| `VITE_AUTH_MODE` | `demo` · `firebase` | `demo` | Authentication mode |
| `VITE_API_BASE_URL` | URL | — | Used when `VITE_DATA_SOURCE=api` |

> **Never commit `.env`** — it is listed in `.gitignore`. Only `.env.example` is committed.

---

## Architecture

```mermaid
flowchart TB
  subgraph Pages["Pages (route-level)"]
    Home · Shop · Product · Cart · Checkout · Auth · Orders · Admin
  end

  subgraph Features["Redux Features"]
    CartSlice["cart slice\n(localStorage)"]
    AuthSlice["auth slice\n(session)"]
    WishlistSlice["wishlist slice\n(localStorage)"]
  end

  subgraph API["RTK Query — aureloApi"]
    Products["getProducts · getFeatured\ngetProduct · getRelated · getReviews"]
    Orders["getOrders · getAllOrders\nupdateOrderStatus"]
  end

  subgraph Services["Service Layer (swap-ready)"]
    PS[productService]
    OS[orderService]
    AS[authService]
  end

  subgraph Data["Data Layer"]
    Mock[("mockProducts.ts\n46 products")]
    LS[("localStorage")]
  end

  Pages --> Features
  Pages --> API
  API --> Services
  Services --> Mock
  Services --> LS
  Features --> LS
```

### Folder Structure

```
aurelo/
├── public/
│   └── logo.png                  # brand emblem
├── src/
│   ├── app/
│   │   ├── api.ts                # RTK Query endpoints
│   │   ├── store.ts              # Redux store
│   │   ├── router.tsx            # lazy routes
│   │   └── layout/               # Navbar, Footer, MainLayout, ProtectedRoute
│   ├── features/
│   │   ├── auth/                 # authSlice
│   │   ├── cart/                 # cartSlice (normalized by productId::size)
│   │   ├── catalog/              # ProductCard
│   │   ├── checkout/             # Zod schemas
│   │   └── wishlist/             # wishlistSlice
│   ├── pages/                    # HomePage, ShopPage, ProductPage, CartPage,
│   │                             # CheckoutPage, LoginPage, RegisterPage,
│   │                             # AccountPage, OrdersPage, WishlistPage,
│   │                             # AdminPage, NotFoundPage, ErrorPage
│   ├── services/
│   │   ├── productService.ts     # filters, pagination, reviews
│   │   ├── orderService.ts       # CRUD + demo seed
│   │   └── authService.ts        # demo + Firebase-ready
│   ├── data/
│   │   └── mockProducts.ts       # 46 products, mock reviews
│   ├── shared/
│   │   ├── ui/                   # Button, Input, Badge, Modal, Drawer,
│   │   │                         # Skeleton, EmptyState, Breadcrumb
│   │   ├── hooks/                # useAuth, useCart, useOrders, useProducts, redux
│   │   ├── icons/                # SVG icon set (no external deps)
│   │   ├── animations/           # Framer Motion variants + easings
│   │   ├── types/                # shared TypeScript interfaces
│   │   └── lib/                  # utils, storage, env
│   └── test/
│       ├── cart.test.tsx         # cart slice smoke tests
│       ├── auth.test.tsx         # auth slice smoke tests
│       └── setup.ts
├── .env.example
├── vercel.json                   # SPA rewrites
├── vitest.config.ts
├── vite.config.ts
└── tsconfig.app.json
```

---

## Deploy to Vercel

1. Push to GitHub
2. Import repo at [vercel.com/new](https://vercel.com/new)
3. Framework preset: **Vite**
4. Add env vars from `.env.example` in the Vercel dashboard
5. Deploy — `vercel.json` handles SPA client-side routing rewrites automatically

---

## Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--color-charcoal` | `#0d0d0d` | page background |
| `--color-gold` | `#c9a96e` | primary accent, borders, CTAs |
| `--color-cream` | `#f5f0e8` | body text |
| `--color-muted` | `#8a8580` | secondary text |
| `--font-display` | Cinzel (serif) | headings, logo |
| `--font-body` | DM Sans | all other text |

---

## License

MIT — free for portfolio and personal use.

---

<div align="center">
  <sub>Built with precision in Pakistan · Aurelo &copy; 2026</sub>
</div>
