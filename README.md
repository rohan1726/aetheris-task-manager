# Task Manager — Full Stack MERN App

A full-stack Task Management Web App built for the Aetheris AI technical assessment.
Users can register, log in, create/edit/delete tasks, mark tasks complete, and filter
their task list — all secured with JWT authentication.

## Features

- User registration and login (JWT-based auth)
- Add / Edit / Delete tasks
- Mark tasks complete / pending
- Pending & Completed views
- Search tasks by title
- Filter by priority (High / Medium / Low)
- Responsive UI (mobile-friendly)
- Loading spinners and inline error messages
- Protected routes on both frontend and backend

## Tech Stack

**Frontend:** React (Vite), React Router, Axios, custom CSS
**Backend:** Node.js, Express
**Database:** MongoDB Atlas + Mongoose
**Auth:** JSON Web Tokens (JWT), bcrypt password hashing
**Deployment:** Vercel (frontend) + Render (backend)

## Folder Structure

```
aetheris-task-manager/
├── client/                # React frontend
│   └── src/
│       ├── components/    # Navbar, TaskCard, TaskModal, Spinner, PrivateRoute
│       ├── pages/         # Login, Register, Dashboard, NotFound
│       └── services/      # Axios API layer
└── server/                # Express backend
    ├── config/            # DB connection
    ├── controllers/       # Auth & task business logic
    ├── models/            # User, Task (Mongoose schemas)
    ├── routes/             # /api/auth, /api/tasks
    └── middleware/        # JWT auth guard, error handler
```

## Installation

### 1. Backend

```bash
cd server
npm install
cp .env.example .env   # then fill in MONGO_URI and JWT_SECRET
npm run dev             # starts on http://localhost:5000
```

### 2. Frontend

```bash
cd client
npm install
cp .env.example .env   # VITE_API_URL=http://localhost:5000/api
npm run dev             # starts on http://localhost:5173
```

## Environment Variables

**server/.env**

| Variable | Description |
|---|---|
| `PORT` | Port for the Express server (default 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key used to sign JWTs |
| `JWT_EXPIRES_IN` | Token expiry, e.g. `7d` |
| `CLIENT_URL` | Frontend origin, for CORS |

**client/.env**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL of the backend API |

## API Endpoints

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login, returns JWT | No |
| GET | `/api/auth/me` | Get current user profile | Yes |
| GET | `/api/tasks` | Get all tasks (supports `?status=`, `?priority=`, `?search=`) | Yes |
| POST | `/api/tasks` | Create a task | Yes |
| PUT | `/api/tasks/:id` | Update a task | Yes |
| DELETE | `/api/tasks/:id` | Delete a task | Yes |

All protected routes require an `Authorization: Bearer <token>` header.

## Validation Rules

- Email must be unique
- Password minimum 6 characters
- Task title is required
- Priority must be High / Medium / Low
- Due date is required

## Deployment

1. **Backend (Render):** New Web Service → connect repo → root directory `server` →
   build command `npm install` → start command `npm start` → add env vars from `.env.example`.
2. **Frontend (Vercel):** New Project → root directory `client` → framework preset **Vite** →
   add `VITE_API_URL` pointing to the deployed Render backend URL.
3. Update `CLIENT_URL` in the backend's env vars to the deployed Vercel URL once known.

## Screenshots

_Add screenshots of Register, Login, and Dashboard (pending/completed views) here before submission._

## Deployment Link

_Add live deployment link here after deploying._
