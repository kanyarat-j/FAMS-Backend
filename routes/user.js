const express = require('express')
const router = express.Router()
const { registerUser, getUserDetail, updateUserDetail, login, logout} = require('../controllers/user')
const { verifyToken } = require('../middlewares/authorize')

router.post('/register', registerUser)
router.get('/', verifyToken, getUserDetail)
router.put('/profile',verifyToken, updateUserDetail)
router.post('/login', login)
router.delete('/logout', verifyToken, logout)

module.exports = router