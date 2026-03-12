# Realtime Chat & Threads App

full-stack, real-time messaging application



## ⚙️ Getting Started

### 1. Database Setup (Docker)
Ensure you have Docker installed, then run:

```bash
docker-compose up -d
```
This starts a PostgreSQL instance on `localhost:8000`.

### 2. Backend Setup

1. Navigate to the backend directory: `cd Backend`
2. Install dependencies: `npm install`
3. Configure `.env` (refer to `src/config/env.ts` for required variables):
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_PORT=8000
   DB_NAME=realtime_chat_and_threads_app
   DB_USER=MikasaN
   DB_PASSWORD=ming3465
   CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   CLOUDINARY_CLOUD_NAME=your_name
   CLOUDINARY_API_KEY=your_key
   CLOUDINARY_API_SECRET=your_secret
   ```
4. Run migrations: `npm run migrate`
5. Start development server: `npm run dev`

### 3. Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure `.env.local`:
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
   CLERK_SECRET_KEY=your_secret
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   NEXT_PUBLIC_SOCKET_URL=http://localhost:5000
   ```
4. Start development server: `npm run dev` (runs on port 4000)

---
## 🛠 Techologies Used

### Frontend
- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Auth**: [Clerk](https://clerk.com/)
- **State/Realtime**: [Socket.io Client](https://socket.io/docs/v4/client-api/) & [React Hooks](https://react.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation

### Backend
- **Runtime**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Framework**: [Express](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Realtime**: [Socket.io](https://socket.io/)
- **File Uploads**: [Cloudinary](https://cloudinary.com/) & [Multer](https://github.com/expressjs/multer)
- **Security**: [Helmet](https://helmetjs.github.io/) & [Cors](https://github.com/expressjs/cors)

## 📜 License
This project is licensed under the [ISC License](LICENSE).
