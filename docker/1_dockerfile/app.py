from flask import Flask

app=Flask(__name__)

@app.route('/')
def hi():
   return "hi"

if __name__=="__main__":
	app.debug=True
	app.run(host="localhost", port=8000, debug=True)

