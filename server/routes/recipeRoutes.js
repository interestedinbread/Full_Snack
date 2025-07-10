const express = require('express')
const router = express.Router()
const { generateMeals } = require('../controllers/recipeController')

router.post('/meals', generateMeals);

module.exports = router