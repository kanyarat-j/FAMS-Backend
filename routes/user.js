const express = require('express')
const router = express.Router()
const { registerUser, getUserDetail, updateUserDetail, login, logout} = require('../controllers/user')
const {addActivity,  updateActivity, getActivity, getActivities,removeActivity} = require('../controllers/activity')
const { verifyToken } = require('../middlewares/authorize')

router.post('/register', registerUser)
router.get('/', verifyToken, getUserDetail)
router.put('/profile',verifyToken, updateUserDetail)
router.post('/login', login)
router.delete('/logout', verifyToken, logout)

router.post('/activities', addActivity)
router.put('/activities/:id', updateActivity)
router.get('/activities/:id', getActivity)
router.delete('/activities/:id', removeActivity)
router.get('/activities', getActivities)


module.exports = router