module.exports = (connection, query, options = {}) => new Promise((resolve, reject) => {
  const queryObj = connection.query(query, options, (err, results, fields) => {
    if (err) {
        return reject(err)
    }
    return resolve({ results, fields })
  })
  console.log(queryObj.sql)
})