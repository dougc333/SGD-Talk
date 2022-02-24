
class FileNotFoundError(OSError):
  pass

class fn_try_catch:
  def __init__(self):
       try:
         filename = raw_input("filename with functions: ")
         self.stuff = open(filename).readlines()
         print("file exists:",self.stuff)
       except FileNotFoundError:
            print("incorrect file name or path")
  def clean(self):
       self.clean= [ x.strip() for x in self.stuff if x.strip()!='' ]
       print("self.clean:",self.clean)
  def add_try_except(self):
       #add try except 
fn = fn_try_catch()
fn.clean()


