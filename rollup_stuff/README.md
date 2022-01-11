this is kind of a waste of time but it is needed
any project, use both npm/babel and rollup. and compare bundle sizes
because rollup uses tree shaking and babel did not circa 2016... now there is minimal if any difference
somebody will ask and you need an answer. Automate this. 

as we get further away from when rollup was invented there will be less difference. 

tree shaking is when you use one function in a module, is it necessary to import the entire library
or some minimized version where you only take the function you import. There are various impleentations of this; some result in much smaller sizes than others
you can benchmark it but that is worthless since results depend on the code base; what you are importing etc...
everybody uses the lodash demo but that is irrelevant for your own project


