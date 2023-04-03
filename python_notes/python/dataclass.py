import random
import string
from dataclasses import dataclass,field

def gen_id()->str:
    return "".join(random.choices(string.ascii_lowercase,k=6))

#as we add ivars we need to midify the __str__  and add fields to init. 
#redundant work, eliminate with dataclass. 
class Person:
    def __init__(self,name,address) -> None:
        self.name=name
        self.address=address
        self.list_of_stuff=[4,5,6] #only on init, every instnce has reference to same list 
                                   #default values get copied to all instances
        
    def __str__(self):
        return f"{self.name} lives at: {self.address} owns:{self.list_of_stuff}"


#can add ivars by only adding to class definition. dont need __str__
#data class useds fields and default factory to replace some functionality done in __init__
@dataclass
class Dog:
    name:str
    address:str
    list_of_stuff:list[int] = field(default_factory=list) #empty list for each instance
    dogtag:str=field(init=False, default_factory=gen_id) #we want a random id for each instance

def main()->None:
    p = Person(name="bob",address="111 a street")
    p1 = Person(name="Ann",address="222 b st")
    
    p1.list_of_stuff=[1,2,3]  
    print ("p:",p)
    print ("p1:",p1)
    dog = Dog("Simon",address="22 dog house")
    dog1 = Dog("tom",address="11 dog house")
    print(dog)
    print(dog1)

if __name__=="__main__":
    main()