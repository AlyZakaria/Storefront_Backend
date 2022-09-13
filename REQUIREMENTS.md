# API ROUTES

### Users
1. index [TOKEN NEED] -> ***/users*** [GET] 
2. show [TOKEN NEED] -> ***/users/:id*** [GET]
3. delete [TOKEN NEED] -> ***/users/:id*** [delete]
4. create -> ***/users*** [POST]
5. update [TOKEN NEED] -> ***/users/:id*** [PUT]
6. authenticate -> ***/users/authentication*** [POST]

### Products
1. index [TOKEN NEED]-> ***/products*** [GET]
2. show [TOKEN NEED]-> ***/products/:id*** [GET]
3. create -> ***/products*** [POST]
4. update [TOKEN NEED]-> ***/products/:id*** [PUT]
5. getProductsByCategory [TOKEN NEED]-> ***/products/:category*** [POST]
6. getTopProducts -> ***/top-products*** [GET]

### Orders
1. index [TOKEN NEED] -> ***/orders*** [GET]
2. show [TOKEN NEED] -> ***/orders/:id*** [GET]
3. delete [TOKEN NEED] -> ***/orders/:id*** [DELETE]
4. create [TOKEN NEED] -> ***/orders*** [POST]
5. addProduct [TOKEN NEED] -> ***/orders/:id/products*** [POST]
6. currentOrderByUser [TOKEN NEED]-> ***/users/:user_id/orders*** [GET]

## Data Shapes
### Users 
    id [PK]INTEGER
    firstname VARCHAR(100)
    secondname VARCHAR(100)
    password VARCHAR(255)
####  ----------------------------------------------------------
    CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        firstname VARCHAR(100),
        secondname VARCHAR(100),
        password VARCHAR(255)
    );

### products
    id [PK]INTEGER
    name VARCHAR(50)
    price INTEGER
    category VARCHAR(50)
#### ---------------------------------------------------------------------
    CREATE TABLE products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) ,
        price INTEGER ,
        category VARCHAR(50)
    );
### orders
    id [PK]INTEGER
    status VARCHAR(20)
    user_id bigint REFERENCES users(id)
### ---------------------------------------------------------
    CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status varchar(20),
        user_id bigint REFERENCES users(id)
    );
### order_products
    id [PK]INTEGER
    order_id bigint REFERENCES orders(id)
    product_id bigint REFERENCES products(id)
    quantity INTEGER
### -----------------------------------------------------
    CREATE TABLE IF NOT EXISTS order_products (
        id SERIAL PRIMARY KEY,
        order_id bigint REFERENCES orders(id),
        product_id bigint REFERENCES products(id),
        quantity INTEGER
    );


    