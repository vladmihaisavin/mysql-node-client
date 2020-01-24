
module.exports = (connection) => {
  const showDatabases = () => {
    return new Promise((resolve, reject) => {
      connection.query('SHOW DATABASES', (err, results, fields) => {
        if (err) {
            return reject(err)
        }
        return resolve({ results, fields })
      })
    })
  }
  
  return {
    showDatabases
  }
}
