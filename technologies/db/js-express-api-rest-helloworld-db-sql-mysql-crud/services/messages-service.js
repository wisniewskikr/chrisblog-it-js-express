import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function getAll() {
  const [rows] = await pool.query('SELECT * FROM messages');
  return rows;
}

export async function getById(id) {
  const [rows] = await pool.query(`
  SELECT * FROM messages
  WHERE id = ?
  `, [id]);
  return rows[0];
}

export async function add(message) {
  await pool.query(`
  INSERT INTO messages (id, text)
  VALUES (?, ?)
  `, [message.id, message.text])
}

export async function update(message) {
  await pool.query(`
  UPDATE messages 
  SET text = ?
  WHERE id = ?
  `, [message.text, message.id])
}

export async function deleteById(id) {
  await pool.query(`
  DELETE FROM messages 
  WHERE id = ?
  `, [id])
}