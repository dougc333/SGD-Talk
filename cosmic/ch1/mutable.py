#mutable objects cant be in sets
#all immutable objects ate hashable so they can be in sets
#use default or implement __hash__ to make it look immutabe

#from typing import List
from __future__ import annotations

class Mutable:
  def __init__(self,l:list[int]):
    self.a=l
  def __hash__(self):
      print("hash call")
      return len(self.a)
  def __eq__(self,other):
      print("eq call")
      if not isinstance(other,Mutable):
          return False
      return self.a==other.a

print('[1,2]==[1]:',[1,2]==[1])
m1=Mutable([1,2])
m2=Mutable([3,4])
m3=Mutable([3,4])
s={m1,m2,m3}
print("2 items in s:",s)
#sets are mutable so you cant put them in sets but you can freeze it!!! wow...
#t={{1,2},{3,4}}
t={frozenset({1,2}),frozenset({3,4})}