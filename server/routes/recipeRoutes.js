const express = require('express')
const router = express.Router()
const { generateMeals, multiChoiceGenerateMeals, promptGenerateMeals, saveMeal, getSavedMeals } = require('../controllers/recipeController')
const { protect } = require('../middleWare/authMiddleware')

router.post('/meals', protect, generateMeals);
router.post('/meals/prompt', protect, promptGenerateMeals);
router.post('/meals/multichoice', protect, multiChoiceGenerateMeals);
router.post('/meals/save', protect, saveMeal);
router.get('/meals/saved', protect, getSavedMeals)

module.exports = router