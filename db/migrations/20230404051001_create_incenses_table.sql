-- migrate:up
CREATE TABLE incenses
(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL
);

-- migrate:down
DROP TABLE incenses;
