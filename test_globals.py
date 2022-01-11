class A:
  def __init__(self):
     self.A=10
     import pandas as pd
  #print(globals())

a=A()
import numpy as np
#b=np.array([1,2,3,4])

print("globals:")
print("globals, everything in python runtime:",globals())
print("dir:",dir(A))
