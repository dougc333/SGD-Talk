from wsgiref.simple_server import make_server
from pyramid.config import Configurator
from pyramid.response import Response


def hello_world(request):
    return Response('Hello World!')

def hello_another(request):
    return Response('Hello Another!')

if __name__ == '__main__':
    with Configurator() as config:
        config.add_route('hello', '/')
        config.add_route('another', '/another')
        config.add_view(hello_world, route_name='hello')
        config.add_view(hello_another, route_name='another')
        app = config.make_wsgi_app()
        
        server = make_server('0.0.0.0', 6543, app)
        server.serve_forever()