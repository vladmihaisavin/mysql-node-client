# MYSQL-NODE-CLIENT
A Node.js mysql client implementation, using the following mysql driver: https://www.npmjs.com/package/mysql

# Highlights

## Install & Kickstart

Installation is done using the `npm install` command

```
$ npm install mysql-node-client
```

In order to create an instance of the mysqlClient, you must do the following:

```javascript
const createMysqlClient = require('mysql-node-client')

const CONNECTION_DATA = {
  host: 'localhost',
  port: '3307',
  user: 'myUser',
  password: 'asd123',
  database: 'test_db'
}

const test = async () => {
  try {
    //create an instance of the client
    const mysqlClient = createMysqlClient(CONNECTION_DATA)
    //call a method exposed by the client
    const data = await mysqlClient.list('test_table')
    //use the response data
    console.log(data.results)
    //destroy the connection pool when it's not needed anymore
    mysqlClient.destroyConnectionPool()
  } catch (err) {
    console.log(err)
  }
}
test()
```

## Methods exposed by the client
### __DDLs__

* `createDatabase` - The connection __must not__ be using a database name
```javascript
const data = await mysqlClient.createDatabase('test_db')
```
* `listDatabases` - The connection __must not__ be using a database name
```javascript
const data = await mysqlClient.listDatabases()
```
* `createTable`
```javascript
const TABLE_SCHEMA = [
  {
      name: 'id',
      type: 'INT AUTO_INCREMENT PRIMARY KEY',
  },
  {
      name: 'name',
      type: 'VARCHAR(255) NOT NULL'
  }
]
const data = await mysqlClient.createTable('test_table', TABLE_SCHEMA)
```
* `listTables`
```javascript
const data = await mysqlClient.listTables()
```
* `describeTable`
```javascript
const data = await mysqlClient.describeTable('test_table')
```

### __DMLs__
* `store`
```javascript
const data = await mysqlClient.store(
  'test_table', //tableName
  { //record
    name: 'test_entry'
  }
)
```
* `update`
```javascript
const data = await mysqlClient.update(
  'test_table', //tableName
  { name: 'test_updated_name' }, //updatedFields
  { placeholders: 'id > ? AND id <= ?', values: [ recordId - 1, recordId ]} //filters
)

```
* `destroy`
```javascript
const data = await mysqlClient.destroy(
  'test_table', //tableName
  { placeholders: 'id = ?', values: [ recordId ]} //filters
)
```

### __DQLs__
* `list` - Supports columns projection
```javascript
const data = await mysqlClient.list(
  'test_table', //tableName
  [ 'id' ] //projection - only these columns will be returned. if absent, all columns are displayed
)
```
* `fetch` - Supports columns projection and filtering
```javascript
const data = await mysqlClient.fetch(
  'test_table', //tableName
  { placeholders: 'id = ?', values: [ recordId ]}, //filters
  [ 'id' ] //projection - only these columns will be returned. if absent, all columns are displayed
)
```

### __Other__
* `getConnection` - Used for retrieving a connection from the connection pool, or creating a new one. That connection is locked and can be used until it is released.
```javascript
//create an instance of the client
const mysqlClient = createMysqlClient(CONNECTION_DATA)
//retrieve or create a connection to the db
const connection = await mysqlClient.getConnection()
//use any method from the connection object, as provided by the mysql driver
connection.query('SELECT * FROM test_table', (err, results, fields) => {
  if (err) throw err
  console.log(results)
})
```
* `destroyConnectionPool` - Destroy the connection pool when it's not needed anymore
* `query` - A wrapper over the base query method. Extras: _connection management_ (retrieval and release from/to the connection pool), logging system (connection id and sql query executed).
```javascript
const data = await mysqlClient.query('SELECT count(*) FROM test_table')
```
