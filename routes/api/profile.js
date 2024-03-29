const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const errors = {}
    
    Profile.findOne({ user: req.user.id })
    .populate('user', ['name', 'email', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user'
            return res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

router.get('/handle/:handle', (req, res) => {
    const errors = {}
    
    Profile.findOne({handle : req.params.handle})
    .populate('user',['name', 'email', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user'
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json(err))
})

router.get('/all', (req, res) => {
    const errors = {}
    
    Profile.find()
    .populate('user', ['name', 'email', 'avatar'])
    .then(profiles => {
        if(!profiles){
            errors.noprofiles = 'There are no profiles'
            return res.status(404).json(errors)
        }
        res.json(profiles)
    })
    .catch(err => res.status(404).json({noprofiles : 'There are no profiles'}))
})

router.get('/user/:uid', (req, res) => {
    const errors = {}
    
    Profile.findOne({user : req.params.uid})
    .populate('user',['name', 'email', 'avatar'])
    .then(profile => {
        if(!profile){
            errors.noprofile = 'There is no profile for this user'
            res.status(404).json(errors)
        }
        res.json(profile)
    })
    .catch(err => res.status(404).json({noprofile : 'There is no profile for this user'}))
})

//Create or Update Profile
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    //validation
    const {errors, isValid} = validateProfileInput(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    //getFields
    const profileFields = {}
    profileFields.user = req.user.id
    
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.company) profileFields.company = req.body.company
    if(req.body.website) profileFields.website = req.body.website
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.status) profileFields.status = req.body.status
    if(req.body.github) profileFields.github = req.body.github
    
    //skills - split into array
    if(typeof req.body.skills !== 'undefined') {
        profileFields.skills = req.body.skills.split(',')
    }
    
    //social
    profileFields.social = {};
    if(req.body.youtube) profileFields.social.youtube = req.body.youtube
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram
    
    Profile.findOne({ user : req.user.id})
    .then(profile => {
        if(profile) {
            //update
            Profile.findOneAndUpdate({ user : req.user.id }, {$set : profileFields }, {new: true})
            .then(profile => res.json(profile))
        } else {
            //create
            //check if handle exist
            Profile.findOne({ handle : profileFields.handle })
            .then(profile => {
                if(profile){
                    errors.handle = 'That handle already exists'
                    res.status(400).json(errors)
                }
                
                new Profile(profileFields).save().then(profile => res.json(profile))
            })
        }
    })
})

router.post('/experience', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateExperienceInput(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    Profile.findOne({ user : req.user.id })
    .then(profile => {
        const newExp = {
            title : req.body.title,
            company : req.body.company,
            location : req.body.location,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description
        }
        
        // add to exp array
        profile.experience.unshift(newExp)
        
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(400).json(err))
})

router.post('/education', passport.authenticate('jwt', {session: false}), (req, res) => {
    const { errors, isValid } = validateEducationInput(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    Profile.findOne({ user : req.user.id })
    .then(profile => {
        const newEdu = {
            school : req.body.school,
            degree : req.body.degree,
            fieldofstudy : req.body.fieldofstudy,
            from : req.body.from,
            to : req.body.to,
            current : req.body.current,
            description : req.body.description
        }
        
        // add to exp array
        profile.education.unshift(newEdu)
        
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(400).json(err))
})

router.delete('/experience/:expid', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user : req.user.id }).then(profile => {
        //get remove index
        const removeIndex = profile.experience
        .map(item => item.id)
        .indexOf(req.params.expid)
        //splice out of array
        if(removeIndex >= 0)
        profile.experience.splice(removeIndex, 1)
        //save
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

router.delete('/education/:eduid', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOne({ user : req.user.id }).then(profile => {
        //get remove index
        const removeIndex = profile.education
        .map(item => item.id)
        .indexOf(req.params.eduid)
        //splice out of array
        if(removeIndex >= 0)
        profile.education.splice(removeIndex, 1)
        console.log(removeIndex)
        //save
        profile.save().then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json(err))
})

//delete profile and user
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    Profile.findOneAndRemove({user : req.user.id}).then(() => {
        User.findByIdAndRemove(req.user.id).then(() => res.json({success: true}))
    })
})

module.exports = router