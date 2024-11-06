const jwt = require('jsonwebtoken')

function createToken(obj) {
    return jwt.sign(obj, process.env.JWT_SECRTE, {expiresIn: 60 * 60 * 60})
}

module.exports = createToken;