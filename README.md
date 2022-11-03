# Storefront_Backend

## Database Setup
->  Start postgres database on port 5432
1. you need to open sql shell (psql) 
2. if you have different password you can put in .env file instead of my password in variable called ***POSTGRES_PASSWORD*** .
3. write the following queries to create databases.
#### Create database called store_database.
4.      CREATE DATABASE store_database;
#### Create database called storetest_database for testing.
5.      CREATE DATABASE storetest_database;
#### connect to store_database database.
6.      \c store_database


## project Setup
#### 1- Install Dependencies:
        npm install
#### 2- Create .env file
        ENV=dev
        POSTGRES_HOST=localhost
        POSTGRES_DB=store_database
        POSTGRES_TEST_DB=storetest_database
        POSTGRES_USER=postgres
        POSTGRES_PASSWORD=0000
        BCRYPT_PASSWORD=nasdno!sAOP\SSA
        SALT_ROUNDS= 15
        TOKEN=secret_token
#### 3- setUp database
##### start postgres database on port 5432
        db-migrate up 
#### 4- Build the project
        npm run build
#### 5- start server
        npm run start
#### 6- server listen on port 3000
        -> localhost:3000
## Testing
#### To test every action happened to database & test every endpoint action
    npm run test 


