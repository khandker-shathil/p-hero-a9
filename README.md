# MediQueue

A full-stack tutor-booking web application — find a tutor, book a session, manage your bookings, all without back-and-forth emails.

Built as an assignment project by **Khandker Shathil**.

<!-- SCREENSHOT: hero/banner shot of the homepage -->
<!-- e.g. ![Homepage banner](./screenshots/homepage-banner.png) -->

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Design System](#design-system)
- [Features](#features)
  - [Public Pages](#public-pages)
  - [Authentication](#authentication)
  - [Private Pages](#private-pages)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Known Limitations](#known-limitations)

---

## Overview

MediQueue lets students browse tutors, view detailed profiles, and book sessions within available slots and dates. Tutors (or admins) can list, update, and remove tutor listings. Logged-in users can manage their own listed tutors and their booked sessions, with instant UI updates and no full page reloads.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js (App Router) |
| UI components | shadcn/ui, HeroUI |
| Styling | Tailwind CSS |
| Authentication | Better Auth (email/password + Google OAuth), MongoDB adapter |
| Backend | Express.js |
| Database | MongoDB (native driver) |
| Fonts | Fraunces (display), Inter (body/UI) |
| Icons | lucide-react (generic), react-icons/fa (brand) |
| Notifications | react-toastify |
| Data fetching (client) | TanStack Query |
| Deployment | Vercel (frontend), Render (backend) |

## Design System

MediQueue uses a custom "class card" visual language — inspired by index cards, ruled paper, and course catalogs — rather than generic SaaS gradients.

| Token | Color | Usage |
|---|---|---|
| Ink navy | `#1B2A4A` | Headings, primary text, dark sections |
| Paper | `#FBFAF7` | Page background, light text on dark |
| Moss | `#3F6E52` | Subject tags, primary accents |
| Clay | `#C1543C` | Price, urgency, secondary accents |
| Graphite | `#6B7280` | Meta text, muted labels |

<!-- SCREENSHOT: a small collage of the color palette / a style-guide snippet, optional -->

## Features

### Public Pages

- **Home** — rotating banner pulling real tutor data, featured tutors grid, "How it works" section, call-to-action strip
- **Tutors listing** — full grid of tutors with search and filter (subject, availability)
- **Tutor details** — full profile with subject, price, institution, availability, and slot-aware booking

<!-- SCREENSHOT: homepage full scroll -->
<!-- SCREENSHOT: tutors grid page -->
<!-- SCREENSHOT: tutor details page -->

### Authentication

- Email/password registration and login with custom validation (uppercase + lowercase + 6-character minimum)
- Google OAuth sign-in via Better Auth, with account-linking support
- Session-aware Navbar (shows login/register or user avatar + dropdown depending on session state)
- Friendly error messages mapped from Better Auth error codes (e.g. account-already-linked, invalid credentials)

<!-- SCREENSHOT: login page -->
<!-- SCREENSHOT: register page -->
<!-- SCREENSHOT: Google OAuth account-linking error toast -->

### Private Pages

- **Profile** — view and edit name/photo, changes reflected instantly across the app (Navbar included)
- **Add Tutor** — form to list a new tutor
- **My Tutors** — table of tutors the user has listed, with edit (modal) and delete (confirmation)
- **My Booked Sessions** — table of the user's bookings, with cancel (confirmation + instant update)

<!-- SCREENSHOT: profile page (view mode) -->
<!-- SCREENSHOT: profile page (edit mode) -->
<!-- SCREENSHOT: add tutor form -->
<!-- SCREENSHOT: my tutors page with edit modal open -->
<!-- SCREENSHOT: my booked sessions page -->

## Screenshots

> Drop image files into a `/screenshots` folder at the project root and reference them below. GitHub renders these automatically in the README.

<!-- SCREENSHOT: homepage -->
![Homepage](./screenshots/homepage.png)

<!-- SCREENSHOT: tutors grid -->
![Tutors grid](./screenshots/tutors-grid.png)

<!-- SCREENSHOT: tutor details -->
![Tutor details](./screenshots/tutor-details.png)

<!-- SCREENSHOT: login/register -->
![Login page](./screenshots/login.png)

<!-- SCREENSHOT: profile page -->
![Profile page](./screenshots/profile.png)

<!-- SCREENSHOT: my tutors -->
![My tutors](./screenshots/my-tutors.png)

<!-- SCREENSHOT: my booked sessions -->
![My booked sessions](./screenshots/my-booked-sessions.png)

<!-- SCREENSHOT: 404 / error page -->
![404 page](./screenshots/404.png)

## Getting Started

```bash
# Clone the repo
git clone <your-repo-url>

# Install frontend dependencies
cd mediqueue-frontend
npm install

# Install backend dependencies
cd ../mediqueue-backend
npm install

# Run backend
npm start

# Run frontend (in a separate terminal)
cd ../mediqueue-frontend
npm run dev
```

## Environment Variables

**Frontend** (`.env.local`, at project root):

```
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
```

**Backend** (`.env`):

```
MONGODB_URI=your_mongodb_connection_string
PORT=5050
```

## Project Structure

```
mediqueue-frontend/
├── app/
│   ├── page.jsx                 # Home page
│   ├── tutors/                  # Tutors grid + details
│   ├── login/, register/        # Auth pages
│   ├── profile/                 # Profile view/edit
│   ├── add-tutor/               # Add tutor form
│   ├── my-tutors/                # User's listed tutors
│   ├── my-booked-sessions/      # User's bookings
│   └── layout.js                # Root layout (Navbar, Footer, fonts)
├── components/
│   ├── BannerSection.jsx
│   ├── FeaturedTutors.jsx
│   ├── HowItWorks.jsx
│   ├── CtaStrip.jsx
│   ├── TutorCard.jsx
│   ├── Footer.jsx
│   └── EditUserModal.jsx
└── lib/
    ├── auth.js, auth-client.js
    └── data/                    # Service-layer data-fetching functions

mediqueue-backend/
└── index.js                     # Express server, MongoDB routes
```

## Known Limitations

- Tutor photos use `i.pravatar.cc` placeholder avatars, not real uploaded images
- No file-upload support yet for profile or tutor photos (URL input only)
- Social links in the Footer are placeholders

---

<!-- SCREENSHOT: optional closing shot — e.g. mobile responsive view -->

*Built as part of a full-stack development assignment.*
## Vercel deployment troubleshooting

Tutor reads and writes use this Next.js app's MongoDB database (`mediaqueue`); no external tutor API URL is needed.

Set `MONGODB_URI`, `BETTER_AUTH_SECRET`, and `BETTER_AUTH_URL` in Vercel for the environment being deployed. Set `BETTER_AUTH_URL` to the deployed HTTPS origin. For Google sign-in, also set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` and register the deployed `/api/auth/callback/google` URL with Google. Redeploy after changing environment variables.

Ensure the MongoDB user can access `mediaqueue` and the database network rules allow connections from the deployment.

React production error #441 indicates a Server Component failed; the browser intentionally hides the underlying message. Open the matching request in Vercel runtime logs and inspect the server error/digest to distinguish missing configuration, database connectivity, and other failures. Never share connection strings or secrets when reporting logs.

The footer only links to implemented pages. Company/legal pages must be implemented before adding their links back.
