from code import InteractiveInterpreter

import pdb; pdb.set_trace()
code='import numpy as np; a=np.array([1,2,3,4]); print(a)'
i = InteractiveInterpreter()
i.runsource(code)


