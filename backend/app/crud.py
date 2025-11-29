from sqlalchemy.orm import Session
from . import models, schemas
from sqlalchemy import select
from datetime import datetime


def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def create_user(db: Session, email: str, hashed_password: str):
    user = models.User(email=email, hashed_password=hashed_password)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def create_todo(db: Session, title: str, owner_id: int):
    todo = models.Todo(title=title, owner_id=owner_id)
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


def get_todos(db: Session, owner_id: int):
    return db.query(models.Todo).filter(models.Todo.owner_id == owner_id).all()


def get_todo(db: Session, todo_id: int):
    return db.query(models.Todo).filter(models.Todo.id == todo_id).first()


def mark_completed(db: Session, todo: models.Todo):
    todo.completed = True
    db.add(todo)
    db.commit()
    db.refresh(todo)
    return todo


# Chat CRUD
def create_conversation(db: Session, title: str = None, participant_ids: list[int] = None, is_group: bool = False):
    conv = models.Conversation(title=title, is_group=is_group)
    if participant_ids:
        users = db.query(models.User).filter(models.User.id.in_(participant_ids)).all()
        conv.participants = users
    db.add(conv)
    db.commit()
    db.refresh(conv)
    return conv


def get_conversations_for_user(db: Session, user_id: int):
    # simple join: conversations where user is a participant
    return db.query(models.Conversation).filter(models.Conversation.participants.any(models.User.id == user_id)).all()


def get_messages(db: Session, conversation_id: int, limit: int = 100):
    return db.query(models.Message).filter(models.Message.conversation_id == conversation_id).order_by(models.Message.created_at.desc()).limit(limit).all()[::-1]


def create_message(db: Session, conversation_id: int, sender_id: int, content: str):
    msg = models.Message(conversation_id=conversation_id, sender_id=sender_id, content=content, created_at=datetime.utcnow())
    db.add(msg)
    db.commit()
    db.refresh(msg)
    return msg
