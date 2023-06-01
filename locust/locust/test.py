from locust import HttpUser, between, task


class Hello(HttpUser):	  
	@task	
	def index(self):
		self.client.get("/")
		self.client.get("/another")
  
