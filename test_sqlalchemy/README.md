from zsh shell in test_sqlalchemy run docker-compose up in same directory as docker-compose.yml
   this creates the docker container and assumes one does not exist
   if one exists this command will error out
or use docker desktop to start the docker_postgres container. it is already created and rebistred

psycopg2 uses connection and sql statements

sqlalchemy uses session to replace connection
object mapping one-many, many-many to other tables
each row is a separate object? 
this is misleading, across all users? or each user a separate database? postgres/postgres
add some users and see what database schema does. 
can you add users through UI? 
a register or add user page? 

how to view connections into db? 
there must be some monitoring sw for postgres container
some metrics for the db container

