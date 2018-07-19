const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
const User = require('../../models/User')

const ValidatePostInput = require('../../validation/post')

router.get('/', passport.authenticate('jwt', { session: false }), (req, res)=> {
    Post.find()
    .sort({date:-1})
    .then(posts => {
        res.json(posts)
    })
    .catch( err => {
        res.status(404).json({noPostFound : 'No posts found'})
    })
})

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res)=> {
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            return res.status(404).json({noPostFound : 'No post found, May this post was delete'})
        }
        res.json(post)
    })
    .catch( err => {
        res.status(404).json({noPostFound : 'No post found, May this post was delete'})
    })
})

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    const newPost = new Post({
        text : req.body.text,
        name : req.body.name,
        avatar : req.body.avatar,
        user : req.user.id
    })
    
    newPost.save().then(post => res.json(post))
})

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res)=> {
    Profile.findOne({ user : req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            //Check for post owner
            if(post.user.toString() !== req.user.id){
                return res.status(401).json({ noAuthorized : 'User not authorized' })
            }
            
            //delete
            post.remove().then(() => {
                res.json({ success : true })
            })
        })
        .catch(err => res.status(404).json({postnotfound : 'No post found'}))
    })
})

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res)=> {
    Profile.findOne({ user : req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            const userLike = post.likes.filter(like => like.user, req.user.id)
            if(userLike.length > 0){
                return res.status(400).json({ alreadyliked : 'User already liked this post' })
            }
            //add user id to likes array
            post.likes.unshift({ user: req.user.id })
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json(err))
    })
})

router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res)=> {
    Profile.findOne({ user : req.user.id })
    .then(profile => {
        Post.findById(req.params.id)
        .then(post => {
            const userLike = post.likes.filter(like => like.user, req.user.id)
            if(userLike.length === 0){
                return res.status(400).json({ notliked : 'You have not yet liked this post' })
            }
            //remove user id to likes array
            const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id)
            if(removeIndex >= 0)
            post.likes.splice(removeIndex, 1)
            
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json(err))
    })
})

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = ValidatePostInput(req.body)
    
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    Post.findById(req.params.id)
    .then(post => {
        const newComment = {
            text : req.body.text,
            name : req.body.name,
            avatar : req.body.avatar,
            user : req.user.id
        }
        
        post.comments.unshift(newComment)
        
        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(400).json({ postnotfound : 'No post found' }))
})

router.delete('/comment/:postid/:commentid', passport.authenticate('jwt', { session: false }), (req, res) => {
    Post.findById(req.params.postid)
    .then(post => {
        
        if (post.comments.filter(comment => comment._id, req.params.commentid).length === 0) {
            return res.status(404).json({ commentnotexists : 'Comment does not exist' })
        }
        
        //remove comment from comments array
        const removeIndex = post.comments
        .map(item => item._id.toString())
        .indexOf(req.params.commentid)
        if(removeIndex >= 0)
        post.comments.splice(removeIndex, 1)
        
        post.save().then(post => res.json(post))
    })
    .catch(err => res.status(400).json({ postnotfound : 'No post found' }))
})

module.exports = router