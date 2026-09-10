# CMS + Portfolio

A full-stack CMS-powered portfolio application built with **React, Node.js, Express, MongoDB, and Mongoose**.

The project combines a public portfolio website with a secure admin dashboard that allows portfolio content to be managed through a REST API.

---

## 🚀 Project Overview

CMS + Portfolio is designed to separate portfolio presentation from content management.

The application contains:

* Public portfolio
* Admin authentication
* Admin dashboard
* CMS content management
* RESTful backend APIs
* MongoDB persistence
* Form validation
* Protected admin routes
* Responsive admin UI
* Toast notifications
* Loading and error states
* CRUD operations for portfolio resources

The project is being developed incrementally in phases. The current codebase includes the Admin Dashboard Foundation, Phase 4B CMS CRUD functionality, the Phase 5 CMS-driven public portfolio, Phase 6 production-hardening fixes (Site Settings → public sync, request-loop audit, security review), and Phase 7's public project detail pages with image galleries.

---

## 🏗️ Architecture

```text
CMS + Portfolio
│
├── frontend/
│   ├── React
│   ├── Vite
│   ├── React Router
│   ├── Axios
│   ├── Tailwind CSS
│   ├── Framer Motion
│   └── Lucide React
│
└── backend/
    ├── Node.js
    ├── Express
    ├── MongoDB
    ├── Mongoose
    ├── Authentication
    ├── REST APIs
    ├── Validators
    ├── Middleware
    └── Seed scripts
```

---

# 📁 Repository Structure

```text
cms-portfolio/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   └── ui/
│   │   │
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── public/
│   │   │
│   │   ├── routes/
│   │   ├── services/
│   │   │   └── cms/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── scripts/
│   │   ├── services/
│   │   ├── validators/
│   │   └── server.js
│   │
│   ├── package.json
│   └── ...
│
├── AI-AGENT.md
├── README.md
└── .gitignore
```

> The exact structure may evolve as the project develops. The repository itself is the source of truth.

---

# 🛠️ Tech Stack

## Frontend

| Technology    | Purpose                   |
| ------------- | ------------------------- |
| React         | UI development            |
| Vite          | Development/build tooling |
| React Router  | Client-side routing       |
| Axios         | HTTP communication        |
| Tailwind CSS  | Styling                   |
| Framer Motion | UI animations             |
| Lucide React  | Icons                     |

## Backend

| Technology                  | Purpose              |
| --------------------------- | -------------------- |
| Node.js                     | Runtime              |
| Express                     | REST API framework   |
| MongoDB                     | Database             |
| Mongoose                    | MongoDB ODM          |
| JWT / Cookie Authentication | Admin authentication |

---

# 🔐 Authentication

The admin area is protected by authentication.

Main authentication flow:

```text
Admin Login
     │
     ▼
/auth/login
     │
     ▼
Authentication
     │
     ▼
Authenticated Session
     │
     ▼
Protected /admin/*
```

The frontend uses an authentication context to maintain the current admin session.

Protected admin routes should not be accessible to unauthenticated users.

Session expiration is handled through the API/authentication layer and should result in the frontend clearing the authenticated admin state and redirecting to the login page.

---

# 🖥️ Frontend Routes

The application currently contains the following main routes:

```text
/
└── Public Portfolio

/projects/:slug
└── Public Project Detail (gallery, tech stack, links, related projects)

/admin/login
└── Admin Login

/admin
└── Protected Admin Dashboard

/admin/site-settings
/admin/header
/admin/hero
/admin/about
/admin/skills
/admin/experience
/admin/services
/admin/projects
/admin/social-links
/admin/footer
/admin/blogs
/admin/jobs
```

The exact behavior of individual pages depends on the current implementation.

---

# 📦 CMS Resources

The CMS manages portfolio content through separate resources.

Current resources include:

* Site Settings
* Header
* Hero
* About
* Skills
* Experience
* Services
* Projects
* Social Links
* Footer
* Blog
* Jobs

Collection-based resources generally support operations such as:

```text
GET     /resource
GET     /resource/:id
POST    /resource
PUT     /resource/:id
DELETE  /resource/:id
```

Singleton resources generally support:

```text
GET     /resource
PUT     /resource
```

The exact API contract should always be verified against the current backend implementation.

## Project detail pages (Phase 7)

Each project's `images[]` field (previously unused - see Phase 6 notes) now powers a gallery on its public detail page at `/projects/:slug`:

* `coverImage` and `images[]` are merged and de-duplicated into a single gallery.
* Clicking any gallery image opens a lightbox (`components/public/ImageLightbox.jsx`) - Escape or clicking outside closes it, and with more than one image, arrow keys/buttons navigate.
* `githubUrl`/`liveUrl` render as buttons only when present.
* A "More Projects" section shows up to 3 other visible projects, excluding the current one.
* Both `coverImage` and every entry in `images[]` are now validated as real URLs by the backend (`projectValidator.js`), reusing the existing `isValidUrl` utility.
* In the admin Projects form, the gallery is managed with `components/admin/ImageListEditor.jsx` (per-image preview, add, remove) instead of the earlier single comma-separated text field.

---

# 🌐 Public API

The public portfolio (`/`) does not authenticate, so it cannot use the admin CMS endpoints above. Instead, each resource that needs to be publicly visible exposes a read-only counterpart under:

```text
GET /api/v1/public/site-settings
GET /api/v1/public/header
GET /api/v1/public/hero
GET /api/v1/public/about
GET /api/v1/public/skills
GET /api/v1/public/experience
GET /api/v1/public/services
GET /api/v1/public/projects
GET /api/v1/public/social-links
GET /api/v1/public/footer
GET /api/v1/public/blogs        (?limit=N supported)
GET /api/v1/public/projects/:slug
```

The single-project endpoint powers `/projects/:slug` (Phase 7). It looks up the project by its `slug` field (not its MongoDB `_id`) and returns `404` for both a nonexistent slug and a real-but-hidden (`isVisible: false`) project - the response is identical either way, so a visitor can't tell a hidden project exists.

These routes are unauthenticated by design, but each is scoped server-side to what is safe to show: collection resources are filtered to `isVisible: true`, and blog posts are additionally filtered to `status: "published"`. They reuse the same Mongoose models and controllers/services as the admin routes (via `listPublic`/`getPublic` helpers on the shared service factories) rather than a separate API layer.

## Site Settings field usage

| Field | Public usage |
|---|---|
| `siteName` | Header/footer brand text |
| `siteTitle` | Browser tab title (fallback when no SEO title is set) |
| `siteDescription` | Meta description (fallback when no SEO description is set) |
| `logo` | Public header logo (used when the Header CMS resource has no logo of its own) |
| `favicon` | Browser tab icon, applied dynamically via `useDocumentHead` |
| `defaultSeoTitle` / `defaultSeoDescription` | Take priority over `siteTitle`/`siteDescription` for `<title>`/meta description |
| `email` / `phone` / `location` | Shown in the public Contact section when set |

---

# 📊 Admin Dashboard

The dashboard provides an overview of CMS content.

It uses existing CMS endpoints rather than requiring a dedicated dashboard aggregation endpoint.

The dashboard can display statistics such as:

* Projects
* Blog Posts
* Skills
* Experience
* Services

It also provides quick access to frequently used CMS sections.

Individual resource failures should degrade gracefully instead of crashing the entire dashboard.

---

# 🧩 Frontend Component System

The frontend contains reusable UI primitives such as:

```text
components/ui/
├── Button
├── Input
├── Textarea
├── Select
├── Card
├── Badge
├── Modal
├── PageHeader
├── Skeleton
├── EmptyState
└── ToastContainer
```

Admin-specific components are kept separately:

```text
components/admin/
├── Sidebar
├── Topbar
├── StatCard
├── CmsPlaceholder
└── ImageListEditor    (repeatable image-URL editor with preview, used by the Projects gallery field)
```

The public portfolio has its own component tree, built from the same `components/ui/` primitives:

```text
components/public/
├── PublicHeader       (nav, mobile drawer, route-aware anchor links)
├── HeroSection
├── AboutSection
├── SkillsSection
├── ExperienceSection
├── ServicesSection
├── ProjectsSection
├── ProjectGallery     (responsive image grid, used on the project detail page)
├── ImageLightbox      (keyboard/Escape-accessible fullscreen image preview)
├── ContactSection
├── BlogSection
├── PublicFooter
├── Reveal             (shared entrance animation)
└── SectionShell       (shared section container/heading)
```

`pages/public/ProjectDetail.jsx` (`/projects/:slug`) uses `ProjectGallery` and `ImageLightbox` together, and reuses `ProjectsSection`'s `ProjectCard` for its "More Projects" section rather than duplicating card markup.

Image rendering (`SafeImage`, with graceful fallback for missing/broken URLs) lives in `components/ui/` since both the admin previews (Site Settings logo/favicon) and the public sections use it.

The purpose of this separation is to make future CMS forms consistent and easier to maintain.

---

# 🔌 API Architecture

Frontend API communication follows this general pattern:

```text
React Component
      │
      ▼
CMS Service
      │
      ▼
Axios API Client
      │
      ▼
Express Route
      │
      ▼
Controller / Service
      │
      ▼
Mongoose Model
      │
      ▼
MongoDB
```

CMS collection services use reusable service factories where appropriate.

This keeps resource services small and consistent.

---

# 🗄️ Database

MongoDB is used as the primary database.

Mongoose models define:

* schema structure
* validation
* defaults
* indexes
* timestamps
* uniqueness constraints
* other database-level behavior

Database configuration is provided through environment variables.

---

# 🌱 Seeding

The backend includes CMS seed functionality.

The seed process can populate initial content such as:

* Site Settings
* Header
* Hero
* About
* Footer
* Skills
* Experience
* Services
* Projects
* Social Links
* Blog Posts

Use the scripts defined in the backend `package.json`.

Do not assume seed scripts are safe to run against production databases.

---

# ⚙️ Environment Variables

Environment variables should be configured locally and must never be committed to Git.

Typical backend configuration may include:

```text
MONGODB_URI
JWT_SECRET
PORT
CLIENT_URL
```

The actual variable names must be taken from the current backend configuration.

Frontend Vite environment variables should use the project's configured naming convention.

Example:

```text
VITE_API_BASE_URL
```

Never expose private secrets through frontend `VITE_*` variables.

---

# 🚦 Local Development

## 1. Clone the repository

```bash
git clone <repository-url>
cd cms-portfolio
```

## 2. Install backend dependencies

```bash
cd backend
npm install
```

## 3. Configure backend environment

Create the appropriate `.env` file based on the project's environment configuration.

## 4. Start backend

Use the development script defined in:

```text
backend/package.json
```

For example:

```bash
npm run dev
```

The backend commonly runs on:

```text
http://localhost:5000
```

Verify the actual configured port before use.

---

## 5. Install frontend dependencies

Open another terminal:

```bash
cd frontend
npm install
```

## 6. Configure frontend environment

Set the API base URL according to the frontend configuration.

Example:

```text
VITE_API_BASE_URL=http://localhost:5000/api
```

Use the actual API prefix configured by the backend.

## 7. Start frontend

```bash
npm run dev
```

---

# 🧪 Development Checks

Before committing changes, run the scripts available in the relevant `package.json`.

Typical frontend checks include:

```bash
npm run lint
npm run build
```

Backend checks depend on the scripts currently defined in the backend package.

Do not claim a check passed unless it was actually executed successfully.

---

# 🔒 Security Principles

The project should follow these principles:

* Never commit `.env` files.
* Never expose JWT secrets.
* Never hardcode passwords or credentials.
* Protect admin routes on the backend.
* Validate incoming API data.
* Use secure authentication cookies where applicable.
* Configure CORS carefully.
* Do not trust frontend authorization.
* Handle invalid authentication consistently.
* Do not leak sensitive backend errors to clients.
* Validate MongoDB ObjectIds before database operations where appropriate.
* Prevent unauthorized CMS modifications.

---

# 📱 Responsive Design

The admin dashboard is intended to work across:

```text
Mobile
Tablet
Laptop
Desktop
```

The sidebar supports desktop collapse behavior and a mobile navigation drawer.

UI changes should preserve responsive behavior.

---

# 🎨 Design Principles

The admin dashboard uses a dark interface with:

* reusable cards
* consistent form controls
* responsive layouts
* subtle borders
* controlled animation
* loading skeletons
* empty states
* toast notifications

Animations should remain subtle and functional.

Users who prefer reduced motion should receive reduced/non-essential animation through the application's accessibility configuration.

---

# 🤖 AI Development

This repository is intended to be understandable and maintainable by both humans and AI coding agents.

Before modifying the project, AI agents should read:

```text
AI-AGENT.md
```

`AI-AGENT.md` contains project-specific instructions, architectural constraints, development rules, and guidance for modifying the repository.

The general rule is:

> Inspect the existing implementation before making changes. Do not assume that an older phase specification exactly matches the current code.

---

# 🧭 Development History

The project has been developed incrementally.

High-level progression:

```text
Phase 1
  ↓
Project foundation

Phase 2
  ↓
Authentication / initial admin structure

Phase 3
  ↓
CMS backend APIs, models, validation and seed data

Phase 4A
  ↓
Admin Dashboard Foundation

Phase 4B
  ↓
CMS CRUD functionality and admin management interfaces

Current
  ↓
Full debugging, stabilization, security review and integration testing
```

The phase history is provided for context only.

The **current repository implementation is always the source of truth**.

---

# 🐛 Debugging Guidelines

When investigating a bug, follow the complete request path.

For example:

```text
UI
 ↓
React state/effect
 ↓
CMS service
 ↓
Axios
 ↓
HTTP request
 ↓
Express route
 ↓
Middleware
 ↓
Controller
 ↓
Mongoose
 ↓
MongoDB
 ↓
Response
 ↓
Axios
 ↓
React state
 ↓
UI
```

Do not fix only the visible symptom.

For example, if a page remains stuck on loading, investigate why the request never reaches a successful state rather than simply adding a timeout or forcing `isLoading` to `false`.

---

# 📌 Current Scope

The project currently focuses on:

* Portfolio management
* CMS administration
* Admin authentication
* REST APIs
* Responsive admin UI
* MongoDB persistence

Future functionality may include additional AI-powered or job-intelligence features.

---

# 🤝 Contributing

When making changes:

1. Read `AI-AGENT.md`.
2. Understand the existing architecture.
3. Make focused changes.
4. Avoid unnecessary rewrites.
5. Preserve existing API contracts where possible.
6. Validate both frontend and backend changes.
7. Run available lint/build/test commands.
8. Check authentication and authorization for admin functionality.
9. Test responsive behavior when UI changes are made.
10. Document important architectural changes.

---

# 📄 License

Add the project's intended license here when one has been selected.

---

## Project Status

**Status:** Active Development

The project is currently undergoing stabilization and debugging following implementation of the Phase 4B CMS functionality.
