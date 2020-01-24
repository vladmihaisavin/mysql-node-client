const createMysqlClient = require('./src/clientFactory')
const createMysqlConnection = require('./src/connectionFactory')

module.exports = {
  createMysqlClient,
  createMysqlConnection
}
