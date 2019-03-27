const jwt = require('jsonwebtoken')
require('dotenv').config()

const converttotoken = (payload)=>{
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const decodetoken = (token)=>{
    return new Promise ((resolve,reject)=>{
        jwt.verify(token,process.env.SECRET_KEY,(err,data)=>{
            if(!err){
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
    // return jwt.verify(token, process.env.SECRET_KEY)
}

module.exports = {converttotoken, decodetoken}