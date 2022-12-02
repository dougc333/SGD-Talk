from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys


chrome_options = Options()
driver = webdriver.Chrome(chrome_options=chrome_options, executable_path="/usr/bin/local/chromedriver")
# go to Indeed.com

driver.get("https://www.indeed.com")
driver.maximize_window()


driver.find_element_by_xpath("//*[@id='text-input-what']").send_keys("Selenium")