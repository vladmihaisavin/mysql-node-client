const { expect } = require('chai')
const connectionFactory = require('../src/connectionFactory')
const createMysqlClient = require('../src/clientFactory')
const { CONNECTION_DATA, TABLE_SCHEMA } = require('./constants')

let mysqlServerConnection
let mysqlClient

describe('Mysql client tests', () => {
    describe('tests without using a database', () => {
        after(() => {
            if (mysqlServerConnection) {
                mysqlServerConnection.end()
            }
        })
        
        describe('ConnectionFactory', () => {
            it('should connect to the mysqlServer', async () => {
                mysqlServerConnection = await connectionFactory(CONNECTION_DATA)
                expect(mysqlServerConnection._connectCalled).to.equal(true)
                expect(mysqlServerConnection.state).to.equal('authenticated')
            })
        })
        
        describe('DDLs', () => {
            before(() => {
                mysqlClient = createMysqlClient(mysqlServerConnection)
            })
    
            it('should create a test database', async () => {
                const data = await mysqlClient.createDatabase('test_db')
                expect(data.results.affectedRows).to.equal(1)
            })
    
            it('should list databases', async () => {
                const data = await mysqlClient.listDatabases()
                expect(data.results).to.be.an('array')
                expect(data.results).to.deep.include({ Database: 'test_db' })
            })
        })
    })
    describe('tests using a database', () => {
        after(() => {
            if (mysqlServerConnection) {
                mysqlServerConnection.end()
            }
        })
        
        describe('ConnectionFactory', () => {
            it('should connect to the mysqlServer', async () => {
                mysqlServerConnection = await connectionFactory({ ...CONNECTION_DATA, database: 'test_db' })
                expect(mysqlServerConnection._connectCalled).to.equal(true)
                expect(mysqlServerConnection.state).to.equal('authenticated')
            })
        })

        describe('DDLs', () => {
            before(() => {
                mysqlClient = createMysqlClient(mysqlServerConnection)
            })

            it('should create a test table', async () => {
                const data = await mysqlClient.createTable('test_table', TABLE_SCHEMA)
                expect(data.results.affectedRows).to.equal(0)
            })

            it('should list tables', async () => {
                const data = await mysqlClient.listTables()
                expect(data.results).to.deep.include({ Tables_in_test_db: 'test_table' })
            })

            it('should describe a table', async () => {
                const data = await mysqlClient.describeTable('test_table')
                expect(data.results).to.deep.include({
                    Field: 'id',
                    Type: 'int(11)',
                    Null: 'NO',
                    Key: 'PRI',
                    Default: null,
                    Extra: 'auto_increment'
                })
                expect(data.results).to.deep.include({
                    Field: 'name',
                    Type: 'varchar(255)',
                    Null: 'NO',
                    Key: '',
                    Default: null,
                    Extra: ''
                })
            })
        })
    })
})
