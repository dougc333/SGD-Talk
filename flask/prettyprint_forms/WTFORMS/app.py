from flask import Flask, render_template
from flask_wtf import Form
from wtforms import StringField, PasswordField
from wtforms.validators import InputRequired

app = Flask(__name__)
#cross site forgery 
app.config['SECRET_KEY']="asdf"


class LoginForm(Form):
    username = StringField('username', validators=[InputRequired()])
    password = PasswordField('password', validators=[InputRequired()])


@app.route('/', methods=['GET','POST'])
def index():
    form = LoginForm()
    if form.validate_on_submit():
        return "Form submit"
    return render_template('index.html', form=form)

if __name__=="__main__":
    app.run(debug=True)

    



