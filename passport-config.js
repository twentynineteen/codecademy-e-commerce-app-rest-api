const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./db')


async function initialize(passport, getUserByEmail, getUserById) {
   const authenticateUser = async (email, password, done) => {
      const user = await db.query('SELECT * FROM users WHERE email = $1', [email], (err, result) => {
         if (err) { return done(err) }
         return result
      })
      
      if (user == null) {
         return done(null, false, { message: "No user with that email"})
      }

      try {
         if (await bcrypt.compare(password, user.rows[0].password)) {
            return done(null, user.rows[0])

         } else {
            return done(null, false, { message: "Incorrect password"})
         }
      } catch (err) {
         return done(err)
      }

   }
   passport.use(new LocalStrategy({ usernameField: 'email' },
   authenticateUser))
   passport.serializeUser((user, done) => done(null, user))
   passport.deserializeUser(async (id, done) => {
      done(null, await getUserById(id))
   })
}

module.exports = initialize