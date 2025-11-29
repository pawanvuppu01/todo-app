# SDLC & QA checklist

This document describes the development lifecycle steps, test strategy, CI/CD pipeline, and release process for the Todo App.

## Development
- Feature branches should be used for new implementations.
- Rebase regularly with `main` before creating PR.
- Write unit tests for new features where applicable.

## Testing
- Backend tests run via `pytest` under `backend/tests/`.
- Frontend tests run via `jest`.
- Manual QA checklist: login/signup, create todos, complete todos, logout, token persistence.

## CI
- Backend: GitHub Actions `backend-ci.yml` and `backend-lint-test.yml` run pytest and a basic flake8 check.
- Frontend: GitHub Actions `frontend-ci.yml` runs jest tests.

## Deploy
- Backend: use production DB (Postgres) and set environment variables (`DATABASE_URL`, `JWT_SECRET`), and use standard uvicorn/gunicorn or containerized deployment.
- Frontend: build via Expo/EAS for release.

## Rollback
- Manual DB backup is recommended; use migration tools for schema changes and rollback.

## Release Steps
1. Merge PR to `main`.
2. CI runs tests and lint.
3. Deploy backend with the latest migration changes.
4. Build and distribute frontend release.

## Monitoring
- Add logs and use APM/monitoring service for production.

