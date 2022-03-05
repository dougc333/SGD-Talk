
from datetime import date

class Batch:
    def __init__(self, batchName, itemName, qty, eta):
        self.batchName=batchName
        self.itemName = itemName
        self.available_quantity = qty
        self.eta = eta
    def allocate(self,orderLine):
        self.available_quantity -=orderLine.qty
        
class OrderLine:
    def __init__(self, orderName, itemName,qty):
        self.orderName=orderName
        self.itemName = itemName
        self.qty = qty
    

def test_allocating_to_a_batch_reduces_the_available_quantity():
    batch = Batch("batch-001", "SMALL-TABLE", qty=20, eta=date.today())
    line = OrderLine('order-ref', "SMALL-TABLE", 2)

    batch.allocate(line)

    assert batch.available_quantity == 18
    
test_allocating_to_a_batch_reduces_the_available_quantity()

