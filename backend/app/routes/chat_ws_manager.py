from typing import Dict, Set
from fastapi import WebSocket


class ConnectionManager:
    def __init__(self):
        # mapping conv_id -> set of (websocket, user_id)
        self.active: Dict[int, Set[tuple]] = {}

    async def connect(self, conv_id: int, websocket: WebSocket, user_id: int):
        if conv_id not in self.active:
            self.active[conv_id] = set()
        self.active[conv_id].add((websocket, user_id))

    async def disconnect(self, conv_id: int, websocket: WebSocket):
        if conv_id in self.active:
            to_remove = [t for t in self.active[conv_id] if t[0] == websocket]
            for t in to_remove:
                self.active[conv_id].remove(t)

    def broadcast(self, conv_id: int, message: dict):
        # Send message to all connections for the conversation.
        # If an asyncio event loop is running we schedule send coroutines with
        # create_task; otherwise fall back to running the coroutine synchronously
        # with asyncio.run so tests (which may not have a running loop) work
        # without leaving un-awaited coroutine objects.
        conns = list(self.active.get(conv_id, []))
        import asyncio
        for ws, _uid in conns:
            try:
                try:
                    loop = asyncio.get_running_loop()
                except RuntimeError:
                    # No running loop — run send synchronously (blocking)
                    asyncio.run(ws.send_json(message))
                else:
                    # Schedule send on the running loop
                    loop.create_task(ws.send_json(message))
            except Exception:
                # try to remove dead socket
                try:
                    self.active[conv_id].remove((ws, _uid))
                except Exception:
                    pass


manager = ConnectionManager()
