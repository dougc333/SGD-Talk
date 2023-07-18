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
    age = db.Column(db.Integer)

@app.route("/")
def show():
    users = User.query.all()
    print("users:",users)
    for u in users:
        print("username:",u.username)
    return render_template('index.html', users=users)

