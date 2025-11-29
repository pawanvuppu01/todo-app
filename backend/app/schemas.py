from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        orm_mode = True


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: Optional[UserResponse] = None


class TodoCreate(BaseModel):
    title: str


class TodoResponse(BaseModel):
    id: int
    title: str
    completed: bool

    class Config:
        orm_mode = True


# Chat schemas
class ConversationCreate(BaseModel):
    title: Optional[str] = None
    participant_emails: Optional[list[str]] = []


class ConversationResponse(BaseModel):
    id: int
    title: Optional[str]
    is_group: bool

    class Config:
        orm_mode = True


class MessageCreate(BaseModel):
    content: str


class MessageResponse(BaseModel):
    id: int
    conversation_id: int
    sender_id: int
    content: str
    created_at: Optional[datetime]

    class Config:
        orm_mode = True
