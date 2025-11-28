# React Shopping List

A small demo React application that implements a searchable, filterable product catalogue with sorting, a dual-thumb price range slider, and an "in stock" toggle. Built with Vite, React, Tailwind CSS and a few small custom hooks/components. Includes unit tests using Vitest + React Testing Library.

## Features

- Search with debounce and a loading indicator
- Category filters using reusable checkbox components
- In-stock toggle
- Dual-thumb price range slider (rc-slider)
- Sorting: name, price, rating (asc/desc)
- Reset filters button (clears price, categories, in-stock and sort)
- Simulated product fetch to demonstrate a loading state
- Unit tests for hooks and important components (Vitest + React Testing Library)

## Quick start

Prerequisites
- Node 18+ (recommended)

Install dependencies
```powershell
npm install
```

Run the dev server
```powershell
npm run dev
# then open the URL printed by Vite (usually http://localhost:5173)
```

Build for production
```powershell
npm run build
npm run preview
```

## Testing

This project uses Vitest and React Testing Library.

Run tests:
```powershell
npm run test
```

Run tests in watch mode:
```powershell
npm run test:watch
```

Notes
- `src/setupTests.js` imports `@testing-library/jest-dom` so matchers like `toBeInTheDocument()` are available.
- Hook/unit tests are under `src/components/hooks/`; component tests live adjacent to components (e.g. `src/components/header-components/Search.test.jsx`).
