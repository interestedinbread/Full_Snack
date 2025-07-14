const express = require('express')
const router = express.Router()
const { generateMeals, multiChoiceGenerateMeals, promptGenerateMeals, saveMeal, getSavedMeals } = require('../controllers/recipeController')
const { protect } = require('../middleWare/authMiddleware')

router.post('/meals', generateMeals);
router.post('/meals/prompt', promptGenerateMeals);
router.post('/meals/multichoice', multiChoiceGenerateMeals);
router.post('/meals/save', protect, saveMeal);
router.get('/meals/saved', protect, getSavedMeals)

module.exports = router