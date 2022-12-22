const express = require('express')
const router = express.Router()
const {activity} = require('../controllers/activity')


router.post('/activity', activity)
router.put('/activity', activity)
router.get('/activity', activity)
router.delete('/activity', activity)