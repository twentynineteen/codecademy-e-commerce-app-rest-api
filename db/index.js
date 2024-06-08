import pg from 'pg'
const { Pool } = pg

const pool = new Pool()

// query logging
export const query = async (text, params) => {
   const start = Date.now()
   const res = await pool.query(text, params)
   const duration = Date.now() - start
   console.log('executed query', { text, duration, rows: res.rowCount })
   return res
 }

 