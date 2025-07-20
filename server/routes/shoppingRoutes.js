const express = require('express')
const router = express.Router()
const { protect } = require('../middleWare/authMiddleware')
const { addToShoppingList, getShoppingList, deleteFromShoppingList, multiDeleteFromShoppingList, multiAddToShoppingList } = require('../controllers/shoppingController')

router.post('/add', protect, addToShoppingList)
router.get('/get', protect, getShoppingList)
router.delete('/:id', protect, deleteFromShoppingList)
router.post('/delete-multiple', protect, multiDeleteFromShoppingList)
router.post('/add-multiple', protect, multiAddToShoppingList)

module.exports = router