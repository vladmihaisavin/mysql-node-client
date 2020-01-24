const { expect } = require('chai')
const createMysqlClient = require('../src/clientFactory')
const { CONNECTION_DATA, TABLE_SCHEMA, NEW_ENTRY, GET_FILTERS, UPDATED_ENTRY, UPDATE_FILTERS } = require('./constants')

let mysqlClient

describe('Mysql client tests', () => {
    describe('tests without using a database', () => {
        before(() => {
            mysqlClient = createMysqlClient(CONNECTION_DATA)
        })
        
        describe('ConnectionFactory', () => {
            it('should connect to the mysqlServer', async () => {
                const connection = await mysqlClient.getConnection()
                expect(connection._connectCalled).to.equal(true)
                expect(connection.state).to.equal('authenticated')
                connection.release()
            })
        })
        
        describe('DDLs', () => {
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

        after(async () => {
            if (mysqlClient) {
                await mysqlClient.destroyConnectionPool()
            }
        })
    })

    describe('tests using a database', () => {
        before(() => {
            mysqlClient = createMysqlClient({ ...CONNECTION_DATA, database: 'test_db' })
        })

        describe('ConnectionFactory', () => {

            it('should connect to the mysqlServer', async () => {
                const connection = await mysqlClient.getConnection()
                expect(connection._connectCalled).to.equal(true)
                expect(connection.state).to.equal('authenticated')
                connection.release()
            })
        })

        describe('DDLs', () => {
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

        describe('DMLs', () => {
            let recordId
            it('should store a record', async () => {
                const data = await mysqlClient.store('test_table', NEW_ENTRY)
                expect(data.results.affectedRows).to.equal(1)
                expect(data.results.insertId).to.be.gte(1)
                recordId = data.results.insertId
            })
            
            it('should list all records', async () => {
                const data = await mysqlClient.list('test_table')
                expect(data.results).to.deep.include({ id: recordId, ...NEW_ENTRY })
            })

            it('should list all ids of the records', async () => {
                const data = await mysqlClient.list('test_table', [ 'id' ])
                expect(data.results).to.deep.include({ id: recordId })
            })
            
            it('should get record filtered by id', async () => {
                const data = await mysqlClient.fetch('test_table', { ...GET_FILTERS, values: [ recordId ]})
                expect(data.results).to.deep.include({ id: recordId, ...NEW_ENTRY })
            })
            
            it('should get record filtered by id, displaying only a column', async () => {
                const data = await mysqlClient.fetch('test_table', { ...GET_FILTERS, values: [ recordId ]}, [ 'id' ])
                expect(data.results).to.deep.include({ id: recordId })
            })
            
            it('should update record filtered by id', async () => {
                const data = await mysqlClient.update('test_table', UPDATED_ENTRY, { ...UPDATE_FILTERS, values: [ recordId - 1, recordId ]})
                expect(data.results.affectedRows).to.be.gte(1)
                expect(data.results.changedRows).to.eql(1)
            })
            
            it('should destroy record filtered by id', async () => {
                const data = await mysqlClient.destroy('test_table', { ...GET_FILTERS, values: [ recordId ]})
                expect(data.results.affectedRows).to.eql(1)
            })
        })

        after(async () => {
            if (mysqlClient) {
                await mysqlClient.destroyConnectionPool()
            }
        })
    })
})
