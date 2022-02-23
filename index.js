const express = require('express')
const mongoose = require('mongoose')
const app = express()
const personRouter = require('./routes/personRoutes')

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.get('/', (req, res) => {
    res.json({message:'Olá Mundo'})
})

app.use('/person', personRouter)

const DB_USER = 'your-mongo-atlas-user'
const DB_PASS = encodeURIComponent('your-db-password')

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.ez4xe.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)
.then(()=>{
    console.log('Conectado ao MongoDB');
    app.listen(3000)
})
