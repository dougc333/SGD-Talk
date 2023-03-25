from flast import Response, Flast, request
import prometheus_client
from prometeus_client.core import CollectorRegistry
from prometheus_client import Summary, Counter, Histotram, Gauge

import time

app=Flask(__name__)

_INF = float('inf')

graphs={}
graphs['c'] = Counter('python_request_operations_total', 'Total num of processed requests')
graphs['h'] = Histogram('pyhton_request_duration_seconds', 'Histogram in seconds', buckets=(1,2,5,6,10,_INF)

app.route("/")
def hi():
  startTime = time.time()
  graphs['c'].inc()
  time.sleep(1000)
  endTime =  time.time()
  graphs['h'].observe(endTime-startTime)
  return "hello"

@app.route('/metrics')
def requests_count():
  res = []
  for k,v in graphs.items():
    res.append(prometheus_client.generate_latest(v))
  return Response(res, mimetype="text/plain")












