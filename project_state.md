## Project State

### Current Status
- Repository initialized with Vite-based React + TypeScript frontend scaffold (`frontend/`).
- Dependencies installed for routing (`react-router-dom`), state management (`zustand`), data fetching (`axios`), UI utilities, and Tailwind CSS tooling.
- Tailwind, global styles, and the initial router shell (`AppRoutes`) are configured with placeholder Landing/404 screens.
- Navigation layouts (sidebar/top bar) and authenticated route scaffolding (`/app`, `/auth/*`) are in place with placeholder feature pages.
- Backend artifacts referenced in requirements (`backend/src/server.js`, API docs) are not present in the workspace yet, so API interactions will rely on a configurable base URL and mock data utilities until backend integration becomes available.

### Planned Architecture
- **Routing**: React Router v7 with a centralized route configuration, nested layouts for authenticated vs. public views, and lazy-loaded pages for performance.
- **State Management**: Modular Zustand stores for auth/session, UI preferences (theme, sidebar), and domain data caches (invoices, quotes, contacts, payments).
- **Services Layer**: Axios client with interceptors for auth tokens, typed service modules (`authService`, `invoiceService`, etc.), and optional mock fallbacks.
- **UI Components**: Reusable component library under `frontend/src/components/` (buttons, inputs, cards, tables, charts, layout primitives) styled with Tailwind + utility helpers.
- **Styling**: Tailwind CSS with custom theme tokens, dark mode via `class` strategy, responsive breakpoints, and motion/interaction polish (Headless UI, Framer Motion).
- **Forms & Validation**: `react-hook-form` + `zod` schemas for authentication and CRUD flows.

### Next Steps
1. Build reusable component set and shared hooks.
2. Wire up Zustand stores and API service modules with mock data helpers.
3. Flesh out page experiences (Dashboard, Invoices, Quotes, Contacts, Payments, Settings, Auth).
4. Layer responsive design, theming, and authentication UI polish.
5. Re-run build/tests to ensure application compiles cleanly.
