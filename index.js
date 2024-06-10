const express = require('express')
const { getProducts, getProductId } = require('./routes/products')

const PORT = process.env.PORT || 5002
const app = express()

//middleware

//login

//routes
app.get('/', (req, res)=>{
   res.send('hello, world!')
})
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