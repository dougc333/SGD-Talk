from fastapi import Depends, APIRouter, Request
from sqlalchemy.orm import Session
from fastapi.templating import Jinja2Templates
from database.connection import get_db
from fastapi.security import OAuth2PasswordRequestForm
from controller import userController

userRouter=APIRouter()
templates=Jinja2Templates(directory="templates/")

@userRouter.get("/index")
def get_index(request:Request):
    return templates.TemplateResponse("front/home/index.html",{"request":request})

@userRouter.get("/")
def get_index(request:Request):
    return templates.TemplateResponse("front/home/index.html",{"request":request})


@userRouter.get("/signin")
def get_index(request:Request):
    return templates.TemplateResponse("auth/signin.html",{"request":request})


@userRouter.post("/signin")
def create_user(request:Request,db:Session=Depends(get_db),form_data:OAuth2PasswordRequestForm=Depends()):
    db
    return templates.TemplateResponse("auth/signin.html",{"request":request})
