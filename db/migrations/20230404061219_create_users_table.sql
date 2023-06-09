-- migrate:up
CREATE TABLE users
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  account VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(200) NOT NULL,
  phone_number VARCHAR(30) NOT NULL,
  birthday DATE NOT NULL,
  gender VARCHAR(10) NOT NULL,
  point DECIMAL(10, 3) NULL DEFAULT 100000,
  created_at TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;
