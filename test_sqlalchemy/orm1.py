from sqlalchemy import create_engine


#automatically in schema public
#there is a search path 
# try catch block already in sqlalchemy
engine = create_engine('postgresql://airflow:airflow@localhost:5432/mydatabase', echo=True)
print("engine:",engine)