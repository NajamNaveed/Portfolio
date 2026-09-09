# CMS + Portfolio (MERN)

Production-grade portfolio website fully driven by a custom CMS, with a single Admin user.

## Structure

- `frontend/` — React + Vite public portfolio and admin CMS UI (Tailwind CSS, Framer Motion)
- `backend/` — Node.js + Express REST API (MongoDB + Mongoose)

## Development

Backend:
\`\`\`
cd backend
cp .env.example .env
npm install
npm run dev
\`\`\`

Frontend:
\`\`\`
cd frontend
cp .env.example .env
npm install
npm run dev
\`\`\`

## Deployment

- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

See project architecture notes for environment variables required in each environment.