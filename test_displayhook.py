import sys
#>python 
#import sys; sys.path.append("/Users/dc/test_stuff")
#from test_displayhook import ExpressionCounter
#>>>2+2 
#will return the __call__ print statements. Teh result 4 is in that output 
#
class ExpressionCounter:

    def __init__(self):
        print("init called when ctor or object is created")
        self.count = 0
        self.previous_value = self
    #in the python shell when ExpressionCounter is imported when 
    #an expression is evaluated __call__ will be called when a result is displayed
    #after the expression evaluation
    def __call__(self, value):
        print("__call__ when ExpressionCounter() is called")
        print ('  Previous:', self.previous_value)
        print ('  New     :', value)
        if value != self.previous_value:
            self.count += 1
            sys.ps1 = '(%3d)> ' % self.count
        self.previous_value = value
        sys.__displayhook__(value)

print ('setting sys displayhook to this object')
sys.displayhook = ExpressionCounter()

