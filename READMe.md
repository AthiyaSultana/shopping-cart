# SHOPPING CART APP

# Prerequisites
In order to run this APP, install the following tools:
1. NodeJs
2. mongo-seeding-cli(use `npm install -g mongo-seeding-cli` command to install)

`Created the Project Structure BY using Express Generator`

# Steps to run the application in local
1. Clone the project by using git clone command 
2. Install the dependencies by using `npm i ` command
3. Once dependencies are installed run the command `npm run start` to start the server
4. Inorder to test the apis please `SEED` the dummy data by using  following command
 `DB_URI='mongodb+srv://codejudgelabs:athiya@123@cluster0.l09qi.mongodb.net/shoppingcart?retryWrites=true&w=majority' DROP_DATABASE=true  seed ./data`
5. The above step will create the DB and schemas and imports data to collections.
6. If any one needs to give local db please give command as follows
 `seed -u mongodb://127.0.0.1:27017/mydb --drop-database ./data` 
7. I have used `mongo-seeding` module for  seeding data concept.

# Steps to test the api's
1. Open Postman
2. Paste the url `localhost:8080/api/products/` use get method