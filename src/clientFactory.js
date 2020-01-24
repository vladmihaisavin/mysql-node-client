const createDdls = require('./commands/ddls')
const createDqls = require('./commands/dqls')
const createDmls = require('./commands/dmls')

module.exports = (connection) => {
    const { createDatabase, listDatabases, createTable, listTables, describeTable } = createDdls(connection)

    return {
        createDatabase,
        listDatabases,
        createTable,
        listTables,
        describeTable
    }
}
