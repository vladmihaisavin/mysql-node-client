const connectionQueryWrapper = require('../connectionQueryWrapper')

const parseColumns = (columns) => {
  return columns ? columns.join(', ') : '*'
}

module.exports = (connectionPool) => {

  const list = (tableName, columns) => {
    return connectionQueryWrapper(connectionPool, `SELECT ${ parseColumns(columns) } FROM ${ tableName }`)
  }

  const fetch = (tableName, filters, columns) => {
    return connectionQueryWrapper(connectionPool, `SELECT ${ parseColumns(columns) } FROM ${ tableName } WHERE ${ filters.placeholders }`, filters.values)
  }

  return {
    list,
    fetch
  }
}
