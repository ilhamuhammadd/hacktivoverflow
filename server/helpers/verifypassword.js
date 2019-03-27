const bcrypt = require('bcrypt')

const verifypassword = (password, passworddb)=>{
    const valid = bcrypt.compareSync(password, passworddb)
    return valid
}

module.exports = verifypassword