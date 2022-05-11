

#sigh... this isn't a good design decision in a large piece of code bc most of the classes dont use traits and you add it to all the classes
#traitlets vs. traits. 

from traitlets import List,HasTraits,Int, Unicode, default
import getpass

class Identity(HasTraits):
  username=Unicode()
  an_int=Int()
  ivar=10
  classes=List()

  @default('username')
  def _default_username(self):
    return getpass.getuser()
  @default("something")
  def fn(self):
    return 100

i=Identity()
print(i._default_username())
print(i.has_trait('username'))
print(i.has_trait('an_int'))
print(i.has_trait('ivar'))
print("a dict of traits", i.traits())
print("i.classes list traitlet:",i.classes)

