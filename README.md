# ISPANI Frontend

Instant-job matching engine for South Africa.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: Supabase SSR

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file with the following:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure
- `src/app`: Next.js pages and routes.
- `src/utils/supabase`: Supabase client and server utilities.
- `src/middleware.ts`: Authentication and session management middleware.
