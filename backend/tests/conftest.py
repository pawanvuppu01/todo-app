import os
import sys
import tempfile
import pytest
from starlette.testclient import TestClient

# Ensure DATABASE_URL is set to a temp SQLite file for tests
fd, tmp = tempfile.mkstemp(suffix=".sqlite3")
os.close(fd)
os.environ["DATABASE_URL"] = f"sqlite:///{tmp}"
# Ensure backend package path is visible to python imports
sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from app.main import app
from app.db import engine, Base, SessionLocal


@pytest.fixture(scope="session")
def client():
    # ensure db tables are setup for the test db
    Base.metadata.create_all(bind=engine)
    with TestClient(app) as c:
        yield c


@pytest.fixture(scope="function")
def db_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()
