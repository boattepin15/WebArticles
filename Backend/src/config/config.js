const username_db = process.env.USERNAME_DB || "root";
const password_db = process.env.PASSWORD_DB || "";
const host_db = process.env.HOST_DB || "localhost";
const database_name = process.env.DATABASE_NAME || "be_qrcode";
const port_db = process.env.PORT_DB || 3300;

module.exports = {
  username_db,
  password_db,
  host_db,
  port_db,
  database_name,
};
