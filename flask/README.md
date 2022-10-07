problem is you have to create the db in the CLI

cd one level up of project
from sqlalchemy import db
from sqlalchemy.extensions import db
from sqlalchemy.models import User
db.create_all(app=create_app)

application factory pattern 

#run this:
from sqlalchemy_blueprint.run_from_one_level_up import create_db
create_db()