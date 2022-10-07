from flask import Flask, render_template
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired

#flaskform includes CRSF, wtforms doesnt
class LoginForm(FlaskForm):
    username = StringField('username', validators=[InputRequired()])
    password = PasswordField('password', validators=[InputRequired()])

#if we dont put index inside then we have to use blueprints 
def create_app():   
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "secrettoken"
    @app.route("/", methods = ['GET','POST'])
    def index():
        form = LoginForm()
        print("form.data:",form.data)
        print("form username errors:",form.username.errors)
        #print("form attrs:",form.__getattribute__)
        #print("dir:",dir(form))
        #if there are errors will add error messages to form.username.errors nad form.password.errors
        if form.validate_on_submit():
            return f"<h1>Username:{form.username.data} Password:{form.password.data}</h1>"
        
        form.username.label="foo" #the default is username. this should be easier to find in the docs
        return render_template('index.html',form=form)
    return app

