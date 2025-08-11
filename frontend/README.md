# Bigscreen Survey Frontend

## Setup

- Create `.env` with `VITE_API_BASE_URL` if backend runs on a different host/port (default used by code is `http://localhost:8000/api`).
- Install dependencies: `npm install`
- Start dev server: `npm run dev`

## Structure

- `src/pages/SurveyPage.tsx`: Public survey
- `src/pages/ResponsePage.tsx`: Public response by slug
- `src/pages/admin/*`: Admin app (login, layout, pages)
- `src/services/api.ts`: Axios client
- `src/hooks/useAuth.ts`: Admin auth state
