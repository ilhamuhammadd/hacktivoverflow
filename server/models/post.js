const mongoose = require('mongoose')

let Schema = mongoose.Schema

let postSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    upvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    downvotes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    userId: { 
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    answerId: [
        {
            type: Schema.Types.ObjectId,
            ref: 'answers'
        }
    ],
    createdAt: {
        type: Date
    }
})

let Post = mongoose.model('posts', postSchema)

module.exports = Post