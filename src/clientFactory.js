const createDdls = require('./commands/ddls')
const createDqls = require('./commands/dqls')
const createDmls = require('./commands/dmls')

module.exports = (connection) => {
    const { createDatabase, listDatabases, createTable, listTables, describeTable } = createDdls(connection)
    const { store, update, destroy } = createDmls(connection)
    const { list, fetch } = createDqls(connection)

    return {
        createDatabase,
        listDatabases,
        createTable,
        listTables,
        describeTable,
        store,
        update,
        destroy,
        list,
        fetch
    }
}
