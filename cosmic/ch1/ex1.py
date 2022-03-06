
from dataclasses import dataclass
from datetime import date
from typing import Optional

#not frozen
class Batch:
    def __init__(self, bName:str, iName:str, qty:int, eta:Optional[date]):
        self.batchName=bName
        self.sku =iName
        self.available_quantity=qty
        eta = eta
    def allocate(self,orderLine):
        self.available_quantity -=orderLine.qty
    def can_allocate(self,orderLine):
        #not sure what this does? compares teh 2 and returns boolean
        if orderLine.qty>self.available_quantity or orderLine.sku!=self.sku:
            return False
        return True
        


@dataclass(frozen=True)
class OrderLine:
    orderName : str
    sku : str
    qty : int
    


def make_batch_and_line(sku, batch_qty, line_qty):
    return (
        Batch("batch-001", sku, batch_qty, eta=date.today()),
        OrderLine("order-123", sku, line_qty)
    )


def test_allocating_to_a_batch_reduces_the_available_quantity():
    batch = Batch("batch-001", "SMALL-TABLE", qty=20, eta=date.today())
    line = OrderLine('order-ref', "SMALL-TABLE", 2)
    batch.allocate(line)

    assert batch.available_quantity == 18
    
def test_can_allocate_if_available_greater_than_required():
    large_batch, small_line = make_batch_and_line("ELEGANT-LAMP", 20, 2)
    assert large_batch.can_allocate(small_line)

def test_cannot_allocate_if_available_smaller_than_required():
    small_batch, large_line = make_batch_and_line("ELEGANT-LAMP", 2, 20)
    assert small_batch.can_allocate(large_line) is False

def test_can_allocate_if_available_equal_to_required():
    batch, line = make_batch_and_line("ELEGANT-LAMP", 2, 2)
    assert batch.can_allocate(line)

def test_cannot_allocate_if_skus_do_not_match():
    batch = Batch("batch-001", "UNCOMFORTABLE-CHAIR", 100, eta=None)
    different_sku_line = OrderLine("order-123", "EXPENSIVE-TOASTER", 10)
    assert batch.can_allocate(different_sku_line) is False

test_allocating_to_a_batch_reduces_the_available_quantity()
test_can_allocate_if_available_greater_than_required()
test_cannot_allocate_if_available_smaller_than_required()
test_can_allocate_if_available_equal_to_required()
test_cannot_allocate_if_skus_do_not_match()

