from fastapi import APIRouter,Request
from fastapi.templating import Jinja2Templates


userRouter = APIRouter()
templates=Jinja2Templates(directory="templates/")


@userRouter.get("/")
def getindex(request:Request):
    print("GET")
    return {"hi":"world"}
    #return templates.TemplateResponse("/front/home/index.html",{"request":request})

