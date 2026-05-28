# Website Generation Tool — Next.js (Clean Architecture)

## Context
A website generation tool for non-technical business owners. Built with Next.js, MUI, Tailwind (layout only), Jest, and Storybook. Follows Clean Architecture (Ports & Adapters): domain is pure TypeScript with zero framework dependencies; infrastructure adapters are swappable; presentation is thin React components wired via hooks to use cases.

---

## Setup

```bash
cd "/Volumes/Files & Storage/codes/python/AI Agents"
git init
mkdir frontend && cd frontend

npx create-next-app@latest . \
  --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

npm install @mui/material @mui/icons-material @emotion/react @emotion/styled @emotion/cache
npm install -D jest jest-environment-jsdom ts-jest \
  @testing-library/react @testing-library/jest-dom @testing-library/user-event \
  @types/jest identity-obj-proxy
npx storybook@latest init
```

---

## Clean Architecture Layers

```
Presentation  →  Application  →  Domain  ←  Infrastructure
(React/Next)      (Use Cases)   (Entities    (Ollama client,
                                 + Ports)     API adapters)
```

**Rules:**
- Domain has **zero** external imports — pure TypeScript
- Application imports Domain only
- Infrastructure imports Domain (implements its ports)
- Presentation imports Application (via hooks) and never calls Infrastructure directly
- Next.js `app/` pages are thin shells; `app/api/` routes are thin adapters

---

## Full Folder Structure

```
frontend/
├── src/
│   │
│   ├── domain/                          # Layer 1 — pure business logic
│   │   ├── entities/
│   │   │   ├── Suggestion.ts            # { id, text }
│   │   │   ├── BusinessInfo.ts          # All intake form fields
│   │   │   └── GeneratedWebsite.ts      # { html, generatedAt, businessName }
│   │   ├── ports/                       # Interfaces (abstract boundaries)
│   │   │   ├── ISuggestionRepository.ts # getSuggestions(input): AsyncIterable<Suggestion>
│   │   │   └── IWebsiteGenerator.ts     # generate(info): AsyncIterable<string>
│   │   └── errors/
│   │       └── DomainError.ts           # Base error class
│   │
│   ├── application/                     # Layer 2 — use cases
│   │   ├── useCases/
│   │   │   ├── GetSuggestionsUseCase.ts # Accepts ISuggestionRepository (injected)
│   │   │   └── GenerateWebsiteUseCase.ts
│   │   └── validators/
│   │       └── BusinessInfoValidator.ts # Validates intake fields, returns errors[]
│   │
│   ├── infrastructure/                  # Layer 3 — external adapters
│   │   ├── ollama/
│   │   │   ├── OllamaClient.ts          # Raw fetch to http://localhost:11434
│   │   │   ├── OllamaSuggestionRepository.ts  # Implements ISuggestionRepository
│   │   │   └── OllamaWebsiteGenerator.ts      # Implements IWebsiteGenerator
│   │   └── prompts/
│   │       ├── suggestionPrompt.ts      # System + user prompt for suggestions
│   │       └── websitePrompt.ts         # System + user prompt for site generation
│   │
│   ├── presentation/                    # Layer 4 — React UI
│   │   ├── hooks/
│   │   │   ├── useSuggestions.ts        # Calls GetSuggestionsUseCase, manages state
│   │   │   ├── useDebounce.ts           # 300ms debounce utility
│   │   │   └── useKeyboardNav.ts        # ↑↓ Enter Esc for dropdown
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── Footer.tsx
│   │   │   ├── landing/
│   │   │   │   ├── HeroSection.tsx
│   │   │   │   ├── TrustSection.tsx
│   │   │   │   ├── HowItWorksSection.tsx
│   │   │   │   ├── ExamplesSection.tsx
│   │   │   │   ├── TestimonialsSection.tsx
│   │   │   │   ├── FaqSection.tsx
│   │   │   │   └── CtaSection.tsx
│   │   │   └── ui/
│   │   │       ├── PillButton.tsx
│   │   │       ├── SearchBar.tsx        # Uses useSuggestions hook
│   │   │       ├── SuggestionDropdown.tsx
│   │   │       ├── SuggestionItem.tsx
│   │   │       └── SectionHeading.tsx
│   │   └── theme/
│   │       └── theme.ts                 # MUI theme
│   │
│   └── app/                             # Next.js App Router (thin shell)
│       ├── layout.tsx                   # ThemeProvider + CssBaseline
│       ├── page.tsx                     # Renders landing sections
│       ├── how-it-works/page.tsx
│       ├── examples/page.tsx
│       ├── pricing/page.tsx
│       ├── faq/page.tsx
│       ├── generate/page.tsx
│       ├── globals.css
│       └── api/
│           └── suggest/
│               └── route.ts             # Thin adapter: req → use case → stream
│
├── __tests__/
│   ├── domain/
│   │   ├── BusinessInfoValidator.test.ts
│   │   └── entities.test.ts
│   ├── application/
│   │   ├── GetSuggestionsUseCase.test.ts
│   │   └── GenerateWebsiteUseCase.test.ts
│   ├── infrastructure/
│   │   └── OllamaSuggestionRepository.test.ts
│   ├── presentation/
│   │   ├── hooks/
│   │   │   └── useSuggestions.test.ts
│   │   └── components/
│   │       ├── SearchBar.test.tsx
│   │       ├── SuggestionDropdown.test.tsx
│   │       ├── Navbar.test.tsx
│   │       ├── PillButton.test.tsx
│   │       ├── FaqSection.test.tsx
│   │       └── PricingCards.test.tsx
│   └── api/
│       └── suggest.test.ts
│
└── .storybook/
    ├── main.ts
    └── preview.ts                       # MUI ThemeProvider decorator
```

---

## Domain Layer

### entities/Suggestion.ts
```ts
export interface Suggestion {
  id: string;
  text: string;
}
```

### entities/BusinessInfo.ts
```ts
export interface BusinessInfo {
  name: string; tagline: string; industry: string;
  mission: string; vision: string; goals: string;
  story: string; problemSolved: string; uvp: string;
  audience: string;
  address: string; phone: string; email: string;
  socialLinks: Record<string, string>;
  team: { name: string; role: string }[];
  testimonials: { client: string; quote: string }[];
  accreditations: string[];
  services: { name: string; description: string }[];
  galleryDescriptions: string[];
  colorTheme: string; fontStyle: string; aesthetic: string;
  pageType: 'single-page' | 'multi-page';
  sections: string[];
}
```

### ports/ISuggestionRepository.ts
```ts
import { Suggestion } from '../entities/Suggestion';
export interface ISuggestionRepository {
  getSuggestions(input: string): AsyncIterable<Suggestion>;
}
```

---

## Application Layer

### useCases/GetSuggestionsUseCase.ts
```ts
export class GetSuggestionsUseCase {
  constructor(private repo: ISuggestionRepository) {}
  async *execute(input: string): AsyncIterable<Suggestion> {
    if (!input.trim()) return;
    yield* this.repo.getSuggestions(input);
  }
}
```
- Constructor injection — no hardcoded Ollama dependency
- Easy to mock in tests

### validators/BusinessInfoValidator.ts
```ts
export function validateBusinessInfo(info: Partial<BusinessInfo>): string[] {
  const errors: string[] = [];
  if (!info.name?.trim()) errors.push('Business name is required');
  if (!info.industry?.trim()) errors.push('Industry is required');
  if (!info.mission?.trim()) errors.push('Mission statement is required');
  return errors;
}
```

---

## Infrastructure Layer

### ollama/OllamaClient.ts
```ts
// Raw streaming fetch to Ollama REST API
// Returns AsyncIterable<string> of text chunks
// The only file that knows about http://localhost:11434
```

### ollama/OllamaSuggestionRepository.ts
```ts
// Implements ISuggestionRepository
// Calls OllamaClient with suggestionPrompt
// Parses streamed lines into Suggestion objects
```

### prompts/suggestionPrompt.ts
```ts
export const SUGGESTION_SYSTEM_PROMPT = `
You are helping a non-technical business owner describe what they need.
Given their partial input, return exactly 4 short natural-language
website intent suggestions (one per line, no numbering).
Example: "I run a dental clinic and need a professional website."
Keep suggestions warm, simple, and business-focused.
`.trim();
```

### prompts/websitePrompt.ts
```ts
// System prompt: output ONLY raw HTML, Tailwind CDN, no lorem ipsum, responsive
// User prompt: structured BusinessInfo data formatted as labeled sections
```

---

## Presentation Layer

### hooks/useSuggestions.ts
```ts
// Wires up GetSuggestionsUseCase with OllamaSuggestionRepository
// Manages: suggestions[], isLoading, error
// Calls use case on debounced input change
// Returns { suggestions, isLoading, error, fetchSuggestions }
```

### hooks/useKeyboardNav.ts
```ts
// Manages highlightedIndex state
// Handles ArrowUp, ArrowDown (cycle through items), Enter (select), Escape (close)
// Returns { highlightedIndex, handleKeyDown, resetIndex }
```

---

## API Route — Thin Adapter

### app/api/suggest/route.ts
```ts
// POST handler — only responsibility: parse request, call use case, stream response
export async function POST(req: Request) {
  const { input } = await req.json();
  if (!input?.trim()) return new Response('Missing input', { status: 400 });

  const repo = new OllamaSuggestionRepository();
  const useCase = new GetSuggestionsUseCase(repo);

  const stream = new ReadableStream({ ... }); // pipes useCase.execute(input)
  return new Response(stream, { headers: { 'Content-Type': 'text/plain' } });
}
```

---

## MUI Theme (presentation/theme/theme.ts)

```ts
palette:    { primary: { main: '#3B9EDB', dark: '#1A6FA8' },
              background: { default: '#F0F8FF', paper: '#E1F0FA' } }
typography: { fontFamily: '"Inter", sans-serif', h1: { fontWeight: 300 } }
shape:      { borderRadius: 12 }
components: { MuiButton: { styleOverrides: { root: { borderRadius: '50px' } } } }
```

---

## Jest Test Coverage (by layer)

### Domain tests
- `entities.test.ts` — entity shapes match interface (type-level checks)
- `BusinessInfoValidator.test.ts` — missing name → error; all fields valid → []; edge cases (whitespace-only)

### Application tests
- `GetSuggestionsUseCase.test.ts` — mock `ISuggestionRepository`; empty input returns nothing; non-empty yields suggestions from mock
- `GenerateWebsiteUseCase.test.ts` — mock `IWebsiteGenerator`; streams chunks; calls validator before generating

### Infrastructure tests
- `OllamaSuggestionRepository.test.ts` — mock `OllamaClient` fetch; parses newline-delimited suggestions correctly; handles empty response

### Presentation tests
- `useSuggestions.test.ts` — renders with `renderHook`; debounce fires after 300ms; suggestions state updates on stream
- `SearchBar.test.tsx` — renders placeholder; typing triggers fetch after debounce; dropdown appears; keyboard nav works; Escape closes
- `SuggestionDropdown.test.tsx` — renders N items; click calls onSelect; highlighted row has correct bg
- `Navbar.test.tsx` — all nav links present; mobile hamburger shows/hides drawer
- `PillButton.test.tsx` — contained vs outlined styles; disabled state; href renders as link
- `FaqSection.test.tsx` — 5 items; click to expand; click again to collapse
- `PricingCards.test.tsx` — 3 cards; Pro has badge; each has CTA button

### API tests
- `suggest.test.ts` — 400 on missing input; mocked use case streams suggestions; correct Content-Type header

---

## Storybook

`.storybook/preview.ts` wraps all stories in `<ThemeProvider theme={theme}><CssBaseline />`.

Stories for every `ui/` component:
- **PillButton**: contained, outlined, ghost, disabled, with icon
- **SearchBar**: empty, loading, with suggestions, keyboard focus
- **SuggestionDropdown**: empty, 3 items, 2nd item highlighted
- **SectionHeading**: h1/h2, centered/left, with/without subtitle

---

## Pages Summary

| Route | Content |
|-------|---------|
| `/` | 7 landing sections (Hero → Trust → HowItWorks → Examples → Testimonials → FAQ → CTA) |
| `/how-it-works` | MUI Stepper, 3 steps, CTA |
| `/examples` | Grid of 6 example cards with business type + preview placeholder |
| `/pricing` | 3-tier cards; Pro highlighted with sky-accent border |
| `/faq` | MUI Accordion, 5 Q&As |
| `/generate` | "Coming soon" placeholder with back button |

---

## npm Scripts

```json
"dev":             "next dev",
"build":           "next build",
"test":            "jest --watchAll=false",
"test:watch":      "jest --watch",
"test:coverage":   "jest --coverage",
"storybook":       "storybook dev -p 6006",
"build-storybook": "storybook build"
```

---

## Verification

1. `npm run dev` → `:3000`, sky-blue bg, MUI renders
2. `npm test` → all layers pass, 0 failures
3. `npm run storybook` → `:6006`, all stories visible
4. Autocomplete: type → 300ms → suggestions stream in with stagger
5. Keyboard nav (↑↓ Enter Esc) on dropdown
6. All 5 nav links + mobile drawer work
7. `/pricing` Pro card highlighted; `/faq` accordion toggles
8. Responsive: 375px / 768px / 1440px — no overflow
