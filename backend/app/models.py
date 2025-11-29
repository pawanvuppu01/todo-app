from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from .db import Base


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    todos = relationship("Todo", back_populates="owner")


class Todo(Base):
    __tablename__ = "todos"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    completed = Column(Boolean, default=False)
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="todos")


# Chat models
from sqlalchemy import DateTime, Text, Table
from datetime import datetime


conversation_participants = Table(
    "conversation_participants",
    Base.metadata,
    Column("conversation_id", Integer, ForeignKey("conversations.id")),
    Column("user_id", Integer, ForeignKey("users.id")),
)


class Conversation(Base):
    __tablename__ = "conversations"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=True)
    is_group = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    participants = relationship("User", secondary=conversation_participants)
    messages = relationship("Message", back_populates="conversation")


class Message(Base):
    __tablename__ = "messages"
    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    sender_id = Column(Integer, ForeignKey("users.id"))
    content = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    edited = Column(Boolean, default=False)
    deleted = Column(Boolean, default=False)

    conversation = relationship("Conversation", back_populates="messages")
    sender = relationship("User")
