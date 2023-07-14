
from app import app
from flask import render_template
from app.forms import LoginForm

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
    return render_template('index.html',title = "Index Page")

@app.route('/login')
def login():
    form = LoginForm()
    return render_template('login.html',title='Sign In', form=form, loggedin_user=loggedin_user)

