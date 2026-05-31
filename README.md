# Bad Decision AI — Frontend

A Next.js 16 + React 19 + Tailwind CSS v4 + shadcn/ui lead-generation SaaS frontend.

## Deploy to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bad-decision-frontend.git
git push -u origin main
```

### 2. Import to Vercel
1. Go to [vercel.com](https://vercel.com) → Add New Project
2. Import your GitHub repo
3. Framework Preset: **Next.js**
4. Root Directory: `./` (default)
5. Build Command: `next build` (default)
6. Click **Deploy**

### 3. Add Environment Variables
In Vercel Dashboard → Your Project → Settings → Environment Variables, add ALL of the following:

| Variable Name | Value | Type |
|--------------|-------|------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_...` or `pk_live_...` | **Plaintext** |
| `CLERK_SECRET_KEY` | `sk_test_...` or `sk_live_...` | **Plaintext** |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/signin` | **Plaintext** |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/signup` | **Plaintext** |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | `/dashboard` | **Plaintext** |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | `/dashboard` | **Plaintext** |
| `NEXT_PUBLIC_SUPABASE_URL` | `https://your-project.supabase.co` | **Plaintext** |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJ...` (anon/public key) | **Plaintext** |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJ...` (service_role key) | **Plaintext** |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | `pk_test_...` or `pk_live_...` | **Plaintext** |
| `PAYSTACK_SECRET_KEY` | `sk_test_...` or `sk_live_...` | **Plaintext** |
| `NEXT_PUBLIC_APP_URL` | `https://bad-decision-ai.vercel.app` | **Plaintext** |

> **CRITICAL:** Mark `CLERK_SECRET_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, and `PAYSTACK_SECRET_KEY` as server-side only by NOT prefixing them with `NEXT_PUBLIC_`. Vercel keeps these secure.

### 4. Configure Clerk Webhook
In Clerk Dashboard → Webhooks → Add Endpoint:
- **URL**: `https://your-app.vercel.app/api/webhooks/clerk`
- **Events**: `user.created`
- Copy the **Signing Secret** → add as `CLERK_WEBHOOK_SECRET` in Vercel env vars (optional but recommended for verification)

### 5. Configure Paystack Webhook
In Paystack Dashboard → Settings → API Keys & Webhooks:
- **Webhook URL**: `https://your-app.vercel.app/api/webhooks/paystack`
- **Events**: `charge.success`

### 6. Configure Supabase
1. In Supabase Dashboard → Authentication → URL Configuration:
   - **Site URL**: `https://your-app.vercel.app`
   - **Redirect URLs**: `https://your-app.vercel.app/**`
2. Enable Row Level Security (RLS) on all tables
3. Run the SQL migration (already done per worklog)

## Local Development
```bash
# 1. Clone
git clone https://github.com/YOUR_USERNAME/bad-decision-frontend.git
cd bad-decision-frontend

# 2. Install dependencies
npm install
# or
bun install

# 3. Copy environment variables
cp .env.example .env.local
# Fill in your actual keys in .env.local

# 4. Run dev server
npm run dev
# or
bun dev
```

## Project Structure
```
src/
  app/
    page.tsx              # Main app shell (view router)
    layout.tsx            # Root layout with Inter font + metadata
    globals.css           # Design system (colors, animations)
    api/
      coins/route.ts      # Coin balance API (deduct/add)
      webhooks/
        clerk/route.ts    # Auto-create profile on sign-up
        paystack/route.ts # Add coins after payment
  components/
    landing.tsx           # Sales page
    pricing.tsx           # Geo-routed pricing (NGN/USD)
    auth.tsx              # Sign in / Sign up
    dashboard.tsx         # Main workspace (search, results, coins)
    faq.tsx               # Objection killer FAQ
    contact.tsx           # Contact form
    ui/                   # 45+ shadcn/ui components
  lib/
    supabase.ts           # Supabase client (anon + service role)
    csv-shield.ts         # CSV export with phone number protection
    pricing.ts            # Pricing tier config
    utils.ts              # cn() helper
    database.types.ts     # Supabase TypeScript types
  stores/
    app-store.ts          # Zustand global state
public/
  logo.svg
  robots.txt
```

## Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **State**: Zustand
- **Auth**: Clerk
- **Database**: Supabase (PostgreSQL)
- **Payments**: Paystack
- **AI**: DeepSeek (via backend)

## Notes
- The app uses **client-side view routing** (not Next.js page routes) for the SPA experience inside `page.tsx`.
- All API routes are in `app/api/` and run server-side.
- The backend (Python FastAPI) is separate and should be deployed to Render. Its URL should be set as `NEXT_PUBLIC_API_URL` if the frontend calls it directly.
