from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField

# can use create_app or make_app. most use create_app
# flask run automatically looks for app.py


def make_app():
    app = Flask(__name__)
    # app.config['SECRET_KEY'] = 'Mysecret!'

    @app.route('/')
    def index():
        return "hi this is index()"

    return app
