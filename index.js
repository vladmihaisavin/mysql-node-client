var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  port: '3307',
  user: 'myUser',
  password: 'asd123'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('connected as id ' + connection.threadId);
  connection.query('SHOW DATABASES', (error, results, fields) => {
    if (error) throw error;
    // connected!
    console.log(results, fields)
    process.exit(0)
  })
});
