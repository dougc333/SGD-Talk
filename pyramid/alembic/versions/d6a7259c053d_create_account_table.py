"""create account table

Revision ID: d6a7259c053d
Revises: aa892ff802bf
Create Date: 2023-01-19 13:06:40.505569

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd6a7259c053d'
down_revision = 'aa892ff802bf'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'account',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('description', sa.Unicode(200)),
    )


def downgrade() -> None:
    op.drop_table('account')

