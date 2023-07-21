from app import db,login
from datetime import datetime
from flask_login import UserMixin


@login.user_loader
def load_user(id):
  return User.query.get(int(id))

class User(UserMixin,db.Model):
  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String(64),index=True, unique=True)
  email = db.Column(db.String(64), index=True, unique=True)
  password_hash = db.Column(db.String(128))
  posts = db.relationship('Post', backref='author', lazy="dynamic")

  def __repr__(self):
    return f"<User username:{self.username} email: {self.email}>"


class Post(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  body = db.Column(db.String(64))
  timestamp = db.Column(db.DateTime, index=True, default=datetime.utcnow)
  user_id = db.Column(db.Integer,db.ForeignKey('user.id'))
  
  def __repr__(self):
    return f"<Post {self.body} timestamp: {self.timestamp} user.id:{self.user_id} >"

