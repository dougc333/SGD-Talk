from abc import abstractmethod
from typing import Protocol

#Protocol vs ABC
class Printable(Protocol):
    @abstractmethod
    def print(self)->None:
        print("we should use pass here")
        print("abstravct base classes take no impl")
        print("ABC no impl this should not be correct, but no error message")

            
class MyPrintable(Printable): 
    def print(self)->None:
        print("MyPrintable here")
        
class NonPrintable:
    def __init__(self):
        print("NonPrintableFiller ")
        
def fooo(printable:Printable):
    printable.print()
fooo(MyPrintable())
#fooo(NonPrintable)
