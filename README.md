# 🎗 ISC Fund – Charity Gala Platform

**https://www.iscfund.com/**

ISC Fund is a full-stack web application built with **Next.js** and **Stripe**, created to power high-end charity events through **online auctions**, **lotteries**, and **donations**.

It was launched for the **Las Vegas Charity Gala (May 9–10, 2025)** to help raise funds through engaging and transparent digital fundraising.

---

## 🚀 Key Features

- 🧾 **Lot Catalog**: 9 charity items with type-based interactions (donation, auction, or lottery)
- 💳 **Stripe Payments**: Secure payments for donations and lottery entries
- 📤 **Auction System**: Custom bid form (no payment at bid time), stored via **webhook + n8n**
- 🎟️ **Lottery Management**: Entries tracked, winners drawn via a custom admin dashboard
- ⚙️ **Admin Interface**: Visualize payments, bids, totals raised & trigger lottery draws
- 📱 **Responsive & Elegant UI**: Tailored for both mobile and desktop, with Fast Lane Drive branding

---

## 🧱 Tech Stack

| Category        | Technologies                                   |
|----------------|------------------------------------------------|
| **Frontend**    | Next.js App Router, React, TailwindCSS         |
| **Backend**     | Edge & Server Actions, Stripe API              |
| **Automation**  | Webhooks + [n8n](https://n8n.io) workflows     |
| **Database**    | PostgreSQL via Supabase                        |
| **Dev Tools**   | Prisma, TypeScript, Zod, React Hook Form       |
| **Deployment**  | Vercel (frontend & backend API routes)         |

---

## 🧠 Architecture Highlights

- ✨ **No backend server needed**: Using Vercel’s Edge/Serverless + Supabase
- 🔄 **Decoupled Auctions**: Bids sent to n8n → Google Sheets → Admin UI (no payments triggered)
- 🧩 **Prisma ORM**: Used only for internal admin panel & data queries
- 📡 **Webhook Architecture**: Every Stripe/Lottery/Auction action is tracked via event triggers

---

## 💼 About the Project

This platform was developed in just a few weeks for a live charity gala in partnership with **Fast Lane Drive**. The goal was to enable seamless **online participation**, reduce friction in fundraising, and provide transparent tracking of donations, bids, and lottery entries.

It is now being extended into a **reusable SaaS foundation** for future charity events.

---

## 🧑‍💻 Setup Instructions

```bash
pnpm install
pnpm dev
