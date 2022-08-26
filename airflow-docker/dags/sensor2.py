from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.exceptions import AirflowSensorTimeout
from datetime import datetime
from airflow.sensors.filesystem import FileSensor

default_args = {
    'start_date':datetime(2022,8,23)
}

def _process():
    print("what is the point of process?")
    

def _store():
    print("what is the point of store? ")

#I dont know where context is
def _failure_callback(context):
    if isinstance(AirflowSensorTimeout):
        print("Sensor timeout")
#there is jinja templating here? 
with DAG("sensor2", schedule_interval='@daily',default_args=default_args, catchup=False) as dag:
    partners = [ 
                FileSensor(task_id=f'partners_{partner}', 
                        filepath=f'{partner}.txt', 
                        mode='reschedule', 
                        poke_interval=60, 
                        timeout=60*30,
                        on_failure_callback=_failure_callback, 
                        fs_conn_id=f'conn_filesensor_{partner}') for partner in ['a','b','c']]

    process = PythonOperator(
        task_id="process",
        python_callable=_process,
    )    
    store = PythonOperator(
        task_id="store",
        python_callable=_store,
    )
    partners >> process >> store
    
    
