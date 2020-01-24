const connectionQueryWrapper = require('../connectionQueryWrapper')

const prepareKeyPlaceholders = (updatedFields) => {
  const keys = Object.keys(updatedFields)
  const placeholders = []
  for (const key of keys) {
    placeholders.push(`${ key } = ?`)
  }
  return placeholders.join(', ')
}

module.exports = (connection) => {

  const store = (tableName, record) => {
    return connectionQueryWrapper(connection, `INSERT INTO ${ tableName } SET ?`, record)
  }

  const update = (tableName, updatedFields, filters) => {
    return connectionQueryWrapper(
      connection, 
      `UPDATE ${ tableName } SET ${ prepareKeyPlaceholders(updatedFields) } WHERE ${ filters.placeholders }`,
      [
        ...Object.values(updatedFields),
        ...filters.values
      ]
    )
  }

  const destroy = (tableName, filters) => {
    return connectionQueryWrapper(connection, `DELETE FROM ${ tableName } WHERE ${ filters.placeholders }`, filters.values)
  }

  return {
    store,
    update,
    destroy
  }
}
