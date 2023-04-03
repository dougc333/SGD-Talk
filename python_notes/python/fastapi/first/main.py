from fastapi import FastAPI
import uvicorn

app = FastAPI()


@app.get("/")
async def hi():
    return {"hi":"mom"}

def server():
    uvicorn.run("main:app",port=8000, reload=True)
    
if __name__ == '__main__':
    server()