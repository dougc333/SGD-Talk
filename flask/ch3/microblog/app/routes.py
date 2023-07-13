
from app import app
from flask import render_template

loggedin_user = {"username":'bob'}

posts = [
    {
    "author":{"username":"first user"},
    "body": "first post"
    },
    {
    "author":{"username":"second user"},
    "body": "second post"        
    },
    {
    "author":{"username":"third user"},
    "body": "third post"
    }

]


@app.route('/')
def index():
    print("calling index")
    return render_template('index.html',posts=posts, loggedin_user=loggedin_user)

