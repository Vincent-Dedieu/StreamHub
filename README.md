This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Tools/Features :

- Tailwind + shadcn/ui
- Clerk for authentication
- LiveKit for streaming service using OBS Studio
- MongoDB Cloud + prisma
- Stripe

## Getting Started

```bash
npm i
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Sharing localhost with ngrok to use clerk webhook(mandatory to create new users for sync clerk/mongodb):
`ngrok http --domain=profound-national-squirrel.ngrok-free.app 3000`

cmd prisma :

```bash
npx prisma generate
npx prisma db push
```

## .env file :

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
CLERK_WEBHOOK_SECRET=

DATABASE_URL=

LIVEKIT_API_URL=
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
NEXT_PUBLIC_LIVEKIT_WS_URL=

UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```
