const createDdls = require('./commands/ddls')

module.exports = (connection) => {
    const { showDatabases } = createDdls(connection)

    return {
        showDatabases
    }
}
