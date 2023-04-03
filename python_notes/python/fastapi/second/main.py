from fastapi import FastAPI
import uvicorn
from model import userModel
from database.connection import engine
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routes import userRoutes


userModel.Base.metadata.create_all(bind=engine)


app = FastAPI()
app.mount("/static/",StaticFiles(directory="static",html=True))
templates=Jinja2Templates(directory="templates/")

app.include_router(userRoutes.userRouter)
#app.include_router(adminRoute.adminRouter)

#@app.get("/")
#async def main():
#    return {"hi":"database here"}

if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
