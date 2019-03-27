const User = require('../models/user')
const verify = require('../helpers/verifypassword')
const jwtconvert =require('../helpers/jwtconvert').converttotoken

class UserController {

    static signup(req, res) {
        const {body } = req

        let obj = {
            name: body.name,
            email: body.email,
            password: body.password
        }

        User.create(obj)
            .then(user=>{
                res.status(201).json({
                    message: 'User created'
                })
            })
            .catch(err=>{
                res.status(500).json(err)
            })
     }

     static signin(req, res) {
         const { body } = req

        User.findOne({
            email: body.email
        })
        .then(user=>{
            const isValid = verify(body.password, user.password)
            if (isValid) {
                let payload = {
                    email: user.email
                }

                let token = jwtconvert(payload)

                res.status(200).json({
                    token: token,
                    user: user._id
                })
            } else {
                res.status(500).json({message: 'Username/Password Invalid'})
            }
        })
        .catch(err=>{
            res.status(500).json({message: 'Username/Password Invalid'})
        })
     }


}

module.exports = UserController