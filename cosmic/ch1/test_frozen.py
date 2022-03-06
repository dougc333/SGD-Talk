
from dataclasses import dataclass

@dataclass(frozen=True) 
class OrderLine:
    orderid: str
    sku: str
    qty: int
    
ol=OrderLine('order-ref', "SMALL-TABLE", 2)
print("ol:",ol)

class Order:
    def __init__(self):   
        self.order_ref:str
        self.orderLines:list[OrderLine]
o1=Order()
print("o1:",o1)