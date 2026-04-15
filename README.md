# KeenKeeper

KeenKeeper is a small relationship tracker that helps you keep meaningful connections “on track”. Browse your friends, view details, log quick check-ins (Call/Text/Video), and see interaction analytics.

## Live pages
- **Home**: friend summary + friend list
- **Friend Details**: stats + relationship goal + quick check-in buttons
- **Timeline**: interaction history + filter
- **Stats**: pie chart of interaction types

## Tech stack
- **Next.js (App Router)**
- **React**
- **Tailwind CSS**
- **Recharts**
- **FontAwesome**

## Key features
- **Friend cards from JSON** with status + tags, and details page per friend
- **Quick Check-In** buttons that add entries to a shared **Timeline** and show a toast
- **Friendship Analytics** pie chart based on logged interactions

## Requirements coverage
- **Responsive layout** on mobile/tablet/desktop (desktop matches Figma spacing)
- **404 page** for unknown routes
- **Loading state** on Home while friend data is fetched

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.
