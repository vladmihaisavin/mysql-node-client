const CONNECTION_DATA = {
  host: 'localhost',
  port: '3307',
  user: 'myUser',
  password: 'asd123'
}

const TABLE_SCHEMA = [
  {
      name: 'id',
      type: 'INT AUTO_INCREMENT PRIMARY KEY',
  },
  {
      name: 'name',
      type: 'VARCHAR(255) NOT NULL'
  }
]

module.exports = {
  CONNECTION_DATA,
  TABLE_SCHEMA
}