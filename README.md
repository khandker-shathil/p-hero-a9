# MediQueue — Tutor Booking System

MediQueue is a tutor booking platform that helps students find tutors, reserve available learning sessions, and manage their bookings from one place.

**Live site:** Add your deployed Vercel URL here before submission.

## Features

- Secure email/password and Google authentication with Better Auth.
- Browse tutors, search by tutor name, and filter by session start date.
- Create and manage tutor listings with owner-only editing and deletion.
- Reserve an available tutor slot with automatic slot reduction.
- View booked sessions and cancel them to restore the tutor’s available slot.
- Responsive MediQueue interface with persistent dark/light theme support.

## Technology

- Next.js and React
- Tailwind CSS, DaisyUI, and Lucide icons
- MongoDB
- Better Auth
- React Toastify

## Run locally

1. Install dependencies:

   ```bash
   npm install
   ```

2. Add a `.env` file with your MongoDB URI, Better Auth URL, Google OAuth credentials, and tutor API URL.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Visit `http://localhost:3000`.

## Environment variables

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXT_PUBLIC_API_URL=http://localhost:5050
```
