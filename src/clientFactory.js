const createDdls = require('./commands/ddls')
const createDqls = require('./commands/dqls')
const createDmls = require('./commands/dmls')
const connectionQueryWrapper = require('./connectionQueryWrapper')

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
        fetch,
        query: connectionQueryWrapper
    }
}
