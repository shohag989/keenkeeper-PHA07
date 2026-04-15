<<<<<<< HEAD
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
=======
# 🤝 KeenKeeper — Keep Your Friendships Alive

KeenKeeper is a friendship management web app that helps you stay connected with the people who matter most. Track when you last reached out, log interactions, and never let an important friendship go cold.

---

## 🚀 Live Demo

🔗 

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [Tailwind CSS](https://tailwindcss.com/) | Utility-first styling |
| [Recharts](https://recharts.org/) | Pie chart for analytics |
| [React Hot Toast](https://react-hot-toast.com/) | Toast notifications |
| [Font Awesome](https://fontawesome.com/) | Icons throughout the UI |
| [React Context API](https://react.dev/reference/react/createContext) | Global timeline state management |

---

## ✨ Key Features

- **📋 Friend Dashboard** — View all your friends as cards with their contact status (On-Track, Almost Due, Overdue) highlighted in color
- **👤 Friend Detail Page** — See full profile info, contact stats, and log interactions (Call, Text, Video) with one click
- **📜 Timeline** — A running history of all your interactions, filterable by type (Call / Text / Video)
- **📊 Friendship Analytics** — A pie chart showing the breakdown of your interaction types
- **🔔 Toast Notifications** — Instant feedback whenever you log a new interaction
- **📱 Fully Responsive** — Works beautifully on mobile, tablet, and desktop

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.js              # Root layout with Navbar & Footer
│   ├── page.js                # Home page
│   ├── not-found.js           # 404 page
│   ├── friends/[id]/page.js   # Friend detail page (dynamic route)
│   ├── timeline/page.js       # Timeline page
│   └── stats/page.js          # Analytics page
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── FriendCard.jsx
│   ├── SummaryCards.jsx
│   ├── StatCard.jsx
│   ├── TimelineEntry.jsx
│   └── ToastProvider.jsx
├── context/
│   └── TimelineContext.js     # Global state for timeline entries
└── data/
    └── friends.json           # Friend profile data
```

---

## 🏃 Getting Started Locally

**1. Clone the repository**
```bash
git clone https://github.com/your-username/keenkeeper.git
cd keenkeeper
```

**2. Install dependencies**
```bash
npm install
```

**3. Run the development server**
```bash
npm run dev
```

**4. Open in browser**
```
http://localhost:3000
```

---

## 📄 Pages Overview

| Page | Route | Description |
|---|---|---|
| Home | `/` | Banner, summary cards, and all friend cards |
| Friend Detail | `/friends/[id]` | Full profile, stats, and check-in buttons |
| Timeline | `/timeline` | Log of all interactions with filters |
| Stats | `/stats` | Pie chart analytics of interaction types |
| 404 | `*` | Custom not-found page |

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@your-username](https://github.com/your-username)
- Email: your@email.com

---

## 📜 License

This project was built as part of the **Programming Hero** Web Development course — Assignment 6.
>>>>>>> 741bfbe2f029c6383a2c1cf68c6996719ae2e333
