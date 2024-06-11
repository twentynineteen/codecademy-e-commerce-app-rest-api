const { Pool } = require('pg');
const { PG } = require('../config');
const bcrypt = require('bcrypt')

const pool = new Pool({
  user: PG.PGUSER,
  host: PG.PGHOST,
  database: PG.PGDATABASE,
  password: PG.PGPASSWORD,
  port: PG.PGPORT
});

const getUsers = (req, res) => {
   pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
   })
}

const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    return hashedPassword
  } catch (err) {
    return err.stack
  }
}

const createUser = async (req, res) => {
  const { email, password, name } = req.body
  try {
    const hashedPassword = await hashPassword(password)
    const newUser = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id;',
      [email, hashedPassword, name])
    return newUser.rows[0]
    } catch (err) {
      return err.stack
    }
}


module.exports = {
  query: (text, params) => pool.query(text, params),
  getUsers,
  createUser
}

 