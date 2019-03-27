// const jwt = require('jsonwebtoken')
// require('dotenv').config()
// module.exports = (req, res, next) => {
//     if (req.headers.token) {
//         try {
//             req.userLoggedIn = jwt.verify(req.headers.token, process.env.SECRET_KEY)
//             next()
//         } catch {
//             res.status(401).json({
//                 message: `Invalid Token`
//             })
//         }
//     }
// }