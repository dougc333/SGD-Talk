from flask import Flask, render_template, url_for, request, redirect
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)
migrate = Migrate(app,db)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(255))
    email=db.Column(db.String(255))

class Posts(db.Model):
    

@app.route("/")
def show():
    users = User.query.all()
    print("users:",users)
    for u in users:
        print("username:",u.username)
    return render_template('index.html', users=users)

@app.route("/addUsers")
def addUsers():
  u1 = User(username="user1", email="user1@wxample.com")
  u2 = User(username="user2", email="user2@wxample.com")
  u3 = User(username="user3", email="user3@wxample.com")
  u4 = User(username="user4", email="user4@wxample.com")
    
  db.session.add(u1)
  db.session.add(u2)
  db.session.add(u3)
  db.session.add(u4)
  db.session.commit()
  #need return 
  users = User.query.all()
  return render_template('index.html', users=users)

#@app.route("/addPosts")
#def addPosts():
#    user1Posts = []
    
    


