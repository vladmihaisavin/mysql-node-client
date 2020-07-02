ALTER USER 'root'@'localhost' IDENTIFIED BY 'asd123';
CREATE USER 'myUser'@'172.17.0.1' IDENTIFIED WITH mysql_native_password BY 'asd123';
GRANT ALL PRIVILEGES ON *.* TO 'myUser'@'172.17.0.1';
CREATE DATABASE test_db;
USE test_db;
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type VARCHAR(255) DEFAULT "guest",
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
CREATE TABLE IF NOT EXISTS book_types (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
CREATE TABLE IF NOT EXISTS books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  book_type_id INT,
  description VARCHAR(255),
  pages INT,
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP,
  FOREIGN KEY (book_type_id) REFERENCES book_types(id)
);
CREATE TABLE IF NOT EXISTS authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  birthday VARCHAR(255),
  typeOfAuthor VARCHAR(255),
  createdAt TIMESTAMP,
  updatedAt TIMESTAMP
);
CREATE TABLE IF NOT EXISTS authors_books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  author_id INT NOT NULL,
  book_id INT NOT NULL,
  INDEX pairId (author_id, book_id),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE,
  FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);