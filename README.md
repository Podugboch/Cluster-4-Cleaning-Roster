# Cluster 4 Cleaning Roster 🧹✨

<div align="center">

**Automated Facility Duty Rotation & Real-Time Roster Engine**

[![Framework](https://img.shields.io/badge/Framework-TanStack%20Start%20%7C%20React%2019-FF4154?style=flat-square&logo=react)](https://tanstack.com/start)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Styling-Tailwind%20CSS%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployment](https://img.shields.io/badge/Deploy-Cloudflare%20Workers-F38020?style=flat-square&logo=cloudflare)](https://workers.cloudflare.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**Cluster 4 Cleaning Roster** is an automated duty scheduling and tracking application engineered for collaborative learning workspaces, developer clusters, and educational cohorts. It replaces error-prone spreadsheets and manual task tracking with a synchronized timeline, live reactive countdown timers, and clear visual state management.

---

## ✨ Key Features

- 🔄 **Deterministic Rotation Engine**: Automatically rotates duty across 10 tables on bi-weekly cleaning sessions (every Monday and Thursday at 00:00 local time) without manual intervention.
- ⏱️ **Sub-Second Reactive Countdown**: Live sticky header displays days, hours, minutes, and seconds remaining until the next scheduled cleaning session.
- 🏷️ **Dynamic Table Status State Machine**: Tables are automatically categorized and badged with real-time states:
  - `onDuty`: Table currently active for cleaning duty.
  - `next`: Upcoming table in the queue for the next scheduled session.
  - `done`: Completed tables from the current rotation cycle.
  - `upcoming`: Tables queued for future sessions.
- ⚡ **Zero-Latency Edge Architecture**: Powered by **TanStack Start** and **TanStack Router**, optimized for instant hydration and serverless edge delivery via Cloudflare Workers.
- 🎨 **Modern Glassmorphic UI**: Polished Tailwind CSS 4 design featuring accessible Radix UI primitives, Lucide icons, and responsive mobile layout.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | TanStack Start (Full-stack React Framework) & TanStack Router |
| **Frontend** | React 19, TypeScript 5.8 |
| **Styling & UI** | Tailwind CSS 4, Radix UI primitives, Lucide Icons, Embla Carousel |
| **State & Date Utils** | React Hooks (`useNow`, `useMemo`), date-fns, Zod |
| **Build & Edge Runtime** | Vite 7, Wrangler, Cloudflare Workers, Bun |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ or [Bun](https://bun.sh) installed.

### Installation
```bash
git clone https://github.com/Podugboch/Cluster-4-Cleaning-Roster.git
cd Cluster-4-Cleaning-Roster
bun install # or npm install
```

### Local Development
```bash
bun dev # or npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
bun run build # or npm run build
```

### Deploy to Cloudflare Workers
```bash
npx wrangler deploy
```

---

## 📄 License

MIT License • © 2026 Patrick Sean Odugboche
