const connectionQueryWrapper = require('../connectionQueryWrapper')

const parseSchema = (schema) => {
  const columns = []
  for (const column of schema) {
    columns.push(`${ column.name } ${column.type}`)
  }
  return columns.join(', ')
}

module.exports = (connectionPool) => {

  const createDatabase = (dbName) => {
    return connectionQueryWrapper(connectionPool, `CREATE DATABASE IF NOT EXISTS ${ dbName }`)
  }

  const listDatabases = () => {
    return connectionQueryWrapper(connectionPool, 'SHOW DATABASES')
  }

  const createTable = (name, schema) => {
    return connectionQueryWrapper(connectionPool, `CREATE TABLE IF NOT EXISTS ${ name } (${ parseSchema(schema) })`)
  }

  const listTables = () => {
    return connectionQueryWrapper(connectionPool, 'SHOW TABLES')
  }
  
  const describeTable = (name) => {
    return connectionQueryWrapper(connectionPool, `DESCRIBE ${ name }`)
  }

  return {
    createDatabase,
    listDatabases,
    createTable,
    listTables,
    describeTable
  }
}
