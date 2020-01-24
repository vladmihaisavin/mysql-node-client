const mysql = require('mysql')
const createDdls = require('./commands/ddls')
const createDqls = require('./commands/dqls')
const createDmls = require('./commands/dmls')
const connectionQueryWrapper = require('./connectionQueryWrapper')

module.exports = ({ host, port, user, password, database }, overrides) => {
    const connectionPool = mysql.createPool({
        connectionLimit: 100,
        queueLimit: 100,
        host,
        port,
        user,
        password,
        database,
        ...overrides
    })
    const { createDatabase, listDatabases, createTable, listTables, describeTable } = createDdls(connectionPool)
    const { store, update, destroy } = createDmls(connectionPool)
    const { list, fetch } = createDqls(connectionPool)

    const getConnection = () => new Promise((resolve, reject) => {
        connectionPool.getConnection((err, connection) => {
            if (err) {
              return reject(err)
            }
            console.log('Connection id: ' + connection.threadId)
            resolve(connection)
        })
    })

    const destroyConnectionPool = () => new Promise((resolve, reject) => {
        connectionPool.end((err) => {
            if (err) {
                reject(err)
            }
            console.log('Connection pool closing...')
            resolve()
        })
    })

    const query = (query, options = {}) => {
        return connectionQueryWrapper(connectionPool, query, options)
    }

    return {
        getConnection,
        destroyConnectionPool,
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
        query
    }
}
