from flask import Flask


app = Flask(__name__)

@app.route('/')
def index():
    return 'Web App with Python Flask!'

@app.route('/hello')
def hello():
    return "hello"

app.run(host='0.0.0.0', port=81)