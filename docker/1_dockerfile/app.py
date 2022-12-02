from flask import Flask, render_template
from flask import request

app=Flask(__name__)


@app.route("/testform",methods=('GET','POST'))
def form():
	if request.method == "GET":
		return render_template("index.html")
	else:
		print(request.form["input_me"])
		return "success", 200



if __name__=="__main__":
	app.run(host="localhost", port=8000, debug=True)

