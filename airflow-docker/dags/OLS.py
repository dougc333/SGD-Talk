import json
from typing import Tuple
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import statsmodels.api as sm
import pendulum
import sys
from airflow.decorators import dag, task
from airflow.utils.session import provide_session
# [END import_module]


# [START instantiate_dag]
@dag(
    schedule_interval=None,
    start_date=pendulum.datetime(2021, 1, 1, tz="UTC"),
    catchup=False)
def OLS():
    """
    ### TaskFlow API Tutorial Documentation
    This is a simple ETL data pipeline example which demonstrates the use of
    the TaskFlow API using three simple tasks for Extract, Transform, and Load.
    Documentation that goes along with the Airflow TaskFlow API tutorial is
    located
    [here](https://airflow.apache.org/docs/apache-airflow/stable/tutorial_taskflow_api.html)
    """
    # [END instantiate_dag]

    # [START extract]
    @task(multiple_outputs=True)
    def make_data():
        print("make data sys.path:",sys.path)
        nsample = 100
        x = np.linspace(0, 10, 100)
        X = np.column_stack((x, x ** 2))
        print(X)
        print("x",x)
        beta = np.array([1, 0.1, 10])
        e = np.random.normal(size=nsample)
        print("beta:",beta)
        print("e:",e)
        data = (X,beta,e)
        return data
    # [END extract]
    # [START transform]
    @task(multiple_outputs=True)
    def run_model(data: Tuple):
        """
        """
        X = data[0]
        beta = data[1]
        e = data[2]

        X = sm.add_constant(X)
        y = np.dot(X, beta) + e
        return (X,y)
    # [END transform]
    # [START load]
    @task()
    def print_results(model: Tuple):
        """
        #### Load task
        A simple Load task which takes in the result of the Transform task and
        instead of saving it to end user review, just prints it out.
        """
        X=model[0]
        y=model[1]
        model = sm.OLS(y, X)
        results = model.fit()
        print(type(results))
        print(results.summary())
        
    # [END load]

    # [START main_flow]
    o = make_data()
    order_s = run_model(o)
    print_results(order_s)

    # [END main_flow]


# [START dag_invocation]
ols_dag = OLS()

# [END dag_invocation]

# [END tutorial]