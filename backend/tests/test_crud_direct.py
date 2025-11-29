from app import crud


def test_create_user_and_todo(db_session):
    u = crud.create_user(db_session, 'c@t.com', 'hashedpw')
    assert u.email == 'c@t.com'
    todo = crud.create_todo(db_session, 'hello', u.id)
    assert todo.owner_id == u.id
    got = crud.get_todo(db_session, todo.id)
    assert got.title == 'hello'
    todo2 = crud.mark_completed(db_session, got)
    assert todo2.completed is True
