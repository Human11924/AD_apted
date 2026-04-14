# AdaptEd Frontend

Production-style responsive frontend for AdaptEd, a B2B hybrid workplace English-training platform.

## Stack

- React + TypeScript + Vite
- Tailwind CSS v4
- React Router
- Axios (centralized client + auth interceptor)
- React Query (typed data fetching)
- Zustand (auth and persistent session)

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Configure environment:

```bash
cp .env.example .env
```

Set `VITE_API_BASE_URL` to your FastAPI backend URL.

3. Start development server:

```bash
npm run dev
```

4. Build for production:

```bash
npm run build
```

## Route Map

Public routes:

- `/`
- `/about`
- `/companies`
- `/teachers`
- `/contact`
- `/login`
- `/register-by-code`

Protected routes:

- `/admin/*`
- `/employer/*`
- `/teacher/*`
- `/student/*`

## Architecture

- `src/components/ui`: reusable design-system components
- `src/layouts`: marketing and dashboard layouts
- `src/pages`: public and role-based pages
- `src/services/api`: Axios client + domain services + mock fallback data
- `src/hooks/queries`: React Query hooks
- `src/store`: auth session management
- `src/routes`: app router and role guard
- `src/types`: DTOs and shared types

## Notes

- Login and register-by-code are wired for JWT backend endpoints.
- If API endpoints are unavailable, employer dashboard uses realistic mock fallback data for demo continuity.
