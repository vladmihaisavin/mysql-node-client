const { expect } = require('chai')
const connectionFactory = require('../src/connectionFactory')
const createMysqlClient = require('../src/client')

const CONNECTION_DATA = {
    host: 'localhost',
    port: '3307',
    user: 'myUser',
    password: 'asd123'
}

let mysqlServerConnection

describe('Mysql client tests', () => {
    after(() => {
        if (mysqlServerConnection) {
            mysqlServerConnection.end()
        }
    })
    
    describe('ConnectionFactory', () => {
        it('should connect to the mysqlServer', async () => {
            try {
                mysqlServerConnection = await connectionFactory(CONNECTION_DATA)
                expect(mysqlServerConnection._connectCalled).to.equal(true)
                expect(mysqlServerConnection.state).to.equal('authenticated')
            } catch (err) {
                console.log(err)
            }
        })
    })
    
    describe('DDLs', () => {
        it('should show databases', async () => {
            try {
                const mysqlClient = createMysqlClient(mysqlServerConnection)
                const data = await mysqlClient.showDatabases()
                expect(data.results).to.be.an('array')
            } catch (err) {
                console.log(err)
            }
        })
    })
})
