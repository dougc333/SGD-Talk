uvicorn doesnt support streaming

hypercorn does and gives an alternative to grpc but it requires setting up certifictes 
for http2. 

openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
hypercorn --keyfile key.pem --certfile cert.pem server:app