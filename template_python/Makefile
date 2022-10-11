
install:
	pip install --upgrade pip &&\
		conda activate pp && pip install -r requirements.txt


test:
	echo "not installed yet"
		python -m pytest -vv test_*.py

format:
	black *.py

lint:
	pylint --disable=R,C --ignore-patterns=test_.*?.py *.py

all:
	install  test


