const { Pool } = require('pg');
const { PG } = require('../config');

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
const createUser = async (req, res) => {
  const { email, password, name } = req.body
  // contain within try catch so that it returns user id
  try {
    // todo - insert bcrypt hash for password
    const newUser = await pool.query(
      'INSERT INTO users (email, password, name) VALUES ($1, $2, $3) RETURNING id;',
      [email, password, name])
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

 