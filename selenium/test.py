import selenium


import time

from selenium import webdriver

#error pass in service object
#driver = webdriver.Chrome('/Users/dc/Downloads/chromedriver_mac64')  # Optional argument, if not specified will search path.



import time

from selenium import webdriver

from selenium.webdriver.chrome.service import Service

service = Service('/Users/dc/Downloads/chromedriver_mac64/chromedriver')

service.start()

driver = webdriver.Remote(service.service_url)

driver.get('http://www.sfgate.com/');

time.sleep(5) # Let the user actually see something!
driver.close() # Close the tab
driver.quit()