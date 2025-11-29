import pytest


def test_conversation_and_message_flow(client):
    # create two users
    client.post("/auth/signup", json={"email": "a@t.com", "password": "pass"})
    client.post("/auth/signup", json={"email": "b@t.com", "password": "pass"})

    r1 = client.post("/auth/login", json={"email": "a@t.com", "password": "pass"})
    token1 = r1.json()["access_token"]
    r2 = client.post("/auth/login", json={"email": "b@t.com", "password": "pass"})
    token2 = r2.json()["access_token"]

    # create conversation from user A including B
    resp = client.post("/chat/conversations", json={"participant_emails": ["b@t.com"]}, headers={"Authorization": f"Bearer {token1}"})
    assert resp.status_code == 200
    conv = resp.json()
    conv_id = conv["id"] if isinstance(conv, list) else conv["id"]

    # open websocket as user B and listen (use /chat prefix)
    with client.websocket_connect(f"/chat/ws/conversations/{conv_id}?token={token2}") as ws:
        # send a message as user A via REST
        resp = client.post(f"/chat/conversations/{conv_id}/messages", json={"content": "hello from A"}, headers={"Authorization": f"Bearer {token1}"})
        assert resp.status_code == 200
        msg = resp.json()
        # B should receive broadcast
        data = ws.receive_json()
        assert data.get("content") == "hello from A" or data.get("id") == msg["id"] or data.get("conversation_id") == msg["conversation_id"]
