python template for crawler which require oauth	

1) create directory
2) install libs and create requirements.txt 
pipreqs /path/to/project
3) create setup.cfg setup.py
setup.cfg is an ini file for setup.py
where do AWS credentials go? 
4) 
  - create directory with API, /api  
  - tests directory
 
setup.py
 VERSION_FILE = "api/__init__.py"
 match = re.search(r"^__version__=['\"]([^'\"]*)['\"]",
 version = match.group(1)
 setup(
   name="test_api",
   version=version
   packages=find_packages(),
   install_requires=[
     "oauthlib>x.x.x.<x",
     "requests>=<3",
     "requests-oauthlib<0.0.o0<4"
   ],
   extras_require={
     "dev":[
     "coverage>=2.1.0",
     "coveralls>2.1.0",
     "tox>3.2.0"
     ],
    "socks":["requests[socks]"],
    "test":["vcrpy>1.0.13"],
   },
   test_suite="tests",
   python_requires=">3.7",
   zip_save=True,
 ) 

