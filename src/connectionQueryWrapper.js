module.exports = (connectionPool, query, options = {}) => new Promise((resolve, reject) => {
  connectionPool.getConnection((err, connection) => {
    if (err) {
      return reject(err)
    }
    console.log(`Connection id: ${ connection.threadId }`);
    const queryObj = connection.query(query, options, (err, results, fields) => {
      connection.release()
      if (err) {
          return reject(err)
      }
      return resolve({ results, fields })
    })
    console.log(`Executed: ${ queryObj.sql }`)
  })
})