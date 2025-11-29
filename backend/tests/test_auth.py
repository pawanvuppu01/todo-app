def test_signup_and_login(client):
    # Signup
    resp = client.post("/auth/signup", json={"email": "test@t.com", "password": "pass"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "test@t.com"

    # Login
    resp = client.post("/auth/login", json={"email": "test@t.com", "password": "pass"})
    assert resp.status_code == 200
    data = resp.json()
    assert "access_token" in data
    token = data["access_token"]

    # me
    resp = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["email"] == "test@t.com"
