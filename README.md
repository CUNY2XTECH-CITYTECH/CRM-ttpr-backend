# CRM-ttpr-backend
Backend files for CRM ( using expressjs, js, nodejs, mongodb)
# project sturcture explanation

## controlllers/
- this folder is for logics like CRUD for each entity
- create file to manage each entity and have CRUD functions there

## routes/
- this folder is simply using the logics we created in controllers
- create file to import logics and use express router here

## models/
- this folder is for creating entities
- each file represents a table or a collection or an entity in our db
- rules and attributes of our db entities will be found here

# after you create those, don't forget to import in index.js(entry of db).
-------------------------------
## requirements
- npm i
- npm i express mongoose dotenv cors
- npm run start to start running

## to test
- go to postman
- use "localhost:8080/" + the path you used in index.js
-------------------------------
### have fun while coding my team!!!
