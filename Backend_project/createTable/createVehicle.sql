CREATE TABLE IF NOT EXISTS vehicle(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    vehicle_name VARCHAR(25) NOT NULL,
    price INT NOT NULL,
    in_stock INT NOT NULL,
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_on DATETIME,
    FOREIGN KEY(category_id) REFERENCES vehicle_category(id)
);