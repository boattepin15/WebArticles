const username_db = "root";
const password_db = "";
const host_db = "localhost";
const database_name = "be_qrcode";
const port_db = 3300;

// Import Sequelize
const Sequelize = require('sequelize');

// Create a new Sequelize instance using the imported configuration
const sequelize = new Sequelize(database_name, username_db, password_db, {
  host: host_db,
  port: port_db, // Use the specified port
  dialect: 'mysql',
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
