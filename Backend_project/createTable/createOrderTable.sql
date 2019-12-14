CREATE TABLE IF NOT EXISTS order_ticket(
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_type VARCHAR(20) NOT NULL,
    amount INT NOT NULL,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME NOT NULL,
    user_id VARCHAR(256) NOT NULL,
    vehicle_id INT NOT NULL,
    payment_id INT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES user(id),
    FOREIGN KEY(vehicle_id) REFERENCES vehicle(id),
    FOREIGN KEY(payment_id) REFERENCES payment(id)
);