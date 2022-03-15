from abc import abstractmethod
import abc

#https://docs.python.org/3/library/abc.html
#1) abc.ABC and @abstract method for abstract class usage. 
#2) abstract classes can have impl unlike Java. Can you have data in ABC? 


class SomeAbstractClass(abc.ABC):
    @abstractmethod
    def foo():
        raise NotImplementedError
    
class FirstClass(SomeAbstractClass):
    def __init__(self):
        print("FirstClass __init:__")
    
class SecondClass(SomeAbstractClass):
    def __init__(self):
        print("SecondClass __init__ implemented abstract method")
    def foo(self):
        print("SecondClass foo()")

try:
   fc = FirstClass()
except:
   print("errro FirstClass didnt implement abstract method")
try:
   sc = SecondClass()
except:
   print("Err sc")