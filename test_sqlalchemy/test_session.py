from psycopg2 import connect

table_name = "foo"

# declare connection instance
conn = connect(
    dbname = "postgres",
    user = "postgres",
    host = "0.0.0.0", 
    port = '5432',
    password = "postgres"
)
cursor = conn.cursor()

# execute an SQL statement using the psycopg2 cursor object
cursor.execute(f"SELECT * FROM {table_name};")
for i, record in enumerate(cursor):
    print ("\n", type(record))
    print ( record )

# close the cursor object to avoid memory leaks
cursor.close()

# close the connection as well
conn.close()