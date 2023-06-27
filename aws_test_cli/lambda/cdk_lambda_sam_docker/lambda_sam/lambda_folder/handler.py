import json

def handle(event,context):
  print("from lambda fn: ", json.dumps(event))
