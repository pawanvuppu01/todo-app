# Todo App — Expo / React Native + FastAPI + JWT

This project is a full-stack reusable Todo app implemented with a React Native (Expo) frontend and a FastAPI backend with JWT authentication. It’s designed to run across platform targets: macOS, iOS, Android, web, and physical devices via Expo.

---

## Key Features
- Login / Signup with JWT-based authentication
- View, add, and complete todos (CRUD) with a smooth modern UI
- Secure token storage using AsyncStorage on the frontend
- FastAPI backend with SQLAlchemy + Alembic migration scaffold
- Search-friendly folder layout: `src/api`, `src/context`, `src/navigation`, `src/screens`, `src/components`, `backend/app/*`
- Tests: frontend tests via `jest`/`@testing-library/react-native`, backend tests via `pytest`
- CI flows for backend and frontend via GitHub Actions

---

## Architecture Overview

Frontend (Expo/React Native)
- React Navigation used for the routing stack (Auth / App flows) in `src/navigation`
- API requests through `src/api` wrappers using `axios` (centralized base URL via `src/api/config.js`)
- Token + user flow via `src/context/AuthContext.js`
- Screens: `Login`, `Signup`, `Dashboard`, `Profile` (and small components like `ButtonPrimary`, `InputField`, `TodoItem`)
- Support for macOS, iOS, Android, and web builds using Expo

Backend (FastAPI)
- Auth routes (`/auth/signup`, `/auth/login`, `/auth/me`) with JWT using `python-jose`
- Todos routes (`/todos`, `POST /todos`, `PATCH /todos/{id}`) protected by JWT dependency
- SQLAlchemy models + Alembic migration scaffold to maintain DB schema
- DB: SQLite for local development; Postgres recommended for production

---

## What I changed, implemented, and fixed
This repo contains many iteratively delivered updates; below are the main changes and fixes applied:
- Polished UI/UX: refined `ButtonPrimary`, `InputField`, `TodoItem`, and screen layout for a more modern look and macOS-friendly UI
- Centralized API base URL selection with `src/api/config.js` — helps mobile devices and emulators reach the backend by computing the hostname (LAN, emulator host, or explicit env var)
- Updated `AuthContext` to use new API base and to set `axios.defaults.baseURL` for consistent network calls
- Added `FRONTEND_README.md` troubleshooting steps for QR scanning and mobile connectivity
- Fixed frontend unit testing issues related to `jest-expo` and `strip-ansi` & `ansi-regex` versions; adjusted `jest.config.js` and dependencies where appropriate
- Backend startup improvements and verification: `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` works and includes `/health` endpoint
- Added helpful development debug messages so devs can quickly see which API base the app uses during development builds
- Updated CI and test suites to ensure both frontend and backend tests run correctly
- Cleaned up dependencies and lockfiles, and updated documentation for running the project locally

---

## Setup & Development (Local)
There are two parts you need to run: backend (FastAPI) and frontend (Expo). They can both run locally.

1. Backend

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
# (optional) run migrations
alembic upgrade head
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The backend will be available at `http://0.0.0.0:8000` on your host machine. Ensure that the port is reachable from other devices if you plan to scan and open the app on a mobile device.

2. Frontend

```bash
cd /workspaces/todo-app
pnpm install
# Define the API URL for the backend when required (especially for mobile devices):
export REACT_NATIVE_API_URL="http://<YOUR_LOCAL_IP>:8000"
pnpm start
```

When Expo opens, press:
- `m` to open macOS client (if you have macOS native support)
- `i` for iOS simulator
- `a` for Android emulator
- `w` for browser (web target)

For physical devices via QR:
- Set `REACT_NATIVE_API_URL` to your local machine IP or use ngrok and set `REACT_NATIVE_API_URL` to the public ngrok URL. See `FRONTEND_README.md` for full instructions.

---

## Tests

Backend (pytest):

```bash
cd backend
source .venv/bin/activate
pytest -q
```

Frontend (Jest):

```bash
pnpm test
```

Note: Due to Expo SDK and Jest versions, there were compatibility issues; some tests required dependency adjustments (see `package.json`). If there are failing tests related to node modules like strip-ansi/ansi-regex, try a clean install and ensure `jest-expo` matches your Expo SDK.

---

## CI / GitHub Actions
- Back-end: `/.github/workflows/backend-ci.yml` — runs `pytest`, checks for lints
- Front-end: `/.github/workflows/frontend-ci.yml` — runs `pnpm test` and populates coverage

---

## Common Issues & Troubleshooting
- QR scanning works fine but the app shows no data: This usually means the app can’t reach the backend because the device sees `127.0.0.1` as itself. Use `REACT_NATIVE_API_URL` or the LAN IP.
- Unit tests or `jest` failures tied to `ansi-regex` or `strip-ansi`: Make sure you use versions compatible with your Node environment and `jest-expo` preset.
- Backend not accessible from device: run the backend with `--host 0.0.0.0`, or use a tunnel (ngrok) to expose your backend.

---

## Contribution & Next Steps
- Add E2E tests (Detox for native, Playwright for web)
- Improve CI artifacts for mobile builds (EAS and/or platform-specific fastlane scripts)
- Add a production-ready Postgres config and migration/seed setup
- Add an optional admin UI for the backend

---

If you'd like, I can now:
1. Make the `API URL` configurable in the app UI (so you can switch between local/lan/ngrok without editing env variable).
2. Add a small development overlay to display the computed API base and last network errors for quick mobile debugging.
3. Add e2e flows and start automated builds to validate the full app on CI.

Thank you — let's make this app production ready!
# Todo App - Full Stack (Expo + FastAPI)

This repository contains a complete full-stack TODO mobile application built with React Native (Expo) for the frontend and FastAPI for the backend.

## Setup - Backend

Open a terminal and run the backend (FastAPI):

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export JWT_SECRET=mysecret
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Setup - Frontend

1. Install dependencies

```bash
pnpm install
```

2. Start Expo

```bash
pnpm start
```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## SDLC & QA

- Development: feature branches per task, use PRs, include tests.
- CI: GitHub Actions runs frontend and backend tests on PRs (see `.github/workflows`).
- Testing: run `pytest` in `backend/` and `pnpm test` in project root for frontend.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
