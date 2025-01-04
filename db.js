const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Change this to your MySQL username
  password: '',      // Change this to your MySQL password
  database: 'inquiry_db'
});

// Test the connection to the database
pool.promise().getConnection()
  .then(connection => {
    console.log('Database connected successfully!');
    connection.release();  // Always release the connection back to the pool
  })
  .catch(err => {
    console.error('Database connection failed:', err.message);
  });

// Export the pool for querying
module.exports = pool.promise();
// const mysql = require('mysql2');

// // Create a MySQL connection pool for the live database
// const pool = mysql.createPool({
//   host: '127.0.0.1',     // Replace with the actual host (e.g., '127.0.0.1' or 'db.example.com')
//   user: 'think_in1_phpma',        // Your MySQL username
//   password: 'Pradeesh@#$12345',   // Your MySQL password
//   database: 'think_in1_inquiry_db', // Your database name
//   port: 3306,                     // Default MySQL port
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// // Test the connection to the live database
// pool.promise().getConnection()
//   .then(connection => {
//     console.log('Live database connected successfully!');
//     connection.release();  // Release the connection back to the pool
//   })
//   .catch(err => {
//     console.error('Live database connection failed:', err.message);
//   });

// module.exports = pool.promise();




