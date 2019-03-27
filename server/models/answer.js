const mongoose = require('mongoose')

let Schema = mongoose.Schema

let answerSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    upvote: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Users'
        }
    ],
    downvote: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Users'
        }
    ],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },
    createdAt: Date
})

let Answer = mongoose.model('answers', answerSchema)

module.exports = Answer