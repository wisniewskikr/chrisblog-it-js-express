const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

async function createMessage(message) {
  const [result] = await pool.query(`
  INSERT INTO helloworld (message)
  VALUES (?)
  `, [message])
  return result.insertId
}

const id = await createMessage("Hello World");
console.log("id: " + id);