const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

const authRoutes = require('./routes/authRoutes')
const recipeRoutes = require('./routes/recipeRoutes')
const shoppingRoutes = require('./routes/shoppingRoutes')

app.use('/api/auth', authRoutes)
app.use('/api', recipeRoutes)
app.use('/api/list', shoppingRoutes)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})