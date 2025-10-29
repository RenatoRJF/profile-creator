# Profile Creator - Full-Stack Application

A modern creator profile platform built with Next.js 16, NestJS, and Prisma, structured as a monorepo. Users can create profiles, showcase their skills, and discover other creators with advanced search capabilities.

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm 9+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd profile-creator
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up the backend database**
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. **Start the development servers**

In one terminal, start the backend:
```bash
npm run dev:backend
```

In another terminal, start the frontend:
```bash
npm run dev:frontend
```

Or run both together:
```bash
npm run dev
```

5. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001

## 📁 Project Structure

This is a monorepo with the following structure:

```
profile-creator/
├── apps/
│   ├── backend/          # NestJS API server
│   │   ├── prisma/       # Database schema and migrations
│   │   └── src/
│   │       ├── auth/     # Authentication module
│   │       ├── profile/  # Profile CRUD module
│   │       └── prisma/   # Prisma service
│   └── frontend/         # Next.js 16 application
│       └── src/
│           ├── app/      # App Router pages
│           ├── components/ # Reusable components (shadcn/ui)
│           └── lib/      # Actions, DAL, and utilities
└── packages/
    └── shared/           # Shared TypeScript types
```

## 🛠 Tech Stack & Architecture

### Backend (NestJS)
- **Framework**: NestJS 10 with TypeScript
- **Database**: SQLite with Prisma ORM
- **Authentication**: JWT with bcrypt password hashing
- **Validation**: class-validator and class-transformer
- **API Design**: RESTful endpoints with proper error handling

### Frontend (Next.js 16)
- **Framework**: Next.js 16 with App Router (React 19)
- **State Management**: React Query (TanStack Query) for server state
- **URL State**: nuqs for search parameters
- **Rendering**: Server-Side Rendering (SSR) by default
- **Authentication**: Server Components with Data Access Layer (DAL)
- **Styling**: Tailwind CSS v4 with Radix UI components
- **Icons**: Lucide React
- **API Integration**: Server Actions for mutations

### Key Design Decisions

1. **Monorepo Structure**: Organized as a workspace monorepo for better code sharing and dependency management

2. **Server-First Architecture**: Following Next.js 16 best practices:
   - Server Components by default for better performance
   - Data Access Layer (DAL) for secure authentication
   - Server Actions for mutations
   - HttpOnly cookies for session management

3. **Type Safety**: Shared TypeScript types between frontend and backend

4. **Component Library**: shadcn/ui for consistent, accessible UI components

5. **Separation of Concerns**:
   - Backend handles all business logic and data validation
   - Frontend focuses on presentation and user experience
   - Clear API boundaries with RESTful design

## 📡 API Endpoints

### Authentication
- `POST /auth/signup` - Create new user account
- `POST /auth/login` - Authenticate user
- `GET /auth/me` - Get current user (protected)

### Profile
- `POST /profile` - Create user profile (protected)
- `GET /profile/me` - Get own profile (protected)
- `PUT /profile/me` - Update own profile (protected)
- `GET /profile/username/:username` - Get profile by username (public)
- `GET /profile/all?skills=...` - Get all profiles with optional skill filtering (public)

## ✨ Features

### Core Features (Implemented)

#### Authentication & Authorization
- ✅ Email/password authentication with JWT
- ✅ Secure session management with HttpOnly cookies
- ✅ Protected routes and API endpoints
- ✅ User registration and login
- ✅ Logout functionality

#### Profile Management
- ✅ Create personal creator profile
- ✅ Edit profile information (name, bio, skills, profile image)
- ✅ Profile validation with real-time feedback
- ✅ Public profile pages accessible by username
- ✅ Private profile editing interface

#### Discovery & Search
- ✅ Browse all creator profiles
- ✅ Real-time search by skills with URL state persistence
- ✅ Filter own profile from discovery results
- ✅ Responsive grid layout for profile cards
- ✅ Loading states with skeleton screens

#### Dashboard
- ✅ Clean overview dashboard
- ✅ Profile preview card with avatar and skills
- ✅ Quick actions for common tasks
- ✅ Separate edit page with back navigation

#### UI/UX Excellence
- ✅ Loading states with skeleton screens
- ✅ Error boundaries for graceful error handling
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth transitions with useTransition
- ✅ Form validation and feedback
- ✅ Accessible components (Radix UI)
- ✅ Modern, clean interface

#### Technical Implementation
- ✅ **React Query** for server state management and caching
- ✅ **nuqs** for URL search parameter management
- ✅ **Tailwind CSS v4** with custom theme and HSL colors
- ✅ **Component structure** following atomic design principles
- ✅ **TypeScript** throughout the entire stack
- ✅ **Monorepo** structure with npm workspaces
- ✅ **Server Components** for optimal performance
- ✅ **Server Actions** for mutations
- ✅ **Input validation** on frontend and backend
- ✅ **Error handling** with try-catch and error boundaries
- ✅ **Database migrations** with Prisma
- ✅ **Workspace-specific** gitignore files

## 🔐 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with configurable expiration
- HttpOnly cookies for token storage
- Server-side session verification
- Input validation on both frontend and backend
- CORS configuration
- Protected API routes

## 🎨 UI/UX Features

- Modern, clean interface with Radix UI components
- Responsive design (mobile, tablet, desktop)
- Accessible components (ARIA compliant)
- Consistent styling with Tailwind CSS v4
- Skeleton loading states for better perceived performance
- Error boundaries for each page
- Toast notifications for user feedback
- Intuitive navigation with clear CTAs
- Search with real-time URL state management
- Smooth page transitions with useTransition

## 🎯 Key Technical Highlights

### React Query Integration
- Automatic caching and background refetching
- Custom hooks for profile operations (`useMyProfile`, `useProfiles`, etc.)
- Optimistic updates for better UX
- Automatic cache invalidation after mutations
- React Query Devtools for debugging

### URL State Management with nuqs
- Search parameters synced with URL
- Clean API with `useQueryState` hook
- Type-safe query parameters
- Shallow routing support
- Works seamlessly with Next.js App Router

### Component Architecture
- Atomic design principles (atoms, molecules, organisms)
- Each component in its own folder with types
- Barrel exports for clean imports
- Reusable UI components with Radix UI
- Type-safe props with TypeScript

### Error Handling & Loading States
- Error boundaries on all pages
- Skeleton screens during data fetching
- `useTransition` for smooth navigation
- Form validation with instant feedback
- Graceful error recovery with retry options

## 🚧 Future Enhancements

1. **Testing**: Unit tests, integration tests, and E2E with Playwright
2. **File Uploads**: Implement S3/Cloudinary for image hosting
3. **Email Verification**: Add email confirmation for new accounts
4. **Password Reset**: Forgot password flow with email tokens
5. **Infinite Scroll**: Pagination for profile discovery
6. **Advanced Filters**: Multiple skill filters, location, availability
7. **Social Features**: Following, messaging, collaboration requests
8. **Analytics**: Profile views, engagement metrics, search analytics
9. **Admin Panel**: User management and content moderation
10. **Performance**: Redis caching, CDN for static assets
11. **CI/CD**: GitHub Actions for testing and deployment
12. **Docker**: Containerization for consistent environments
13. **Monitoring**: Sentry for error tracking, DataDog for performance
14. **Rate Limiting**: API protection with Redis-based rate limiter
15. **Real-time**: WebSocket for live updates
16. **SEO**: Open Graph tags, sitemap, robots.txt

## 📝 Development Notes

### Database

The application uses SQLite for simplicity. To reset the database:
```bash
cd apps/backend
rm prisma/dev.db
npx prisma migrate reset
```

### Environment Variables

Backend (`apps/backend/.env`):
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3001
```

Frontend (`apps/frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
JWT_SECRET="your-secret-key"  # Must match backend
```

### Common Commands

```bash
# Install dependencies
npm install

# Run both apps in development
npm run dev

# Run backend only
npm run dev:backend

# Run frontend only
npm run dev:frontend

# Build all apps
npm run build

# Generate Prisma client
npm run prisma:generate

# Create new migration
npm run prisma:migrate

# Open Prisma Studio
cd apps/backend && npm run prisma:studio
```

## 📄 License

MIT

## 📚 Learning Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/primitives/docs/overview/introduction)

## 🤝 Contributing

This is a personal project. Feel free to fork and experiment!

## 👤 Author

Built with modern full-stack development practices, focusing on:
- Clean, maintainable code architecture
- Type safety across the entire stack
- Modern React patterns (Server Components, Server Actions)
- Professional UI/UX with proper loading and error states
- Scalable monorepo structure

---

**Built with ❤️ using Next.js, NestJS, React Query, and Tailwind CSS**
