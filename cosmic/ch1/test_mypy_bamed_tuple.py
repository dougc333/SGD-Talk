from typing import NamedTuple
from uuid import UUID
from typing import Mapping
from typing import Any
import uuid
 
class A(NamedTuple):
    foo:str

class B(NamedTuple):
    bar:str

##why doesnt this class equality not work? 
print("this should be False:",A("aa")==B('aa'))
print(sorted([A("bb"),B("aa"),A("aa")]))

class User:
    def __init__(self,id:UUID,username:str)->None:
        self.id=id
        self.username=username
    @classmethod
    def from_dict(cls,data:Mapping[str,Any])->'User':
        return cls(UUID(data['id']),str(data['username']))

u1 = User(uuid.uuid4(), "bob")
u2 = User(uuid.uuid4(), "ann")
print("u1==u2 should be False:",u2==u2)
print(dir(u1))

