# Meli Play – UX Challenge Prototype

Home page prototype for **Meli Play**, built from the [Figma design](https://www.figma.com/design/TdLbz9104Ru4oTULqxXGSL/MELI-UX-Challenge---Meli-Play?node-id=249-1112) using React, Tailwind CSS v4, and ShadCN-style components. Design tokens (colors, typography, radius) follow the Meli Play Design System.

## Stack

- **React 19** + **TypeScript**
- **Vite 7**
- **Tailwind CSS v4** (CSS-first config)
- **ShadCN-style** UI (Button, Avatar; CVA + Radix Slot)
- **Lucide React** for nav icons
- **Adobe Fonts** – Proxima Nova (`https://use.typekit.net/ocb2xpv.css`)

## Design tokens (globals)

Defined in `src/index.css` and `@theme`:

- **Background:** `background-overlay` (#1a1a1a), `background-primary` (#313131), `background-muted` (#767676), `background-secondary` (#ffe600)
- **Text:** `text-primary`, `text-subtle`, `text-inverse`, `text-accent`
- **Action:** `action-primary` (#ffe600)
- **Border:** `border-default` (#484848)
- **Radius:** `radius-6` (6px)
- **Font sizes:** caption (11px), body (14px), body-lg (16px), title-sm (20px), title-lg (32px)

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
```

## Structure

- `src/index.css` – Tailwind + design system theme and globals
- `src/lib/utils.ts` – `cn()` for class merging
- `src/components/ui/` – Button, Avatar
- `src/components/layout/sidebar.tsx` – Left nav (profile + Buscar, Inicio, Series, Películas, Configuración)
- `src/components/home/` – Hero, Shelf, ContentCard, Top10Card, RecommendationCard
- `src/pages/home.tsx` – Home page composition
- `src/assets/images.ts` – Figma MCP asset URLs (may expire after ~7 days)

To use local or CDN assets later, replace the URLs in `src/assets/images.ts`.
