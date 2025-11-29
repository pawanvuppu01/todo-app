# Commands to push to Separate GitHub Repositories

## Frontend

```bash
# From repo root
mkdir temp-frontend
cp -R app src package.json pnpm-lock.yaml pnpm-workspace.yaml assets components constants hooks scripts FRONTEND_README.md temp-frontend/
cd temp-frontend
git init
git add .
git commit -m "Initial commit - Todo frontend (Expo)"
# Create repo on GitHub (replace USERNAME)
gh repo create USERNAME/todo-frontend --public --source=. --remote=origin
git push -u origin main
```

## Backend

```bash
mkdir temp-backend
cp -R backend backend/* temp-backend/
cd temp-backend
git init
git add .
git commit -m "Initial commit - Todo backend (FastAPI)"
# Create repo on GitHub (replace USERNAME)
gh repo create USERNAME/todo-backend --public --source=. --remote=origin
git push -u origin main
```

## Notes
- Replace USERNAME with your Github username.
- If you don't have `gh` (GitHub CLI), create the repositories on the web, then add remote using: `git remote add origin git@github.com:USERNAME/repo.git` and push.
