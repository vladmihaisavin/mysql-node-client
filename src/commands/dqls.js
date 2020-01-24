const connectionQueryWrapper = require('../connectionQueryWrapper')

const parseColumns = (columns) => {
  return columns ? columns.join(', ') : '*'
}

module.exports = (connection) => {

  const list = (tableName, columns) => {
    return connectionQueryWrapper(connection, `SELECT ${ parseColumns(columns) } FROM ${ tableName }`)
  }

  const fetch = (tableName, filters, columns) => {
    return connectionQueryWrapper(connection, `SELECT ${ parseColumns(columns) } FROM ${ tableName } WHERE ${ filters.placeholders }`, filters.values)
  }

  return {
    list,
    fetch
  }
}
