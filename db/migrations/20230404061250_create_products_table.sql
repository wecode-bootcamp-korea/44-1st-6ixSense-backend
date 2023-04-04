-- migrate:up
CREATE TABLE products
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price DECIMAL(10, 3) NOT NULL,
  description VARCHAR(200) NOT NULL,
  stock INT NOT NULL,
  detail_image VARCHAR(2000) NULL,
  discount_rate DECIMAL(6, 5) NOT NULL DEFAULT 0,
  category_id INT NOT NULL, 
  incenses_id INT  NULL,
  FOREIGN KEY(category_id) REFERENCES categories(id),
  FOREIGN KEY(incenses_id) REFERENCES incenses(id) 
);

-- migrate:down
DROP TABLE products;
