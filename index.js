if (process.env.NODE_ENV !== 'production') {
   require('dotenv').config()
}

const express = require('express')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const db = require('./db')

const initializePassport = require('./passport-config')
initializePassport(
   passport, 
   email => users.find(user => user.email === email), // scan pg instead of array
   user => db.query('SELECT id, name, email FROM users WHERE id = $1',[user.id], (err,result) => { if (err) { return err} else return result})

)

const { getProducts, getProductId } = require('./routes/products')

const PORT = process.env.PORT || 5002
const app = express()


app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
   secret: process.env.SESSION_SECRET,
   resave: false,
   saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method')) 


//home
app.get('/', checkAuthenticated, (req, res)=>{
   const { id, name, email } = req.user.rows[0]
   res.render('index.ejs', { name: name })
})
//login
app.get('/login', checkNotAuthenticated, (req, res) => {
   res.render('login.ejs')
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
   successRedirect: '/',
   failureRedirect: '/login',
   failureFlash: true
}))

app.get('/users', db.getUsers)

//register
app.get('/register', checkNotAuthenticated, (req, res) => {
   res.render('register.ejs')
})
app.post('/register', checkNotAuthenticated, async (req, res) => {
   try {
      // const hashedPassword = await bcrypt.hash(req.body.password, 10)
      
      const newUser = await db.createUser(req)
      console.log(`User Created - ${newUser.id} - ${newUser.name}`)
      
      res.redirect('/login')
   } catch {
      res.redirect('/register')
   }
})

//logout
app.delete('/logout', (req, res, next) => {
   req.logout(function(err) {
      if (err) { return next(err) }
      res.redirect('/login')
    })
})


//middleware
function checkAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return next()
   }
   res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
   if (req.isAuthenticated()) {
      return res.redirect('/')
   }
   next()
}

app.listen(PORT, ()=>{
   console.log(`Now listening on ${PORT}`)
})