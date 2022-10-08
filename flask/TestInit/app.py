from flask import Flask


def create_app():
   flask = Flask(__name__)
   return flask

@app.route("/")
def hi():
  return "<h1>hi</h1>"

