from app import app
from app.forms import LoginForm
from app.models import User
from flask_login import current_user, logout_user, login_user
from flask import render_template, redirect, url_for, flash




user={'username': 'bob'}
posts=[
  {
    "author":{'username': 'author1'},
    "title":'title1',
    "body": 'body1'
  },
  {
    "author":{'username': 'author2'},
    "title":'title2',
    "body": 'body2'      
  },
  {
    "author":{'username': 'author3'},
    "title":'title3',
    "body": 'body3'
  }
]

@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html', title="Home",user=user, posts=posts)

@app.route('/login',methods=['GET','POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    form = LoginForm()
    print("form: " + str(form.__dict__))
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first() 
        if user is None or not user.check_password(form.password.data):
            flash('Invalid username or passsword')
            return redirect(url_for('login'))
        login_user(user,remember=form.remember_me.data)
        return redirect(url_for('index'))
    return render_template('login.html',title="Login Form", form=form)

app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))