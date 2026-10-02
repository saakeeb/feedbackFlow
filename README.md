# FeedbackFlow 🎯

> A quiet workplace communication platform for honest anonymous feedback, productive meetings, and team clarity.

Rewritten in **Next.js (App Router)** following the comprehensive guidelines in [`architecture.md`](./architecture.md) and [`design.md`](./design.md).

---

## 🌟 Architecture & Features

### 1. Public Marketing & SEO-First Layer
- **App Router Route Group `(marketing)`**:
  - `/` — Homepage: Quiet productivity hero, interactive workspace preview, core pillars
  - `/features` — Detailed capability breakdown
  - `/anonymous-feedback` — In-depth guide to psychological safety and architectural anonymity
  - `/meeting-notes` — Actionable framework for cutting status syncs and living notes
  - `/resources` — Public directory of operating templates and handbooks
  - `/blog` & `/blog/[slug]` — High-value editorial essays with JSON-LD Article structured data
  - `/privacy` & `/terms` — Explicit architectural privacy disclosures and terms
- **Dynamic SEO Engine**:
  - `app/sitemap.ts` — Dynamic XML sitemap generation
  - `app/robots.ts` — Search engine indexing rules (blocking private workspaces and API)
  - `app/manifest.ts` — Web application manifest
  - Canonical URLs and OpenGraph social metadata on all indexable pages

### 2. Authenticated Workplace Application
- **Route Group `(app)`**:
  - `/app` — Overview dashboard: active topics, response metrics, upcoming syncs
  - `/app/feedback` & `/app/feedback/[id]` — Feedback topics, comment streams, and anonymous submission composer
  - `/app/meetings` & `/app/meetings/[id]` — Meeting agendas, markdown notes, and actionable task checklists
  - `/app/resources` & `/app/resources/[id]` — Curated team templates and culture handbooks
  - `/app/analytics` — Engagement insights, psychological safety metrics, and topic category distribution
  - `/app/settings` — Profile management, notification preferences, and privacy safeguards
- **Public Feedback Direct Sharing**:
  - `/t/[id]` — Direct, accessible link for anonymous or identified feedback submission
- **Permanent Redirects**:
  - `/dashboard` → `/app`
  - `/signin` → `/login`
  - `/dashboard/topics` → `/app/feedback`

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, Server Components, Route Handlers)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS with custom semantic design tokens (`design.md` Quiet Productivity)
- **Backend & Auth**: Supabase (PostgreSQL, Row Level Security, SSR cookies via `@supabase/ssr`)
- **Validation**: Zod schema validation
- **Icons**: Lucide React

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Variables
Configure `.env.local` or `.env` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SITE_URL=https://feedbackflow.app
```

### 3. Run Development Server
```bash
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
pnpm build
pnpm start
```