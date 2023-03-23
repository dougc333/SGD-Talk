from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from tortoise import fields
from tortoise.models import Model
from tortoise.contrib.fastapi import register_tortoise



app = FastAPI()

class User(Model):
  id = fields.IntField(pk=True)
  username = fields.CharField(50,unique=True)
  password_hash = fields.CharField(128)
  
  @classmethod
  async def get_user(cls,username):
    return cls.get(username=username)

  def verify_password(self, password):
    return True

register_tortoise(
  app,
  db_url='sqlite://db.sqlite3',
  modules={'models':[main]},
  generate_schema=True,
  add_exception_handler=True
)


