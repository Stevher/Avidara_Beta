# Evidara
23 March 2026

Pharmaceutical regulatory document platform with AI-powered review capabilities.

## Prerequisites

- **Node.js** >= 20.9.0 (required for Next.js 16)
- **npm** >= 10

Check your versions:

```bash
node -v
npm -v
```

If you need to upgrade Node.js, use [nvm](https://github.com/nvm-sh/nvm):

```bash
nvm install 20
nvm use 20
```

## Getting Started

### 1. Install dependencies

```bash
yarn install
```

### 2. Run the development server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
evidara/
├── apps/
│   ├── frontend/        # Next.js app
│   ├── api/             # Lambda handlers
│   ├── worker/          # PDF generation (Fargate)
│   └── infra/           # AWS CDK stacks
│
├── packages/
│   ├── shared/          # Shared types & utils
│   ├── ai/              # Bedrock client, prompt builder
│   ├── db/              # pgvector queries, models
│   └── config/          # Environment schemas
│
├── docker/              # Dockerfiles & compose
└── .github/workflows/   # CI/CD
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `yarn dev` | Start frontend dev server |
| `yarn build` | Build all workspaces |
| `yarn lint` | Run ESLint |
| `yarn lint:fix` | Fix ESLint issues |
| `yarn format` | Format code with Prettier |
| `yarn format:check` | Check formatting |
| `yarn typecheck` | Run TypeScript checks |
| `yarn clean` | Remove all node_modules |

## Workspace Commands

Run commands in specific workspaces:

```bash
# Frontend
yarn workspace @evidara/frontend dev
yarn workspace @evidara/frontend build

# Run in all workspaces
yarn workspaces foreach -A run build
```

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: AWS Lambda (Python), FastAPI
- **AI**: Claude Sonnet 4 on Amazon Bedrock
- **Database**: PostgreSQL with pgvector (RAG)
- **Infrastructure**: AWS CDK (Python)
- **PDF Generation**: WeasyPrint, python-docx

## Environment Variables

Copy the example env file and configure:

```bash
cp .env.example .env.local
```

Required variables will be documented as services are added.

## License

Confidential - Evidara Regulatory
