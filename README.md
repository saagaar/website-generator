# Website Generator

An AI-powered website generator for non-technical business owners. Answer a few questions about your business and get a complete, responsive website in minutes — no coding required.

## How it works

1. Select your business type
2. Answer questions about your business through a conversational wizard
3. Hit **Generate My Website** — the AI streams a full HTML/CSS/JS website in real time
4. Preview your site instantly in the browser

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI | MUI (Material UI) v9 + Tailwind CSS |
| Language | TypeScript |
| AI / LLM | Ollama (local, `llama3.2`) |
| Testing | Jest + React Testing Library |
| Component docs | Storybook |

## Architecture

Follows **Clean Architecture** (Ports & Adapters) — the domain layer has zero framework dependencies and all infrastructure is swappable.

```
Presentation  →  Application  →  Domain  ←  Infrastructure
(React/Next)      (Use Cases)   (Entities    (Ollama client,
                                 + Ports)     API adapters)
```

```
frontend/src/
├── domain/           # Pure TypeScript — entities + port interfaces
├── application/      # Use cases + validators
├── infrastructure/   # Ollama client + prompt templates
├── presentation/     # React components + hooks
└── app/              # Next.js App Router pages + API routes
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Ollama](https://ollama.com/) running locally with the `llama3.2` model

```bash
# Install and start Ollama
ollama pull llama3.2
ollama serve
```

## Getting Started

```bash
# Clone the repo
git clone https://github.com/saagaar/website-generator.git
cd website-generator/frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> Ollama must be running at `http://localhost:11434` for question generation and website generation to work.

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm test             # Run test suite
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
npm run storybook    # Start Storybook on :6006
```

## Wizard Features

- **Conversational Q&A** — static questions first, then AI-generated follow-ups tailored to your answers
- **Structured inputs** — dedicated UI for services, team members, and social links
- **Phone input** — country flag + dial code dropdown with validation
- **Color picker** — visual swatch + hex field + preset palette
- **Team photos** — upload and preview profile photos per team member
- **Validation** — email format, phone number, URL validation inline
- **Go back** — navigate to any previous question
- **Edit answers** — revisit any answered question from the review panel

## Pages

| Route | Description |
|---|---|
| `/` | Landing page + wizard |
| `/how-it-works` | Step-by-step walkthrough |
| `/examples` | Example generated sites |
| `/pricing` | Pricing tiers |
| `/faq` | Frequently asked questions |
| `/generate` | Live website preview |

## License

MIT
