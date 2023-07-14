from flask import Flask


app = Flask(__name__)
app.config['SECRET_KEY'] = 'asd234232w33423'
from app import routes
