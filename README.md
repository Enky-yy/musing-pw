# 🚀 Harsh Shah — Portfolio & Personal Blog

A modern, high-performance portfolio and personal blog built with **Next.js**, **Tailwind CSS**, **Prisma**, **PostgreSQL**, and **Framer Motion**.

[![Next.js](https://img.shields.io/badge/Next.js-13-black?logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- ⚡ **Next.js & React**: Ultra-fast static generation and server-side rendering.
- 🎵 **Live Spotify Integration**: Real-time "Now Playing" widget and top played songs dashboard powered by Spotify Web API.
- 📊 **Live Stats Dashboard**: Real-time stats for GitHub repositories, stars, followers, and site views.
- 📖 **Interactive Guestbook**: Visitors can leave messages using NextAuth.js authentication and Prisma ORM.
- 📝 **MDX Blog & Snippets**: Markdown + JSX support for tech blogs, code snippets, and syntax highlighting.
- 🌓 **Dark & Light Mode**: Built-in theme switcher with smooth Framer Motion animations.
- 📱 **Fully Responsive**: Mobile-first design with a responsive menu drawer and clean layout.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Database & ORM**: [Prisma](https://www.prisma.io/) with **PostgreSQL**
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Integrations**: Spotify Web API, GitHub REST API, Giscus

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following keys:

```ini
# Database (PostgreSQL)
DATABASE_URL="postgres://username:password@host:port/dbname?sslmode=require"

# NextAuth Authentication
NEXTAUTH_URL="http://localhost:3000"
SECRET="your_nextauth_secret_key"
OAUTH_CLIENT_KEY="your_github_oauth_client_id"
OAUTH_CLIENT_SECRET="your_github_oauth_client_secret"

# Spotify API
SPOTIFY_CLIENT_ID="your_spotify_client_id"
SPOTIFY_CLIENT_SECRET="your_spotify_client_secret"
SPOTIFY_REFRESH_TOKEN="your_spotify_refresh_token"
```

---

## 🚀 Quick Start (Local Development)

### 1. Clone the Repository

```bash
git clone https://github.com/Enky-yy/musing-pw.git
cd musing-pw
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database Schema

```bash
npx prisma generate
npx prisma db push
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📦 Deployment

### Deploying on Vercel (Recommended)

1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```
2. Import the repository on [Vercel](https://vercel.com).
3. Add your environment variables under **Project Settings** > **Environment Variables**.
4. Vercel will automatically build and deploy your application.

### Deploying on Render

1. Create a new **Web Service** on [Render](https://render.com).
2. Set the following build settings:
   - **Build Command**: `npm install && npx prisma generate && npm run build`
   - **Start Command**: `npm run start`
3. Add your environment variables in the Render Dashboard.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for more details.

---

**Crafted with ❤️ by [Harsh Shah](https://harsh-shah.me)**
