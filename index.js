const mysqlClient = require('./src/client')
const createMysqlConnection = require('./src/connectionFactory')

module.exports = {
  mysqlClient,
  createMysqlConnection
}
