
from dataclasses import dataclass

@dataclass(frozen=True) 
class OrderLine:
    orderid: str
    sku: str
    qty: int
    
ol=OrderLine('order-ref', "SMALL-TABLE", 2)
print("ol:",ol)