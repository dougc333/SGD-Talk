
# there are 2 parts to the decorator
#1) the decorator function which wraps any function, the function name is the 
# same as the @decorator annotation and the argument is fn or a generic function reference
# we standardize on fn
#2) a wrapper function which executes fn, and returns the object from executing fn
# the wrapper function has **kwargs and *args to allow args in fn, the wrapper returns
#the fn object and the wrapper function is returned in the decorator
#3)testcode: annotation on top of function to e decorated
#


def decorator_example(fn):
    def wrapper( *args,**kwargs ):
        print('before fn')
        res = fn(*args,**kwargs)
        print('after fn')
        return res
    return wrapper

@decorator_example
def test_me(a,b):
    print("sum:",(a+b))

test_me(2,3)

