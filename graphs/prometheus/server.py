

from fastapi import Request, FastAPI
from fastapi.middleware.core import CORSMiddleware
from prometheus_fastapi_instrumenter import Instrumentor
from fastapi.responses import PlainTextResponse

import requests

app = FastAPI()


@app.get("/hi")
async def hi():
  return PlainTextResponse("hello there")


@app.get('/"):
  
