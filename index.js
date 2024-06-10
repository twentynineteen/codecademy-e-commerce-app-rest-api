const express = require('express')
const bcrypt = require('bcrypt')

const { getProducts, getProductId } = require('./routes/products')

const PORT = process.env.PORT || 5002
const app = express()

const users = []

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false}))
//middleware


//home
app.get('/', (req, res)=>{
   res.render('index.ejs', { name: 'Dan' })
})
//login
app.get('/login', (req, res) => {
   res.render('login.ejs')
})
app.post('/login', (req, res) => {
   res.render('login.ejs')
})
//register
app.get('/register', (req, res) => {
   res.render('register.ejs')
})
app.post('/register', async (req, res) => {
   try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      users.push({
         id: Date.now().toString(),
         name: req.body.name,
         email: req.body.email,
         password: hashedPassword
      })
      res.redirect('/login')
   } catch {
      res.redirect('/register')
   }

   console.log(users)
})


//routes


app.get('/products', getProducts)
app.get('/products/:id', getProductId)
app.post('/products/', (req, res)=>{
   res.status
})
app.put('/products/:id', (req, res)=>{
   res.status
})
app.delete('/products/:id', (req, res)=>{
   res.status
})


app.listen(PORT, ()=>{
   console.log(`Now listening on ${PORT}`)
})