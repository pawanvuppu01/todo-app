"""initial

Revision ID: 0001
Revises: 
Create Date: 2025-11-29 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('email', sa.String(), nullable=False, unique=True),
        sa.Column('hashed_password', sa.String(), nullable=False),
    )
    op.create_table(
        'todos',
        sa.Column('id', sa.Integer(), primary_key=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('completed', sa.Boolean(), default=False),
        sa.Column('owner_id', sa.Integer(), sa.ForeignKey('users.id')),
    )


def downgrade():
    op.drop_table('todos')
    op.drop_table('users')
