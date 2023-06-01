from locust import HttpUser, TaskSet, task



class MyTask(TaskSet):
    @task(100)
    def index(self):
        response = self.client.get("/")
        

class Hello(HttpUser):
    host = "http://localhost:81"
    task_set = MyTask
    
    