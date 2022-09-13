# Storefront_Backend
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
## For Testing
#### To test every action happened to database
    npm run test 

