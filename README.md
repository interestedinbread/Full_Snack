Full Snack 🥕 - Never run out of meal ideas!

A full stack application that uses AI to help you plan your next meal. Users can generate meal ideas, save and retrieve meals, and manage their grocery list.
Built with Vite, React, Tailwind, Node, Express, and Postgres

Features 💻

- 🧠 get AI generated meal suggestions using 3 different input methods
- 💾 save generated meals to use later
- 🛒 create and manage a shopping list of ingredients
- 🔒 user authentication with JWT
- 💻 responsive web design
- 🛠️ built using modern full-stack tools

## Tech Stack ⌨️

Front End
-React (Vite)
-Tailwind CSS

Back End
-Node.js
-Express
-PostgreSQL
-JWT Authentication

**Deployment**
-Render (both front end and back end)

## 🧑‍💻 Getting Started (Local Setup)

bash

# 1. Clone the repository
git clone https://github.com/interestedinbread/Full_Snack.git
cd full_snack

# 2. Install dependencies
cd client     # for frontend
npm install

cd ../server  # for backend
npm install

# 3. Set up environment variables
# Create a `.env` file in /server with:
# DATABASE_URL=your_postgres_url
# JWT_SECRET=your_jwt_secret

# 4. Start the app
# In one terminal tab:
cd server
node index.js

# In another:
cd client
npm run dev
