const connectionQueryWrapper = require('../connectionQueryWrapper')

const parseSchema = (schema) => {
  const columns = []
  for (const column of schema) {
    columns.push(`${ column.name } ${column.type}`)
  }
  return columns.join(', ')
}

module.exports = (connection) => {

  const createDatabase = (dbName) => {
    return connectionQueryWrapper(connection, `CREATE DATABASE IF NOT EXISTS ${ dbName }`)
  }

  const listDatabases = () => {
    return connectionQueryWrapper(connection, 'SHOW DATABASES')
  }

  const createTable = (name, schema) => {
    return connectionQueryWrapper(connection, `CREATE TABLE IF NOT EXISTS ${ name } (${ parseSchema(schema) })`)
  }

  const listTables = () => {
    return connectionQueryWrapper(connection, 'SHOW TABLES')
  }
  
  const describeTable = (name) => {
    return connectionQueryWrapper(connection, `DESCRIBE ${ name }`)
  }

  return {
    createDatabase,
    listDatabases,
    createTable,
    listTables,
    describeTable
  }
}
