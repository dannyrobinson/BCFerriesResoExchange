# BCFerriesResoExchange
Site to allow people to exchange their reservations
# Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/your-org/bcferries-exchange.git
   cd bcferries-exchange
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy and edit your environment variables:
   ```bash
   cp .env.local.example .env.local
   ```
   Fill in:
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `SENDGRID_API_KEY`
   - `FROM_EMAIL`
4. Run locally:
   ```bash
   npm run dev
   ```

# Firebase Functions

1. Navigate and install:
   ```bash
   cd functions
   npm install
   ```
2. Set Function config:
   ```bash
   firebase functions:config:set \
     sendgrid.key="$SENDGRID_API_KEY" \
     sendgrid.from="$FROM_EMAIL"
   ```
3. Deploy Functions only:
   ```bash
   firebase deploy --only functions
   ```

# Vercel Deployment

1. Push to GitHub and import into Vercel.
2. In Vercel project settings, add these Environment Variables under "Production":
   - `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, etc.
   - `SENDGRID_API_KEY`, `FROM_EMAIL`
3. Deploy. Vercel will automatically run `npm run build`.