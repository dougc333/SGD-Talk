from sqlalchemy.orm import mapper, relationship
from sqlalchemy import Table

import model  #(1)


metadata = MetaData()

order_lines = Table(  #(2)
    "order_lines",
    metadata,
    Column("id", Integer, primary_key=True, autoincrement=True),
    Column("sku", String(255)),
    Column("qty", Integer, nullable=False),
    Column("orderid", String(255)),
)

...

def start_mappers():
    lines_mapper = mapper(model.OrderLine, order_lines)  #(3)
