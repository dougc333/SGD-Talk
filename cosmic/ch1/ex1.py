
from dataclasses import dataclass
from datetime import date
from typing import Optional
import itertools
import pytest


# some design problems:
# 1) autoincrement the id, if you autoincrement, save last known for startup
# 2) correlate w/db. have db create pk then read from db
# 3) integrity check on id, if you create it make sure there are no holes
# else DB responsibility. Built into db autoincrement index. Guaranteed to be atomic
# thread safe and fault tolerant in DB. 
# 4) microservice, need lock for shared state. db has locks, you dont see them
# 

#not frozen
class Batch:
    def __init__(self, batch_id:str, sku:str, qty:int, eta:Optional[date]):
        reference_id:batch_id
        self.batchName=batch_id
        self.sku =sku;
        self.available_quantity=qty
        self.eta = eta
        self.allocated_orderlines=[]
        
    def allocate(self,orderLine):
        if self.can_allocate(orderLine)==True:
            self.available_quantity -=orderLine.qty
            self.allocated_orderlines.append(orderLine)
        
    def can_allocate(self,orderLine):
        if orderLine.qty>self.available_quantity or orderLine.sku!=self.sku or self.search(orderLine)==True:
            return False
        return True
    
    def deallocate(orderLine):
        #search for allocated orderLines and deallocate it
        #this isnt the correct method we need a search orderLine to return True or False
        print("deallocate orderLine")
        
    def search(self,orderLine):
        for x in self.allocated_orderlines:
            if x==orderLine:
                return True
        return False
        
        
class Product:
    sku:str

class Customer:
    cust_name:str
    def place_order(sku, quantity):
        #how to generate an orderref? 
        return Order(str(quantity)+" units of "+sku,sku, quantity)
        

@dataclass(frozen=True)
class OrderLine:
    orderName : str
    sku : str
    qty : int
    

@dataclass(frozen=True)
class Order:
    def __init__(self):   
        self.order_ref:str
        self.order_reference:int
        self.orderLines:list[OrderLine]

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

def test_search_orderline():
    batch = Batch("batch-001", "UNCOMFORTABLE-CHAIR", 100, eta=None)
    ol1 = OrderLine("order_test1","UNCOMFORTABLE-CHAIR", 1)
    batch.allocate(ol1)
    assert batch.search(ol1) is True
#this is kind of a funny interface. Batch is created by someone which orders inventory. 
#
#it is really a set? all of these are unique? Doesnt make sense
def test_allocation_is_idempotent():
    batch, line = make_batch_and_line("ANGULAR-DESK", 20, 2)
    batch.allocate(line)
    batch.allocate(line)
    assert batch.available_quantity == 18
    
def test_prefers_current_stock_batches_to_shipments():
    in_stock_batch = Batch("in-stock-batch", "RETRO-CLOCK", 100, eta=None)
    shipment_batch = Batch("shipment-batch", "RETRO-CLOCK", 100, eta=tomorrow)
    line = OrderLine("oref", "RETRO-CLOCK", 10)

    allocate(line, [in_stock_batch, shipment_batch])

    assert in_stock_batch.available_quantity == 90
    assert shipment_batch.available_quantity == 100


def test_prefers_earlier_batches():
    earliest = Batch("speedy-batch", "MINIMALIST-SPOON", 100, eta=today)
    medium = Batch("normal-batch", "MINIMALIST-SPOON", 100, eta=tomorrow)
    latest = Batch("slow-batch", "MINIMALIST-SPOON", 100, eta=later)
    line = OrderLine("order1", "MINIMALIST-SPOON", 10)

    allocate(line, [medium, earliest, latest])

    assert earliest.available_quantity == 90
    assert medium.available_quantity == 100
    assert latest.available_quantity == 100


def test_returns_allocated_batch_ref():
    in_stock_batch = Batch("in-stock-batch-ref", "HIGHBROW-POSTER", 100, eta=None)
    shipment_batch = Batch("shipment-batch-ref", "HIGHBROW-POSTER", 100, eta=tomorrow)
    line = OrderLine("oref", "HIGHBROW-POSTER", 10)
    allocation = allocate(line, [in_stock_batch, shipment_batch])
    assert allocation == in_stock_batch.reference

    
from datetime import timedelta
today = date.today()
tomorrow = today + timedelta(days=1)
later = tomorrow + timedelta(days=10)





def test_prefers_warehouse_batches_to_shipments():
    print("I dont know whwat this is")


def test_prefers_earlier_batches():
    print("dont know thwa this iss")



test_allocating_to_a_batch_reduces_the_available_quantity()
test_can_allocate_if_available_greater_than_required()
test_cannot_allocate_if_available_smaller_than_required()
test_can_allocate_if_available_equal_to_required()
test_cannot_allocate_if_skus_do_not_match()
test_search_orderline()
test_allocation_is_idempotent()
