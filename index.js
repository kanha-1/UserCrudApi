const express = require('express')
const app = express()
PORT = process.env.PORT || 8000
require('./db')

// import route
const userRoutes = require('./routes/userRoutes')

// Middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Route middlewere
app.use("/api",userRoutes)

app.get('/', (req, res) =>{
    res.send('hello world')
})
app.listen(PORT,() => {
    console.log(`server listening on port ${PORT}`)
})