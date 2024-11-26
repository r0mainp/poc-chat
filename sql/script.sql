CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255)
);

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    address VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id)
);

CREATE TABLE agency (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(100),
    country VARCHAR(100),
    address VARCHAR(255),
    phone VARCHAR(20),
    email VARCHAR(100)
);

CREATE TABLE acriss_category (
    code CHAR(4) PRIMARY KEY,
    description VARCHAR(255)
);

CREATE TABLE vehicle (
    id INT PRIMARY KEY AUTO_INCREMENT,
    agency_id INT,
    category_code CHAR(4),
    model VARCHAR(100),
    license_plate VARCHAR(20) UNIQUE NOT NULL,
    availability BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (agency_id) REFERENCES agency(id),
    FOREIGN KEY (category_code) REFERENCES acriss_category(code)
);

CREATE TABLE booking (
    id INT PRIMARY KEY AUTO_INCREMENT,
    departure_agency_id INT,
    arrival_agency_id INT,
    user_id INT,
    vehicle_id INT,
    start_date DATETIME NOT NULL,
    end_date DATETIME NOT NULL,
    daily_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled', 'completed') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (departure_agency_id) REFERENCES agency(id),
    FOREIGN KEY (arrival_agency_id) REFERENCES agency(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (vehicle_id) REFERENCES vehicle(id)
);

CREATE TABLE payment (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    user_id INT,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    FOREIGN KEY (booking_id) REFERENCES booking(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE notification (
    id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    user_id INT,
    type ENUM('confirmation', 'reminder', 'cancellation', 'profile_update', 'ticket_open', 'ticket_reply'),
    message TEXT NOT NULL,
    sent_at TIMESTAMP,
    email_sent BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (booking_id) REFERENCES booking(id),
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE support_ticket (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    subject VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status ENUM('open', 'in_progress', 'resolved') DEFAULT 'open',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user(id)
);

CREATE TABLE message (
    id INT PRIMARY KEY AUTO_INCREMENT,
    ticket_id INT,
    sender ENUM('user', 'agent') NOT NULL,
    message TEXT NOT NULL,
    message_type ENUM('chat', 'email') NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES support_ticket(id)
);