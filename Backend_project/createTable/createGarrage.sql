CREATE TABLE IF NOT EXISTS garage(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(40) NOT NULL,
    order_type VARCHAR(20) NOT NULL,
    price INT NOT NULL,
    available_spots INT NOT NULL,
    lat	DECIMAL (6,4) NOT NULL,
    lon	DECIMAL (6,4) NOT NULL,
    user_id VARCHAR(256) NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id)
);