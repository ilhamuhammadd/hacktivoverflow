const mongoose = require('mongoose')
const hashing = require('../helpers/hashpassword')

let Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        validate: {
            validator(value) {
                return new Promise((res, rej)=>{
                    return User.findOne({
                        email: value,
                        _id: {
                            $ne: {
                                _id: this._id
                            }
                        }
                    })
                    .then((data)=>{
                        if (data) {
                            res(false)
                        } else {
                            res(true)
                        }
                    })
                    .catch(err=>{
                        res(false)
                    })
                })
            }, message: 'Email Already Taken!'
        }
    },
    password: {
        type: String
    }
})

userSchema.pre('save', function(next){
    if (this.password) {
        this.password = hashing(this.password)
    }
    next()
})

let User = mongoose.model('users', userSchema)

module.exports = User