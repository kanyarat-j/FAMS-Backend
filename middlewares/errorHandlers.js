
function errorHandler(err, req, res, next) {
    

    if (err.status == undefined) {
        err.status = 500
        err.name = "Error"
    }
    
    const error = {
        name: err.name,
        status: err.status,
        error: err.message,
    }
    res.status(err.status).json(error)
}

module.exports = { errorHandler }