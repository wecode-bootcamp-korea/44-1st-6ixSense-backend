-- migrate:up
CREATE TABLE order_items
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL
);

-- migrate:down
DROP TABLE order_items;
