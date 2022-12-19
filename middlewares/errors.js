
class BadRequestError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Bad request'
        this.status = 400
    }
}

class UnauthorizedError extends Error {
    constructor(message) {
        super(message)
        this.name = 'Unauthorized'
        this.status = 401
    }
   
}

module.exports = {
    BadRequestError,
    UnauthorizedError,
}