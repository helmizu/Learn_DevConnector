const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()

//Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//DB Config
const db = require('./config/keys').mongoURI
//Connect to DB
mongoose.connect(db, { useNewUrlParser: true })
    .then(()=> console.log('MongoDB Connected'))
    .catch(err => console.log(err))


//Passport middleware
app.use(passport.initialize())

//Passport Config
require('./config/passport')(passport)

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

//Server static assets if in Production
if(process.env.NODE_ENV === 'production') {
    // set static folder
    app.use(express.static('client/build'))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5555

app.listen(port, () => console.log('Server run in port', port))
