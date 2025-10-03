const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

const allowedOrigins = [
    'http://127.0.0.1:5173', 
    'http://127.0.0.1:5174',
    'http://localhost:5173',
    'http://localhost:5174',
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    process.env.FRONTEND_URL
]

// New CORS code block
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true, 
}
// new CORS block ends

app.use(cors(corsOptions))
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