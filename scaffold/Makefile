install:
	#install
	pip install --upgrade pip && pip install -r requirements.txt
format:
	#format code
	black *.py mylib/*.py
lint:
	#flake8 or pylint
	pylint --disable=R,C hello.py
test:
	#test
	python -m pytest -vv test_hello.py
deploy:
	#deploy
all: 
	install lint test deploy