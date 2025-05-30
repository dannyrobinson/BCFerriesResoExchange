# BCFerriesResoExchange
Site to allow people to exchange their reservations
# Setup
1. Clone repo
2. `npm install`
3. Copy `.env.local.example` to `.env.local` and set:
   - NEXT_PUBLIC_FIREBASE_... (your Firebase config)
   - SENDGRID_API_KEY (for email notifications)
   - FROM_EMAIL (verified sender)
4. `npm run dev` to start Next.js locally

# Firebase Functions
1. `cd functions && npm install`
2. Set env:
   ```bash
   firebase functions:config:set sendgrid.key="$SENDGRID_API_KEY" sendgrid.from="$FROM_EMAIL"
   ```
3. `firebase deploy --only functions`

# Vercel Deployment
1. Push code to GitHub
2. In Vercel dashboard create a new project from GitHub
3. Add environment variables in Vercel settings:
   - NEXT_PUBLIC_FIREBASE_API_KEY, AUTH_DOMAIN, PROJECT_ID, etc.
   - SENDGRID_API_KEY, FROM_EMAIL
4. Deploy (Vercel handles build & route rewrites via `vercel.json`)