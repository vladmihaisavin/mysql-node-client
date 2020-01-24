const connectionQueryWrapper = require('../connectionQueryWrapper')

const prepareKeyPlaceholders = (updatedFields) => {
  const keys = Object.keys(updatedFields)
  const placeholders = []
  for (const key of keys) {
    placeholders.push(`${ key } = ?`)
  }
  return placeholders.join(', ')
}

module.exports = (connectionPool) => {

  const store = (tableName, record) => {
    return connectionQueryWrapper(connectionPool, `INSERT INTO ${ tableName } SET ?`, record)
  }

  const update = (tableName, updatedFields, filters) => {
    return connectionQueryWrapper(
      connectionPool, 
      `UPDATE ${ tableName } SET ${ prepareKeyPlaceholders(updatedFields) } WHERE ${ filters.placeholders }`,
      [
        ...Object.values(updatedFields),
        ...filters.values
      ]
    )
  }

  const destroy = (tableName, filters) => {
    return connectionQueryWrapper(connectionPool, `DELETE FROM ${ tableName } WHERE ${ filters.placeholders }`, filters.values)
  }

  return {
    store,
    update,
    destroy
  }
}
