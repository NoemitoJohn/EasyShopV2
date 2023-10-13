
-- @block clear data all data from users TABLES
-- TRUNCATE TABLE users;

-- @block alter users_info table
-- ALTER TABLE users_info
-- DROP CONSTRAINT users_info_ibfk_1;


-- @block clear data all data from users TABLES
-- TRUNCATE TABLE users_info;

-- @block drop users table
-- DROP TABLE users

-- @block drop users_info table
-- DROP TABLE users_info


-- @block create a users table

CREATE TABLE users (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) NOT NULL UNIQUE ,
    password varchar(255) NOT NULL, 
    PRIMARY KEY (id)
);

-- @block create a users_info table
CREATE TABLE users_info (
    id int NOT NULL AUTO_INCREMENT,
    user_id int NOT NULL,
    first_name varchar(255) NOT NULL, 
    last_name varchar(255) NOT NULL, 
    mobile_number varchar(50), 
    PRIMARY KEY (id)
    -- FOREIGN KEY (user_id) REFERENCES users(id)
);


-- @block create a users_address table
CREATE TABLE users_address (
    id int NOT NULL AUTO_INCREMENT,
    user_info_id int NOT NULL,
    address_line_1 varchar(255) NOT NULL,
    address_line_2 varchar(255),
    city varchar(255) NOT NULL,
    country varchar(255) NOT NULL,
    zipcode int NOT NULL,
    PRIMARY KEY (id)
    -- FOREIGN KEY (user_info_id) REFERENCES users_info(id)
);

-- @block create a products table
CREATE TABLE products (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(255) NOT NULL,
    price DOUBLE(9,2) NOT NULL,
    stocks int NOT NULL,
    rating FLOAT(24),
    PRIMARY KEY (id)
);

-- @block create a products_info table
CREATE TABLE products_info (
    id int NOT NULL AUTO_INCREMENT,
    product_id int NOT NULL,
    description text NOT NULL,
    category varchar(225),
    img_url JSON,
    PRIMARY KEY (id)
    -- FOREIGN KEY (product_id) REFERENCES products(id)
);

--@block create a categories table
CREATE TABLE categories (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(45) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (name)
  );


-- @block test query
-- SELECT img_url FROM products_info WHERE product_id = 41


-- @block insert user into users table
-- INSERT INTO users (email, password) VALUES ('test@gmail.com', 'test123321')


-- @block 
-- SELECT * FROM users;

-- @block 
SHOW TABLES;