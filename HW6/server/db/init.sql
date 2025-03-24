CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    role VARCHAR(50),
    group_name VARCHAR(255),
    avatar VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    token VARCHAR(255),
    user_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, password, role, group_name, avatar) VALUES ('Admin', 'd@gmail.com', '$2b$10$QZGfRgsio0P1eMfwsG67wOYV/QyFRmwh1DgtqwoUQfupSAz1PKa2q', 'admin', 'admin', 'https://i.pravatar.cc/150?img=1');