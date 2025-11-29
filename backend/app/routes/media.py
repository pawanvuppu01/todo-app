from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from ..auth import get_current_user
from ..db import get_db
from sqlalchemy.orm import Session
import os
from uuid import uuid4

router = APIRouter(prefix="/media", tags=["media"])


@router.post("/upload")
async def upload_media(file: UploadFile = File(...), current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # Save file to backend/media with a random UUID name
    ext = os.path.splitext(file.filename)[1]
    if ext.lower() not in [".jpg", ".jpeg", ".png", ".gif", ".mp4", ".mov", ".wav", ".m4a"]:
        raise HTTPException(status_code=400, detail="Unsupported file type")
    dest_dir = os.path.join(os.path.dirname(__file__), '..', 'media')
    os.makedirs(dest_dir, exist_ok=True)
    filename = f"{uuid4().hex}{ext}"
    path = os.path.join(dest_dir, filename)
    with open(path, 'wb') as f:
        content = await file.read()
        f.write(content)
    # return URL
    url = f"/media/{filename}"
    return {"url": url}
