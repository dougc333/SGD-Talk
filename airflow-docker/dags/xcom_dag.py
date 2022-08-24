from datetime import datetime
from random import randint

from airflow import DAG
from airflow.operators.python import PythonOperator, BranchPythonOperator
from airflow.operators.bash import BashOperator


def _training_model():
    return randint(1,10)

def _choose_best_model(ti):
    ###
    print('choose best model')
    accuracies = ti.xcom_pull(task_ids=["training_model_A","training_model_B","training_model_C"])
    print("accuracies:",accuracies)
    best_accuracy = max(accuracies)
    
    print("best accuracy:",best_accuracy)
    if (best_accuracy > 8):
        return 'accurate'
    return 'inaccurate'
    


with DAG("xcom_dag",start_date=datetime(2022,8,23),schedule_interval="@daily",catchup=False) as dag:
    #will be triggered after start date plus scheduel interval
    training_modelA = PythonOperator(task_id="training_model_A",python_callable = _training_model)
    training_modelB = PythonOperator(task_id="training_model_B",python_callable = _training_model)
    training_modelC = PythonOperator(task_id="training_model_C",python_callable = _training_model)

    choose_best_model = BranchPythonOperator(
        task_id="choose_best_model",python_callable=_choose_best_model
    )
    accurate = BashOperator(
        task_id="accurate",
        bash_command = "echo 'accurate'"
    )
    inaccurate = BashOperator(
        task_id="inaccurate",
        bash_command = "echo 'inaccurate'"
    )

    [training_modelA, training_modelB, training_modelC] >> choose_best_model >> [accurate, inaccurate]

