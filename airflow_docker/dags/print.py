from airflow.decorators import dag, task
import pendulum
import datetime

import logging    



@dag(
    dag_id="print",
    schedule_interval="0 0 * * *",
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    catchup=False,
    dagrun_timeout=datetime.timedelta(minutes=60),
)

def print_stuff():
  print("hi this is print_stuff")
  logging.debug('This is a debug message')
  logging.info('This is an info message')
  logging.warning('This is a warning message')
  logging.error('This is an error message')
  logging.critical('This is a critical message')



dag = print_stuff()