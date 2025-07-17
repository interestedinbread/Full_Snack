const express = require('express')
const router = express.Router()
const { protect } = require('../middleWare/authMiddleware')
const { addToShoppingList, getShoppingList } = require('../controllers/shoppingController')

router.post('/add', protect, addToShoppingList)
router.get('/get', protect, getShoppingList)

module.exports = router