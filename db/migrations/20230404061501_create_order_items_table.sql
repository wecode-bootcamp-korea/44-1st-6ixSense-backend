-- migrate:up
CREATE TABLE order_items
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY(product_id) REFERENCES products(id)
);

-- migrate:down
DROP TABLE order_items;