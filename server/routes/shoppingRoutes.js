const express = require('express')
const router = express.Router()
const { protect } = require('../middleWare/authMiddleware')
const { addToShoppingList, getShoppingList, deleteFromShoppingList } = require('../controllers/shoppingController')

router.post('/add', protect, addToShoppingList)
router.get('/get', protect, getShoppingList)
router.delete('/:id', protect, deleteFromShoppingList)

module.exports = router