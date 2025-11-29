def test_create_and_complete_todo_flow(client):
    # Create user & login
    client.post("/auth/signup", json={"email": "todo@t.com", "password": "pass"})
    resp = client.post("/auth/login", json={"email": "todo@t.com", "password": "pass"})
    token = resp.json()["access_token"]

    # Create todo
    resp = client.post("/todos", json={"title": "Test Task"}, headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    todo = resp.json()
    assert todo["title"] == "Test Task"
    assert todo["completed"] is False

    # List todos
    resp = client.get("/todos", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    data = resp.json()
    assert len(data) >= 1

    # Complete todo
    resp = client.patch(f"/todos/{todo['id']}", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    todo2 = resp.json()
    assert todo2["completed"] is True
