const express = require('express')
const router = express.Router()
const { generateMeals, saveMeal, getSavedMeals } = require('../controllers/recipeController')
const { protect } = require('../middleWare/authMiddleware')


router.post('/meals', generateMeals);
router.post('/meals/save', saveMeal);
router.get('/meals/saved', getSavedMeals)


module.exports = router