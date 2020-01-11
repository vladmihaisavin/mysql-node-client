ALTER USER 'root'@'localhost' IDENTIFIED BY 'asd123';
CREATE USER 'myUser'@'172.17.0.1' IDENTIFIED WITH mysql_native_password BY 'asd123';
GRANT ALL PRIVILEGES ON *.* TO 'myUser'@'172.17.0.1';
