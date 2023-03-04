import random 
from locust import HttpUser, between, task
from pyquery import PyQuery

class User(HttpUser):
    host="https://docs.locust.io/en/latest"
    wait_time = between(10,600)
    
    def on_start(self):
        self.wait()
        self.index_page()
        self.urls_on_current_page = self.toc_urls
    
    @task(10)
    def index_page(self):
        r = self.client.get("")
        pq = PyQuery(r.content)
        link_elements = pq(".toctree-wrapper a.internal")
        self.toc_urls = [
            l.attrib["href"] for l in link_elements
        ]
    
    @task(50)
    def load_page(self):
        url = random.choice(self.toc_urls)
        r = self.client.get(url)
        pq = PyQuery(r.content)
        link_elements = pq("a.internal")
        self.urls_on_current_page = [
            l.attrib["href"] for l in link_elements
        ]
    
    @task(30)
    def load_sub_page(self):
        url = random.choice(self.urls_on_current_page)
        r = self.client.get(url)
    