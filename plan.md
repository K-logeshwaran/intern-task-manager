Super da machi! 🔥 Let's kill this assignment neatly and properly.

Here's a **clear plan** for this **Task Tracker Application**:

---

### 📦 Tech Stack
- **Backend:** ExpressJS (Node.js)
- **Frontend:** ReactJS (Vite + Tailwind for fast UI)
- **Database:** MongoDB (easy schema creation for now) *(can later migrate to PostgreSQL if needed)*
- **Authentication:** JWT (JSON Web Tokens)

---

### 🛠 Backend Structure (`/backend`)
- `/controllers` — logic for signup, login, projects, tasks
- `/models` — Mongoose schemas (User, Project, Task)
- `/routes` — API routes (authRoutes, projectRoutes, taskRoutes)
- `/middleware` — authentication middleware (verify JWT)
- `/config` — DB connection
- `/utils` — helper functions (like hashPassword, generateToken)
- `server.js` — main server file

---

### 🛠 Frontend Structure (`/frontend`)
- `/pages` — Login, Signup, Dashboard, ProjectDetail
- `/components` — Navbar, ProjectCard, TaskCard, Modals
- `/services` — API calls (axios instance with JWT)
- `/contexts` — Auth Context (to manage logged-in user globally)
- `/routes` — Protected Routes
- `/hooks` — custom hooks (like `useAuth`)
- `App.jsx` — Routing logic

---

### 🔥 Backend API Endpoints (REST API)

| Method | Route                    | Description             |
|:------:|:-------------------------:|:-----------------------:|
| POST   | `/api/auth/signup`         | User Signup             |
| POST   | `/api/auth/login`          | User Login              |
| POST   | `/api/projects`            | Create Project          |
| GET    | `/api/projects`            | Get All User Projects   |
| POST   | `/api/tasks/:projectId`     | Create Task in Project  |
| GET    | `/api/tasks/:projectId`     | Read All Tasks          |
| PATCH  | `/api/tasks/:taskId`        | Update Task             |
| DELETE | `/api/tasks/:taskId`        | Delete Task             |

---

### 🗄 MongoDB Collections

**User:**
```json
{
  "name": "string",
  "email": "string",
  "password": "hashed string",
  "country": "string",
  "projects": [ObjectId] 
}
```

**Project:**
```json
{
  "userId": "ObjectId",
  "name": "string",
  "createdAt": "Date",
  "tasks": [ObjectId]
}
```

**Task:**
```json
{
  "projectId": "ObjectId",
  "title": "string",
  "description": "string",
  "status": "Pending / In Progress / Completed",
  "createdAt": "Date",
  "completedAt": "Date"
}
```

---

### 🔒 JWT Authentication

- On login/signup → issue token.
- Frontend saves token in `localStorage`.
- Protected routes validate token using middleware.

---

### 🎯 Bonus Features (Optional)
- Password reset (bonus)
- Profile update
- Task priority
- Drag-drop tasks
- Self-deployment on **Render**, **Railway**, or **Vercel**

---

### 🧹 Development To-Do (Split Work)

| Part                     | Owner       | Timeline |
|:-------------------------|:------------|:--------:|
| Backend auth (signup/login + JWT) | Me   | Today |
| Backend Project & Task routes | You  | Today |
| Frontend Login/Signup Pages + AuthContext | Me | Tomorrow |
| Frontend Dashboard + Projects/Tasks CRUD | You | Tomorrow |
| Deployment & Final README | Together | Day After |

---

### 🚀 Final Submission
- Push backend in `/backend`
- Push frontend in `/frontend`
- Proper `README.md`
- Test using **Postman** and **Browser**

---

**Next Step:**
👉 I can immediately start setting up the backend `server.js` + basic routes and share the repo.  
Shall I create a GitHub repo right now named **task-tracker-app** and invite you as collaborator? 🚀

(Then we can assign issues and split!)  
Ready ahh? 🔥
