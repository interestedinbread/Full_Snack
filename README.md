# Full Snack 🥕

**Never run out of meal ideas!**

A full-stack web application that uses AI to help you discover, plan, and manage your meals. Generate personalized meal suggestions, save your favorites, and create organized shopping lists - all in one place.

![Full Snack Logo](./client/public/img/Carrot_icon.png)

## ✨ Features

### 🤖 AI-Powered Meal Generation
- **Ingredient-Based Suggestions**: Input ingredients you want to use to get creative meal ideas
- **Multi-Choice Questionnaire**: Answer questions about preferences, dietary restrictions, and cuisine types
- **Free-Form Prompts**: Describe your meal ideas in natural language (e.g., "something spicy and Asian-inspired")

### 💾 Meal Management
- Save generated meals to your personal collection
- View detailed recipes with ingredients and step-by-step instructions
- Access your saved meals anytime from your account

### 🛒 Smart Shopping Lists
- Automatically generate shopping lists from meal ingredients
- Add/remove items with intuitive controls
- Sync your lists across sessions

### 🔐 User Experience
- Secure user authentication with JWT
- Responsive design that works on all devices
- Smooth animations and modern UI with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **Tailwind CSS** for responsive styling
- **Framer Motion** for smooth animations
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **PostgreSQL** database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **OpenAI API** for AI meal generation

### Deployment
- **Render** for hosting both frontend and backend

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL database
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/interestedinbread/Full_Snack.git
   cd Full_Snack
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd client
   npm install
   
   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `/server` directory:
   ```env
   # Database Configuration
   DATABASE_URL=postgresql://username:password@localhost:5432/full_snack_db
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_here
   
   # OpenAI Configuration
   OPENAI_API_KEY=your_openai_api_key_here
   
   # CORS Configuration
   FRONTEND_URL=http://127.0.0.1:5173
   
   # Server Configuration
   NODE_ENV=development
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   # Connect to your PostgreSQL database and run:
   psql -d your_database_name -f setup-database.sql
   ```

5. **Start the application**
   ```bash
   # Terminal 1 - Start the backend server
   cd server
   npm start
   
   # Terminal 2 - Start the frontend development server
   cd client
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173` to see the application running.

## 📱 How to Use

### For New Users
1. **Register** for a new account or **login** if you already have one. You can register with a fake email.
2. **Choose your input method**:
   - Add ingredients you have on hand or would like to use.
   - Answer the multi-choice questionnaire about your preferences
   - Write a free-form description of what you're craving
3. **Browse AI-generated meal suggestions**
4. **Save meals** you like to your collection
5. **Add ingredients** to your shopping list

### For Returning Users
- Access your **saved meals** from the navigation menu
- View and manage your **shopping list**
- Generate new meal ideas anytime

## 🏗️ Project Structure

```
Full_Snack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── api/           # API service functions
│   │   ├── components/    # React components
│   │   │   ├── modals/    # Modal components
│   │   │   └── context/   # React context providers
│   │   └── assets/        # Static assets
│   └── public/            # Public assets
├── server/                # Express backend
│   ├── controllers/       # Route controllers
│   ├── routes/           # API routes
│   ├── middleWare/       # Custom middleware
│   ├── config/           # Database configuration
│   └── utils/            # Utility functions
└── setup-database.sql    # Database schema
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Meals
- `POST /api/meals/generate` - Generate meal suggestions
- `POST /api/meals/save` - Save a meal
- `GET /api/meals/saved` - Get user's saved meals
- `DELETE /api/meals/saved/:id` - Delete saved meal

### Shopping List
- `GET /api/list` - Get user's shopping list
- `POST /api/list` - Add item to shopping list
- `DELETE /api/list/:id` - Remove item from shopping list

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenAI for providing the AI capabilities
- The React and Node.js communities for excellent documentation
- All contributors who help improve this project

## 📞 Support

If you encounter any issues or have questions, please:
- Check the [Issues](https://github.com/interestedinbread/Full_Snack/issues) page
- Create a new issue with detailed information about your problem
- Contact the maintainers

---

**Happy cooking! 🍳**
