const { Client } = require('pg')
const { PG } = require('./config')

const createDatabase = async () => {
   const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
         id INT   PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
         email VARCHAR(100),
         password TEXT,
         name  VARCHAR (100)
      );
   `

   try {
      const db = new Client({
         user: PG.PGUSER,
         host: PG.PGHOST,
         user: PG.PGUSER,
         database: PG.PGDATABASE,
         password: PG.PGPASSWORD,
         port: PG.PGPORT
      })

      await db.connect()

      //Create tables
      await db.query(createUsersTable)

      await db.end()
   } catch(err) {
      console.log('Error creating table: ', err)
   }
}

createDatabase()
