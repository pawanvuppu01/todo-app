from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from ..schemas import TodoCreate, TodoResponse
from ..db import get_db
from ..auth import get_current_user
from .. import crud

router = APIRouter(prefix="/todos", tags=["todos"])


@router.get("/", response_model=List[TodoResponse])
def list_todos(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_todos(db, current_user.id)


@router.post("/", response_model=TodoResponse)
def create_todo(todo: TodoCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.create_todo(db, todo.title, current_user.id)


@router.patch("/{todo_id}", response_model=TodoResponse)
def patch_todo(todo_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    todo = crud.get_todo(db, todo_id)
    if not todo or todo.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Todo not found")
    todo = crud.mark_completed(db, todo)
    return todo
