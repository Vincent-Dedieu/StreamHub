This is a [Next.js](https://nextjs.org/) project bootstrapped with
[`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

```bash
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

## Tools/Features :

- Tailwind + shadcn/ui
- Clerk for authentication
- LiveKit for streaming service
- MongoDB Cloud + prisma
