

from fastapi import FastAPI, Depends
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

app=FastAPI()

oauth2_schema = OAuth2PasswordBearer(tokenUrl="token")


@app.get("/id/{id}")
async def read_id(id):
  return {"id":id}


@app.post('/token')
async def token(form_data:OAuth2PasswordRequestForm=Depends()):
  return {'access_token' : form_data.username + 'token'}

app.route('/')
async def index(token:str = Depends(oauth2_schema)):
  return {'the token':token}


