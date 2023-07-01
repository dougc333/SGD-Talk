
from bs4 import BeautifulSoup


import requests

def test():
	r = requests.get('https://www.google.com')
	print(r.status_code)
	#print(r.text)
	parse = BeautifulSoup(r.text)
	print(parse.prettify())


if __name__=="__main__":
  test()

