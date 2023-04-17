from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time

chrome_options = Options()
driver = webdriver.Chrome(chrome_options=chrome_options, executable_path="/usr/bin/local/chromedriver")
#

driver.get("http://localhost:8000/testform")
driver.maximize_window()
elem = driver.find_element(By.ID,"input_me")
elem.send_keys("input me text from selenium aa !!")
elem.send_keys(Keys.RETURN)
time.sleep(2)
driver.quit()
