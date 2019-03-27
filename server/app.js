const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const routeUser = require('./router/user')
const routePost = require('./router/post')
const port = 3000

// Setting cors policy
app.use(cors())

// Setting mongoose Database
mongoose.connect('mongodb://localhost/hacktivoverflow', {useNewUrlParser: true})

// Setting body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// Setting Route
app.use('/user', routeUser )

app.use('/', routePost)



app.listen(port, ()=> console.log('run forest run', port))