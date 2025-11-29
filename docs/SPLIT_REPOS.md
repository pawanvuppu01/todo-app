# Splitting the Project Into Two GitHub Repos

This repo contains both frontend and backend. To create two separate GitHub repositories (frontend + backend), follow these steps:

## Create the frontend repo locally and push:

```bash
# From repo root
mkdir todo-frontend
cp -R app src package.json pnpm-lock.yaml pnpm-workspace.yaml README.md todo-frontend/
cd todo-frontend
git init
git add .
git commit -m "Frontend (Expo) for Todo App"
# Create GitHub repo (local CLI or in browser) and push
# Example using gh CLI
gh repo create <username>/todo-frontend --public --source=. --remote=origin
git push -u origin main
```

## Create the backend repo locally and push:

```bash
mkdir todo-backend
cp -R backend todo-backend/
cd todo-backend
git init
git add .
git commit -m "Backend (FastAPI) for Todo App"
# Create GitHub repo and push
gh repo create <username>/todo-backend --public --source=. --remote=origin
git push -u origin main
```

### Notes
- Replace `<username>` with your GitHub username.
- You can create private repos if you prefer: replace `--public` with `--private`.
- Make sure to add `.gitignore` and other repo settings as needed.
