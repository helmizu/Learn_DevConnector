const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')

router.get('/', (req, res)=> {
    res.json({msg : "Whoaaaa.... nice day"})
})

router.post('/register', (req, res) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if(user) {
            return res.status(400).json({email : 'Email already exists'})
        } else {
            const avatar = gravatar.url(req.body.email, {s:'200',r:'pg',d:'mm'})
            const newUser = new User({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                avatar
            })
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
})

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email : email})
        .then(user => {
            if(!user){
                return res.status(404).json({email: 'User email not found'})
            }

            //check password @compare bcrypt
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) res.json({msg: "login success"})
                    else return res.status(400).json({password : 'Password incorrect'})
                })
        })
})

module.exports =
 router