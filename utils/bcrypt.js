const bcrypt = require('bcrypt');
require('dotenv').config()
const saltRounds = parseInt(process.env.SALTROUND);


async function hashPassword(password) {
    const encryptedPassword = await bcrypt.hash(password, saltRounds)
    return encryptedPassword
}   

async function checkPassword(password, encryptedPassword) {
    const match = await bcrypt.compare(password, encryptedPassword);
    return match // true if same password
}

module.exports = {
    hashPassword,
    checkPassword
}