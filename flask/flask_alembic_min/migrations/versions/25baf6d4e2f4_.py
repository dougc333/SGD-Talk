"""empty message

Revision ID: 25baf6d4e2f4
Revises: 
Create Date: 2023-07-19 11:45:29.555455

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '25baf6d4e2f4'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=True),
    sa.Column('email', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    # ### end Alembic commands ###