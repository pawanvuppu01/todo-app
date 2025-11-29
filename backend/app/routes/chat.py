from fastapi import APIRouter, Depends, WebSocket, WebSocketDisconnect, HTTPException
from sqlalchemy.orm import Session
from typing import List
from ..schemas import ConversationCreate, ConversationResponse, MessageCreate, MessageResponse
from ..db import get_db
from ..auth import get_current_user, get_user_from_token
from .. import crud

router = APIRouter(prefix="/chat", tags=["chat"])


@router.get("/conversations", response_model=List[ConversationResponse])
def list_conversations(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    return crud.get_conversations_for_user(db, current_user.id)


@router.post("/conversations", response_model=ConversationResponse)
def create_conversation(conv: ConversationCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # find participant ids by email
    participant_ids = []
    if conv.participant_emails:
        for e in conv.participant_emails:
            u = crud.get_user_by_email(db, e)
            if u:
                participant_ids.append(u.id)
    # ensure current user is added
    if current_user.id not in participant_ids:
        participant_ids.append(current_user.id)
    c = crud.create_conversation(db, title=conv.title, participant_ids=participant_ids, is_group=False if len(participant_ids)<=2 else True)
    return c


@router.get("/conversations/{conv_id}/messages", response_model=List[MessageResponse])
def get_conv_messages(conv_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # basic permission: check participation
    convs = crud.get_conversations_for_user(db, current_user.id)
    if not any(c.id == conv_id for c in convs):
        raise HTTPException(status_code=404, detail="Conversation not found")
    return crud.get_messages(db, conv_id)


@router.post("/conversations/{conv_id}/messages", response_model=MessageResponse)
def post_message(conv_id: int, m: MessageCreate, current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    # permission check
    convs = crud.get_conversations_for_user(db, current_user.id)
    if not any(c.id == conv_id for c in convs):
        raise HTTPException(status_code=404, detail="Conversation not found")
    msg = crud.create_message(db, conv_id, current_user.id, m.content)
    # broadcast via WebSocket manager if present
    try:
        from .chat_ws_manager import manager
        manager.broadcast(conv_id, {"id": msg.id, "conversation_id": msg.conversation_id, "sender_id": msg.sender_id, "content": msg.content, "created_at": str(msg.created_at)})
    except Exception:
        pass
    return msg


@router.websocket("/ws/conversations/{conv_id}")
async def websocket_endpoint(websocket: WebSocket, conv_id: int):
    # perform token validation from query params or headers
    # Accept ?token=... or Authorization header
    token = websocket.query_params.get("token")
    if not token:
        auth = websocket.headers.get("authorization")
        if auth and auth.lower().startswith("bearer "):
            token = auth.split(" ", 1)[1]

    # validate user
    from ..db import SessionLocal
    db = SessionLocal()
    user = None
    if token:
        user = get_user_from_token(token, db)

    if not user:
        await websocket.close(code=1008)
        return

    # check participation
    convs = crud.get_conversations_for_user(db, user.id)
    if not any(c.id == conv_id for c in convs):
        await websocket.close(code=1008)
        return

    await websocket.accept()
    try:
        from .chat_ws_manager import manager
        await manager.connect(conv_id, websocket, user.id)
        while True:
            data = await websocket.receive_text()
            # on receiving text, persist as message and broadcast
            msg = crud.create_message(db, conv_id, user.id, data)
            manager.broadcast(conv_id, {"id": msg.id, "conversation_id": msg.conversation_id, "sender_id": msg.sender_id, "content": msg.content, "created_at": str(msg.created_at)})
    except WebSocketDisconnect:
        from .chat_ws_manager import manager
        await manager.disconnect(conv_id, websocket)
    finally:
        db.close()
