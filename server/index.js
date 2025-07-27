const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const allowedOrigins = [process.env.FRONTEND_URL]

// Optional: allow multiple origins if needed (e.g., dev + prod)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, // if you're using cookies or auth headers
}

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