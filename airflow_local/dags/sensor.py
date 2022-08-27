#when you wait for data someone sent you is tehre and you can move to next task
#are these async

#wait for something to happen, every 30s sensor checks if something T/F
#looks like thread

from airflow.models import DAG
from airflow.sensors.filesystem import FileSensor

from airflow.operators.python import PythonOperator
from airflow.sensors.python import PythonSensor
from airflow.exceptions import AirflowSensorTimeout


from datetime import datetime

#I dont see exception under context dictionary
#https://composed.blog/airflow/execute-context
def _failure_callback():
    print("failure callback")
    if isinstance(AirflowSensorTimeout):
       # print("context:",context['exception'])
        print("sensor timed out")

def _done():
    pass

def _partner_a():
    return False

def _partner_b():
    return True
    
default_args = {
    'start_date':datetime(2022,8,23)
}
with DAG('dag_sensor', schedule_interval='@daily',
default_args = default_args, catchup=False) as dag:
    partner_a = PythonSensor(
        task_id='partner_a',
        poke_interval = 5,
        timeout=10,
        mode="reschedule",
        python_callable = _partner_a,
        on_failure_callback = _failure_callback,
        soft_fail=True
    )
    
    partner_b = PythonSensor(
        task_id = 'partner_b',
        poke_interval = 3,
        timeout=10,
        mode="reschedule",
        python_callable=_partner_b,
        on_failure_callback = _failure_callback,
        soft_fail=True
    )
    done = PythonOperator(
        task_id="done",
        python_callable = _done,
        trigger_rule = 'none_failed_or_skipped'
    )
    #no guarantee airflow executes the sensor if interval too small
    #if file never arrives then snesor keeps on checking every 30s for 7 days before timing out
    #when you run a sensor you run a task
    #you can get a deadlock with sensors because it can take all the worker slots if the file never comes
    # you run out of slots and have to wait for the sensor task timeout, 7 days
    #in airflow all operators share default_pool
    #reschedule_mode for sensor will not take up slot when sensor is inactive 
    # inactive sensors take up task slots smart sensors avoid this problem
    #
    [partner_a, partner_b] >> done
