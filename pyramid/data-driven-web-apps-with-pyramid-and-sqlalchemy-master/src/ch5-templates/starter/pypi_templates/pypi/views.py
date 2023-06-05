from pyramid.view import view_config

def getTestPackages():
    return [
        {'name':'requests', 'version': '1.2.3'  },
        {'name':'2', 'version': '1.0.0'},
        {'name':'3', 'version':' 2.2.2.'}
    ]


@view_config(route_name='home', renderer='templates/home_index.pt')
def home_index(request):
    return {
        'packages': getTestPackages()
            
            }



