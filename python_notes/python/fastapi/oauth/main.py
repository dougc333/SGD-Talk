from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

import uvicorn

app=FastAPI()



app.mount("/static/",StaticFiles(directory="static", html=True))
templates = Jinja2Templates(directory="templates")




def server():
    uvicorn.run("main:app",host="127.0.0.1", port=8000, log_level="info", reload=True)


if __name__ == "__main__":
    server()
    