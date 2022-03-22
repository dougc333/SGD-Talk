the smallest object defined for this example is orderline, not order or product. 
An order is composed of many order lines. 
An order line is a sku, quantity and price. There is a principle to keep these 3 objects together in a model dataclass
instead of having multiple data structures for products, orders, users. 

The idea is to start at the domain level defined as orders between System, buying team and customer. This is the domain definition. You can choose your domain definition and model from there. This is different approach than starting with the objects first, customers, buyers, orders, products. 