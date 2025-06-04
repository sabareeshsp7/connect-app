
📱 Real-Time Chat App (Next.js + React + Tailwind + ShadcnUI)

A modern, responsive real-time chat application built with Next.js, React, TailwindCSS, and ShadcnUI. Features include real-time messaging, friend management, group chats, authentication, and seamless UI across devices.

## 📚 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Real-Time Chat](#real-time-chat)
- [Group Chat](#group-chat)
- [Responsive UI](#responsive-ui)
- [Message Features](#message-features)
- [Advanced Features](#advanced-features)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [License](#license)

## 🚀 Features

🔐 Secure Authentication with Clerk

💬 Real-time Chat (1:1 and group)

🧑‍🤝‍🧑 Friend Requests with accept/deny flow

🌓 Dark Mode support with theme toggling

📱 Fully Responsive (Mobile/Desktop)

🧾 Unread/Seen Message Indicators

🧠 Intelligent Message Rendering (conditional formatting, sender alignment)

📞 Audio/Video Calls

📂 File Uploads (images, videos, PDFs)

🌐 Deployed on Vercel with custom domain
## ⚙️ Tech Stack

| Category         | Stack Used                                       |
| ---------------- | ------------------------------------------------ |
| Frontend         | Next.js, React, Tailwind CSS, ShadcnUI           |
| Backend          | Convex DB, Clerk, custom REST APIs               |
| Auth             | Clerk + JWT + Middleware                         |
| Forms/Validation | React Hook Form, Zod                             |
| Realtime & DB    | Convex                                           |
| Dev Tools        | TypeScript, ESLint, Environment Variables (.env) |
| Deployment       | Vercel, GitHub Integration                       |



## 🛠 Getting Started

Follow these steps to set up and run the project locally:

1. 📥 Clone the Repository

```bash
git clone https://github.com/sabareeshsp7/connect-app.git

cd connect-app
```

2. 📦 Install Dependencies
```bash
npm install
```

3. ⚙️ Configure Environment Variables
Create a .env.local file and add your Clerk and Convex credentials:
```bash
cp .env.example .env.local
```

Then open .env.local and fill in the required values, like:

```bash
CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CONVEX_URL=your-convex-url
```

4. 🚀 Start the Development Server
```bash
npm run dev
```
Once the server is running, open your browser and go to:
```bash
http://localhost:3000
```
## 🔑 Authentication

Implemented using Clerk with Google Sign-in

Middleware protection for authenticated routes

JWT template used for secure Convex backend communication
## 📡 Real-Time Chat

Conversations saved in Convex DB

Conditional layout based on conversation ID

Loading/empty states

Message validation using Zod

Live updates via useQuery from Convex
## 👥 Group Chat

Group creation with friend selection

Validation for group name and at least 1 member

Deletion/leave features

Separate UI for group vs direct messages

Seen/read tracking per group
## 📱 Responsive UI

✅ Mobile View:

Bottom navbar

Full-screen conversations

✅ Desktop View:

Sidebar with navigation

Conversation preview with avatars

Built with TailwindCSS and ShadcnUI’s flexible components
## 💬 Message Features

Conditional message formatting (left/right alignment)

Support for:

Seen by multiple users

Last message display

Smart rendering to avoid UI clutter

Typing input with validation

Toasts for real-time feedback
## 🧠 Advanced Features

🔁 Seen/Unseen message badges

📷 Avatar management with fallbacks

📨 Webhook integration for user management

☁️ Upload support (Images, PDFs, Videos)

📞 Audio/Video calling architecture (state-managed)
## 🚀 Deployment

1. Deploy to Vercel:

Connect repo

Add environment variables

Use npm run build & vercel --prod

2. Configure custom domain:

Add DNS settings via Vercel

3. 🎯 Live updates with GitHub push → Vercel