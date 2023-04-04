-- migrate:up
CREATE TABLE orders
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_number VARCHAR(50) DEFAULT(UUID()),
  status_id INT NOT NULL,
  information_id INT NOT NULL,
  total_price DECIMAL(10,3) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(status_id) REFERENCES order_status(id),
  FOREIGN KEY(information_id) REFERENCES order_items(id)
);

-- migrate:down
DROP TABLE oreders;
