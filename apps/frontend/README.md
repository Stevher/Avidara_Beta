# @evidara/frontend

Next.js frontend for the Evidara regulatory platform.

## Development

From the **monorepo root**:

```bash
yarn dev
```

Or directly:

```bash
yarn workspace @evidara/frontend dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start dev server |
| `yarn build` | Production build |
| `yarn start` | Start production server |
| `yarn lint` | Run ESLint |

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4**
- **TypeScript 5**

## Project Structure

```
src/
├── app/
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
└── components/         # Shared components (to be added)
```

## Internal Packages

This app can import from monorepo packages:

```typescript
import { ... } from "@evidara/shared";
import { ... } from "@evidara/ai";
import { ... } from "@evidara/config";
```
