CREATE TABLE IF NOT EXISTS user(
	id VARCHAR(34) NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(20) NOT NULL,
    address VARCHAR(100),
    password VARCHAR(256) NOT NULL,
    salt VARCHAR(256) NOT NULL,
    created_on DATETIME DEFAULT CURRENT_TIMESTAMP,
    deleted_on DATETIME
)