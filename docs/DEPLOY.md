# Deployment Guide

This guide explains deploying the backend and frontend for the Todo app.

## Backend (production)
- Recommend using Postgres (managed DB) and setting `DATABASE_URL=postgresql://user:pass@host:port/dbname`.
- Run migrations:
  ```bash
  source .venv/bin/activate
  alembic upgrade head
  ```
- Deploy with uvicorn or gunicorn: containerize app or use process manager:
  ```bash
  uvicorn app.main:app --host 0.0.0.0 --port 8000
  ```
- Setup env vars: `JWT_SECRET`, `DATABASE_URL`, `ENV=production`.

## Frontend
- Build vanilla Expo app or EAS for production:
  ```bash
  # Expo classic build
  pnpm publish
  # or EAS (recommended for builds)
  eas build --platform ios
  eas build --platform android
  ```

- Set `REACT_NATIVE_API_URL` environment variable to the backend URL on the build or environment.

## Notes
- Ensure HTTPS is used for API endpoints in production.
- Rotate JWT secret and enforce secure cookie / token handling.
