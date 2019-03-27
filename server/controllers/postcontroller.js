const Post = require('../models/post')
const User = require('../models/user')
const jwtconvert = require('../helpers/jwtconvert').decodetoken

class PostController {

    static create(req, res) {
        const { body, headers } = req
        jwtconvert(headers.token)
            .then(data=>{
               return User.findOne({ email: data.email })
            })
            .then(user=>{
                let obj = {
                    title: body.title,
                    description: body.description,
                    userId: user._id,
                    createdAt: new Date,
                }
                return Post.create(obj)
            })
            .then(post=>{
                res.status(201).json(post)
            })
            .catch(err=>{
                res.status(500).json({message: 'Invalid Token!'})
            })
    }

    static findAll(req, res) {
        Post.find({})
            .sort([['createdAt', -1]])
            .populate('userId')
            .then(posts=>{
                res.status(200).json(posts)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static findOne(req, res) {
        const { params } = req
        Post.findOne({ _id: params.id })
            .populate('userId')
            .populate('answerId')
            .then(post=>{
                res.status(200).json(post)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static upVote(req, res) {

        const { params, body, headers } = req
        jwtconvert(headers.token)
            .then(data=>{
                return User.findOne({ email: data.email})
            })
            .then(user=>{
                return Post.updateOne({_id: params.id}, { $push: { upvotes: user._id }})
            })
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static downVote(req, res) {

        const { params, body , headers} = req
        jwtconvert(headers.token)
            .then(data=>{
                return User.findOne( { email: data.email})
            })
            .then(user=>{
                return Post.updateOne({_id: params.id}, {$push: { downvotes: user._id}})
            })
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static editPost(req, res) {
        const { params, body, headers } = req
        // const isValid = jwtconvert(headers.token)
        jwtconvert(headers.token)
            .then(data=>{
                return User.findOne({ email: data.email })
            })
            .then(user=>{
                let obj = {
                    title: body.title,
                    description: body.description,
                    userId: user._id,
                    createdAt: new Date()
                }
                return Post.updateOne({_id: params.id}, {$set: obj})
            })
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(err=>{
                res.status(500).json({message: 'Invalid Token!'})
            })
    }

    static deletePost(req, res) {
        const {params, headers } = req

        jwtconvert(headers.token)
            .then(data=>{
                return User.findOne({email: data.email})
            })
            .then(user=>{
                return Post.deleteOne({_id: params.id})
            })
            .then(response=>{
                res.status(200).json(response)
            })
            .catch(err=>{
                res.status(500).json({message: 'Invalid Token!'})
            })
    }
}

module.exports = PostController