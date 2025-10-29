# Creator Profile MVP - Full-Stack Application

A modern creator profile platform built with Next.js 16, NestJS, and Prisma, structured as a monorepo. Users can create profiles, showcase their skills, and discover other creators.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
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
- **Rendering**: Server-Side Rendering (SSR) by default
- **Authentication**: Server Components with Data Access Layer (DAL)
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **Icons**: Lucide React
- **API Integration**: Proxy pattern to backend

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
- ✅ Email/password authentication with JWT
- ✅ Protected routes and session management
- ✅ Create and edit user profiles
- ✅ Profile fields: name, bio, skills/tools, profile image URL
- ✅ Public profile pages
- ✅ Browse all creators
- ✅ Search/filter by skills
- ✅ Server-side rendering by default
- ✅ Responsive design with shadcn/ui

### Additional Features
- ✅ TypeScript throughout the stack
- ✅ Input validation (frontend and backend)
- ✅ Error handling and user feedback
- ✅ Loading states
- ✅ Clean, modular code structure
- ✅ Database migrations with Prisma

## 🔐 Security Features

- Password hashing with bcrypt (10 rounds)
- JWT tokens with configurable expiration
- HttpOnly cookies for token storage
- Server-side session verification
- Input validation on both frontend and backend
- CORS configuration
- Protected API routes

## 🎨 UI/UX Features

- Modern, clean interface with shadcn/ui
- Responsive design (mobile-friendly)
- Accessible components (ARIA compliant)
- Consistent styling with Tailwind CSS
- Loading states and error messages
- Intuitive navigation

## 🚧 What Could Be Improved with More Time

1. **Testing**: Add unit tests, integration tests, and E2E tests
2. **File Uploads**: Implement actual image upload instead of URL strings
3. **Email Verification**: Add email confirmation for new accounts
4. **Password Reset**: Implement forgot password functionality
5. **Pagination**: Add pagination for profile discovery
6. **Advanced Search**: More sophisticated filtering options
7. **Social Features**: Following, messaging, or collaboration features
8. **Analytics**: Track profile views and engagement
9. **Admin Panel**: Content moderation and user management
10. **Performance**: Add caching strategies (Redis)
11. **CI/CD**: Set up automated testing and deployment
12. **Docker**: Containerize the application
13. **Monitoring**: Add logging and error tracking (Sentry)
14. **Rate Limiting**: Protect APIs from abuse

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

Frontend uses Next.js built-in proxy, no additional env vars needed.

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

## 👤 Author

Built as a technical challenge demonstrating full-stack development skills with modern technologies.

---

**Note**: This is an MVP built focusing on code quality, architecture, and core functionality. The emphasis is on clean code, proper separation of concerns, and following best practices rather than feature completeness.
