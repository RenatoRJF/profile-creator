[Wroom] Full-Stack Technical Challenge

Goal
We'd like to see how you architect a well-structured MVP with clean code and thoughtful design decisions. This challenge should take 4-6 hours to complete.
This is not a speed test — we value architectural thinking and code quality over feature completeness. We're a startup, and we appreciate your time.

Task Overview
Build a Creator Profile MVP that allows users to:
Simple Authentication


Sign up / Login with email + password
Basic session management (JWT or simple session cookies)
Password hashing (use bcrypt or similar)
Protected routes


Profile Management


Create and edit user profile
Fields: name, bio, skills/tools (as tags), optional profile image URL
Basic validation


Discovery


Public profile page (/profile/:username)
Allow users to browse creators and quickly find profiles by matching skills/tags



Technical Requirements
Frontend:
React.js or Next.js (your choice)
TypeScript (required)
Tailwind CSS (or any CSS solution you prefer)
Basic form validation and error handling
💡 Design doesn’t need to be fancy. Please focus on clarity and usability.
Backend:
Node.js / Express or Next.js API routes
Database: SQLite with Prisma (for simplicity) or PostgreSQL if you prefer
RESTful API design
Basic input validation
Proper error responses
💡Time-Saving Suggestions:
Use Prisma for quick database setup
Use Next.js App Router for integrated frontend/backend
Mock data is fine for testing, but implement real CRUD operations
Use simple JWT with localStorage (no refresh tokens needed)
Profile image: just store URL string (no file upload)
Focus on 2-3 core flows done well rather than many half-done features

Must Have (Core):
✅ Clean, organized code structure
✅ Proper separation of concerns (components, services, utils)
✅ TypeScript types throughout
✅ Basic error handling
✅ Working authentication flow
✅ CRUD operations for profiles
✅ Simple but functional UI



Nice to Have (Choose 1-2)
Database migrations or schema versioning
Input validation on both frontend and backend
Loading states and error boundaries
Reusable components and hooks
API middleware (auth check, error handling)
Basic responsive design



Submission
Timeline: Please submit within 7 days of receiving this challenge (but it should only take 4-6 hours)


Deliverables:
GitHub repository link with clear commit history
README.md with setup instructions


README.md Should Include:


Quick Start
Prerequisites
Installation steps (npm install, database setup)
How to run (npm run dev)


Brief Architecture Notes (3-5 bullet points)
Tech stack choices and why
Key design decisions
What you'd improve with more time


API Endpoints (simple list)
POST /api/auth/signup
POST /api/auth/login
GET/PUT /api/profile
etc.



Evaluation Criteria
Criteria
Description
Weight
Code Organization
Clean structure, modular code, proper file organization
30%
Functionality
Core features work correctly, good error handling
25%
TypeScript Usage
Proper typing, interfaces, type safety
20%
API Design
RESTful patterns, consistent responses, input validation
15%
Documentation
Clear README, understandable code
10%





What to Avoid:
Over-engineering (keep it simple and pragmatic)
Missing TypeScript types
No error handling
Inconsistent code patterns
Complex features that take too much time

Time Budget Suggestion
To keep this within 4-6 hours, here's a recommended breakdown:
Setup & Database (30min): Project init, Prisma setup, basic schema
Authentication (1.5h): Signup/login API, password hashing, JWT, protected routes
Profile CRUD (1.5h): Create/edit profile, API endpoints, forms
UI Components (1h): Basic layout, forms, profile display
Search/Filter (45min): Simple tag filtering, creator list
Polish & README (45min): Error handling, documentation, cleanup
Total: ~6 hours


Notes
We value your time. If something is taking too long, simplify it and document what you'd do differently
Focus on doing less, better. We'd rather see 3 features done well than 10 done poorly
Document your thinking. Even if you don't implement something, noting it in README shows good judgment
Feel free to use libraries/tools you're comfortable with to save time
If you have questions, please reach out
We're excited to see your approach!



