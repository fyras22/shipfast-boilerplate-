# ShipFast Boilerplate

A high-performance, production-ready Next.js 14 boilerplate with App Router, MongoDB, NextAuth, TypeScript, and DaisyUI.

![ShipFast Boilerplate](https://via.placeholder.com/1200x630/0ea5e9/FFFFFF?text=ShipFast+Boilerplate)

## Features

- ⚡ **Next.js 14+** with App Router for optimal performance
- 🔒 **NextAuth v5** with JWT sessions and MongoDB adapter
- 🔐 **Security-first** approach with middleware, rate limiting, and encryption
- 📱 **Mobile-first** responsive design with TailwindCSS and DaisyUI
- 🌙 **Dark mode** support with theme provider
- 📊 **Performance monitoring** with Vercel Analytics and Speed Insights
- 🧩 **Component architecture** following best practices
- 🔄 **State management** with React Query, SWR, and Zustand
- 📝 **Form handling** with React Hook Form and Zod validation
- 🗄️ **MongoDB** integration with Mongoose schemas
- 🚀 **Optimized for production** with proper caching and compression

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB database (local or Atlas)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/fyras22/shipfast-boilerplate-.git
cd shipfast-boilerplate-
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your own values:

```
# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000

# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/shipfast?retryWrites=true&w=majority

# NextAuth
# Generate a secret with: openssl rand -base64 32
AUTH_SECRET=your-auth-secret-key-at-least-32-characters-long
NEXTAUTH_URL=http://localhost:3000

# Encryption
# Generate a key with: openssl rand -base64 32
ENCRYPTION_KEY=your-encryption-key-at-least-32-characters-long
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
shipfast-boilerplate/
├── app/                    # Next.js App Router
│   ├── api/                # API routes
│   ├── (auth)/             # Authentication routes (login, register, etc.)
│   ├── dashboard/          # Dashboard pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── providers.tsx       # Client providers
├── components/             # Reusable components
│   ├── dashboard/          # Dashboard-specific components
│   ├── forms/              # Form components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── lib/                    # Library code
│   ├── db/                 # Database utilities
│   ├── models/             # Mongoose models
│   ├── providers/          # Context providers
│   ├── services/           # Business logic
│   └── utils/              # Utility functions
├── public/                 # Static assets
├── auth.ts                 # NextAuth configuration
├── middleware.ts           # Next.js middleware
└── next.config.js          # Next.js configuration
```

## Core Technologies

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with [DaisyUI](https://daisyui.com/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://github.com/colinhacks/zod)
- **State Management**: [React Query](https://tanstack.com/query/), [SWR](https://swr.vercel.app/), [Zustand](https://github.com/pmndrs/zustand)
- **Security**: [Upstash Rate Limiting](https://github.com/upstash/ratelimit), [CryptoJS](https://github.com/brix/crypto-js)

## Performance Optimizations

- Server Components for reduced client-side JavaScript
- Streaming with React Suspense for improved loading UX
- Image optimization with Next.js Image component
- Edge middleware for security and performance
- Proper caching strategies
- Code splitting and lazy loading

## Security Features

- Rate limiting to prevent abuse
- Encrypted sensitive data (emails, etc.)
- Secure authentication with NextAuth v5
- HTTP security headers
- CSRF protection
- Input validation with Zod

## Deployment

This boilerplate is optimized for deployment on [Vercel](https://vercel.com/), but can be deployed to any platform that supports Next.js.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Ffyras22%2Fshipfast-boilerplate-)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to our [GitHub repository](https://github.com/fyras22/shipfast-boilerplate-).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [MongoDB](https://www.mongodb.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Vercel](https://vercel.com/) 