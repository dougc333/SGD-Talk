from app import db,login
from datetime import datetime
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

@login.user_loader
def load_user(id):
  return User.query.get(int(id))

class User(UserMixin,db.Model):
  '''
  user class
  '''
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64),index=True, unique=True)
  email = db.Column(db.String(64), index=True, unique=True)
  password_hash = db.Column(db.String(128))
  posts = db.relationship('Post', backref='author', lazy="dynamic")

  def set_password(self, password):
    '''
    return password hash to store in db
    '''
    self.password_hash = generate_password_hash(password)
  
  def check_password(self, password):
    '''
    verify password hash
    '''
    return self.check_password_hash(self.password_hash, password)

  def __repr__(self):
    return f"<User username:{self.username} email: {self.email}>"



class Post(db.Model):
  '''
  table of posts per user, user_id refers to who sent post or who to send post to? 
  '''
  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.String(64))
  timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
  user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
  
  def __repr__(self):
    return f"<Post {self.body} timestamp: {self.timestamp} user.id:{self.user_id} >"

  