import requests


class R:
  def __init__(self):
     self.url = "http://www.google.com"
  def get(self):
     res = requests.get(self.url)
     print(res.status_code)

r =  R()
r.get()

