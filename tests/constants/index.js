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

const NEW_ENTRY = {
  name: 'test_entry'
}

const GET_FILTERS = {
  placeholders: 'id = ?'
}

const UPDATED_ENTRY = {
  name: 'test_updated_name'
}

const UPDATE_FILTERS = {
  placeholders: 'id > ? AND id <= ?',
}

module.exports = {
  CONNECTION_DATA,
  TABLE_SCHEMA,
  NEW_ENTRY,
  GET_FILTERS,
  UPDATED_ENTRY,
  UPDATE_FILTERS
}