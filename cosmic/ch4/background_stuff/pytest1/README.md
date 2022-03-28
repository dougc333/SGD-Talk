configurationt through pytsst

1) fn name start w test eg. test_foo():
2) class name start with Test eg TestMyClass
3) test exceptions pytest.raises(ValueError,lambda:int("foo"))
   with pytest.raises(ValueError):
    int("foo")
well that is different....

https://blog.jetbrains.com/pycharm/2020/08/webinar-recording-simplify-your-tests-with-fixtures-with-oliver-bestwalter/

pytest --fixtures
pytest --fixtures-per-test
pytest --setup-plan
pytest --setup-only
pytest --setup-show

https://github.com/obestwalter/pytest-fixtures-introduction/tree/master/tests
