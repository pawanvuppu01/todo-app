# Todo App - Backend (FastAPI)

This is the backend for the Todo full-stack app built with FastAPI and SQLite.

## Features
- JWT-based authentication (signup/login)
- Create/list/complete todos
- SQLAlchemy models with SQLite

## Requirements
- Python 3.10+
- pip or poetry

## Setup (pip)

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export JWT_SECRET=mysecret
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Example - create user & todo

```bash
curl -X POST "http://127.0.0.1:8000/auth/signup" -H "Content-Type: application/json" -d '{"email":"me@local.com","password":"secret"}'
curl -X POST "http://127.0.0.1:8000/auth/login" -H "Content-Type: application/json" -d '{"email":"me@local.com","password":"secret"}'
```

## Running tests

```bash
source .venv/bin/activate
pytest -q
```

## Database migrations (alembic)

```bash
# Create migration
alembic revision --autogenerate -m "Initial"
alembic upgrade head
```

## API Endpoints
- POST /auth/signup { email, password } -> create account
- POST /auth/login { email, password } -> returns { access_token }
- GET /todos -> list todos for the logged-in user (header: token or Authorization)
- POST /todos { title } -> create a todo
- PATCH /todos/{id} -> mark todo as completed

## Notes
- The application uses a simple SQLite DB (`db.sqlite3`) by default. Set `DATABASE_URL` env var to change.
