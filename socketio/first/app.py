import socketio

sio = socketio.Server()
#sio reacts to events, event driven, connect and disconnect are events
app = socketio.WSGIApp(sio)


@sio.event
def connect(sid, environ ):
  print(sid, "connected")

def disconnect(sid,environ, ):
  print(sid,'disconnected')

#how to convert to wsgi? 



