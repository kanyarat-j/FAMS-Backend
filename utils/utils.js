const UserLogin = require("../models/userLogin");

function wrapUpResponseData(result, data, status, token="") {
    const output = {
       data: data,
       result: result,
       status: status,
       token: token,
    }
    return output
}

function getRequestToken(req) {
    const token = req.headers.authorization
    return token
}


async function checkUserLogin(email) {
    const loginedUser = await UserLogin.findOne({email})
    return loginedUser
}

module.exports = {
    wrapUpResponseData,
    getRequestToken,
    checkUserLogin,
}