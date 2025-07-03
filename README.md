
# Connect - Real-Time Chat Application

A modern, feature-rich real-time chat application built with Next.js 14, React, TypeScript, and cutting-edge web technologies. Connect enables seamless communication through instant messaging, friend management, grmultimedia sharing with a beautiful, responsive interface.

## 🌟 Features

### 🔐 Authentication & Security
- **Secure Authentication** with Clerk integration
- **Protected Routes** with middleware-based access control
- **JWT-based** secure communication with backend
- **Google Sign-in** support

### 💬 Real-Time Communication
- **Instant Messaging** with real-time updates
- **Group Conversations** with member management
- **Direct Messages** between friends
- **Message Status** indicators (sent, delivered, read)
- **Typing Indicators** for active conversations
- **Emoji Support** with built-in emoji picker

### � Social Features
- **Friend System** with request/accept flow
- **User Discovery** by email address
- **Friend Management** (add, remove, block)
- **Group Creation** with friend selection
- **Conversation Management** (leave, delete groups)

### 📱 User Experience
- **Responsive Design** optimized for mobile and desktop
- **Dark/Light Theme** with system preference detection
- **PWA Support** for native app-like experience
- **Offline Capability** with service worker
- **Toast Notifications** for user feedback

### � Rich Media Support
- **File Uploads** (images, videos, PDFs, audio)
- **Image Preview** with full-screen view
- **Video Playback** with controls
- **File Download** capabilities
- **Drag & Drop** file uploads

### 🎥 Communication Features
- **Voice Calls** with LiveKit integration
- **Video Calls** with screen sharing support
- **Call Room** management
- **Real-time Audio/Video** streaming
## 🛠 Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives

### Backend & Database
- **Convex** - Real-time database and backend functions
- **Clerk** - Authentication and user management
- **UploadThing** - File upload service
- **LiveKit** - Real-time video/audio infrastructure

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Date-fns** - Date utilities



## � Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-username/connect-app.git
cd connect-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url
CONVEX_DEPLOYMENT=your_convex_deployment

# UploadThing
UPLOADTHING_SECRET=your_uploadthing_secret
UPLOADTHING_APP_ID=your_uploadthing_app_id

# LiveKit (Optional for video calls)
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
NEXT_PUBLIC_LIVEKIT_URL=your_livekit_url
```

4. **Set up Convex**
```bash
npx convex dev
```

5. **Start the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to `http://localhost:3000`
## � Project Structure

```
connect-app/
├── app/                          # Next.js App Router
│   ├── (root)/                   # Protected routes
│   │   ├── conversations/        # Chat interface
│   │   ├── friends/             # Friend management
│   │   └── layout.tsx           # Layout with sidebar
│   ├── api/                     # API routes
│   │   └── uploadthing/         # File upload endpoints
│   ├── globals.css              # Global styles
│   └── layout.tsx               # Root layout
├── components/                   # Reusable components
│   ├── shared/                  # Shared components
│   │   ├── conversation/        # Chat components
│   │   ├── item-list/          # List components
│   │   └── sidebar/            # Navigation components
│   └── ui/                     # UI components (Shadcn/UI)
├── convex/                      # Convex backend
│   ├── schema.ts               # Database schema
│   ├── auth.config.ts          # Authentication config
│   ├── conversations.ts        # Conversation queries
│   ├── messages.ts            # Message queries
│   ├── friends.ts             # Friend management
│   └── requests.ts            # Friend requests
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions
├── providers/                  # React context providers
└── public/                     # Static assets
```

## 🎯 Key Features Deep Dive

### Real-Time Messaging
- Messages are instantly synchronized across all connected clients
- Optimistic updates for smooth user experience
- Message persistence with Convex database
- Support for text, emojis, and file attachments

### Friend Management
- Send friend requests by email address
- Accept or decline incoming requests
- View all friends in organized lists
- Remove friends with confirmation dialogs

### Group Conversations
- Create group chats with multiple friends
- Set group names and manage members
- Leave groups or delete (admin only)
- Group-specific message threads

### File Sharing
- Upload images, videos, PDFs, and audio files
- Drag-and-drop interface for easy uploads
- File preview with download options
- Secure file storage with UploadThing

### Responsive Design
- Mobile-first approach with adaptive layouts
- Touch-friendly interface for mobile devices
- Desktop optimization with sidebar navigation
- Consistent experience across all screen sizes

## 🔧 Configuration

### Clerk Authentication
1. Create a Clerk account at [clerk.com](https://clerk.com)
2. Set up your application
3. Configure OAuth providers (Google, GitHub, etc.)
4. Add your keys to `.env.local`

### Convex Database
1. Create a Convex account at [convex.dev](https://convex.dev)
2. Initialize your project with `npx convex dev`
3. Deploy your functions with `npx convex deploy`

### UploadThing Setup
1. Create an account at [uploadthing.com](https://uploadthing.com)
2. Create a new app and get your API keys
3. Configure file upload settings

## 🚀 Deployment

### Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy with automatic builds on push

### Production Considerations
- Set up proper error monitoring
- Configure CDN for static assets
- Set up backup strategies for data
- Monitor performance and optimize

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for authentication services
- [Convex](https://convex.dev/) for real-time database
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [LiveKit](https://livekit.io/) for video/audio capabilities

## 📞 Support

If you have any questions or need help with setup, please:
- Check the [documentation](docs/)
- Open an [issue](https://github.com/your-username/connect-app/issues)
- Join our [community discussions](https://github.com/your-username/connect-app/discussions)

---

Built with ❤️ by the Connect team


## 📱 Responsive UI

✅ Mobile View:

Bottom navbar

Full-screen conversations

✅ Desktop View:

Sidebar with navigation

Conversation preview with avatars

Built with TailwindCSS and ShadcnUI’s flexible components



