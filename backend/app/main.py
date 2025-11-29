from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .db import engine, Base
from .routes import auth, todos
from fastapi.staticfiles import StaticFiles
from .routes import chat

app = FastAPI()

# Create DB tables
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth)
app.include_router(todos)
app.include_router(chat)

# Serve uploaded media files from /media
import os
media_dir = os.path.join(os.path.dirname(__file__), '..', 'media')
media_dir = os.path.abspath(media_dir)
os.makedirs(media_dir, exist_ok=True)
app.mount("/media", StaticFiles(directory=media_dir), name="media")


@app.get("/health")
def healthcheck():
    return {"status": "ok"}
