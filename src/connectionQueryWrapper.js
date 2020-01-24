module.exports = (connection, query) => new Promise((resolve, reject) => {
  connection.query(query, (err, results, fields) => {
    if (err) {
        return reject(err)
    }
    return resolve({ results, fields })
  })
})