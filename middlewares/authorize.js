const { decodeToken } = require('../utils/jwt')
const { UnauthorizedError, BadRequestError } = require('../middlewares/errors')
const { getRequestToken, checkUserLogin } = require('../utils/utils')

async function verifyToken(req, res, next) {
    try {
        const token = getRequestToken(req)

        //verify 
        try {
            const decoded = decodeToken(token)
            req.email = decoded.data

            const loginedUser = await checkUserLogin(req.email)
            if (!loginedUser) {
                // already logout
                throw new UnauthorizedError("Please login")
            }

            next()
        } catch (error) {
            throw new UnauthorizedError("Unauthorized")
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    verifyToken
}