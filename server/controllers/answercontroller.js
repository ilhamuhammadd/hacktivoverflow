const Answer = require('../models/answer')
const User = require('../models/user')
const Post = require('../models/post')
const jwtconvert = require('../helpers/jwtconvert').decodetoken

class AnswerController {

    static create(req, res) {

        const { headers, body, params } = req
        jwtconvert(headers.token)
            .then(data => {
                console.log(data)
                return User.findOne({
                    email: data.email
                })
            })
            .then(user => {
                // console.log(user)
                let obj = {
                    title: body.title,
                    description: body.description,
                    userId: user._id,
                    postId: body.postId,
                    createdAt: new Date(),
                }
                return Answer.create(obj)
            })
            .then(answer=>{
                return Post.updateOne({_id: body.postId}, { $push: { answerId: answer._id}})
            })
            .then(post=>{
                res.status(201).json(post)
            })
            .catch(err => {
                res.status(500).json({message: 'Invalid Token!'})
            })
        }

    static getAnswer(req, res) {
        Answer.find({})
            .populate('userId')
            .populate('postId')
            .then(answer=>{
                res.status(200).json(answer)
            })
            .catch(err=>{
                res.status(500).json(err)
            })
    }

    static deleteAnswer(req, res) {
        const { headers, params } = req
        jwtconvert(headers.token)
            .then(data=>{
                console.log(data)
                return User.findOne({email: data.email})
            })
            .then(user=>{
                console.log(user)
                return Answer.deleteOne({_id: params.id})
            })
            .then(response=>{
                console.log(response)
                res.status(200).json(response)
            })
            .catch(err=>{
                res.status(500).json({message: 'Invalid Token!'})
            })
    }
}

module.exports = AnswerController