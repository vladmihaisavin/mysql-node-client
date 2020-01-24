const mysql = require('mysql');

module.exports = ({ host, port, user, password, database }) => {
  const connection = mysql.createConnection({ host, port, user, password, database });

  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        console.error('error connecting: ' + err.stack)
        return reject(err)
      }
      console.log('connected as id ' + connection.threadId);
      return resolve(connection)
    })
  })
}