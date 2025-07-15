import { useState, useContext } from 'react'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { IngredientInput } from './components/IngredientInput'
import { MealResults } from './components/MealResults'
import { LoginRegister } from './components/LoginRegister'
import { MultiChoiceInput } from './components/MultiChoiceInput'
import { SavedMeals } from './components/SavedMeals'
import { ShoppingList } from './components/ShoppingList'
import { AuthContext, AuthProvider } from './components/context/AuthContext'
import { PromptInput } from './components/PromptInput'
import { Loading } from './components/Loading'

function App() {

const [ingredients, setIngredients] = useState([])
const [suggestions, setSuggestions] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [savedMealsOpen, setSavedMealsOpen] = useState(false)
const [shoppingListOpen, setShoppingListOpen] = useState(false)

const { authenticated } = useContext(AuthContext)

function handleAddIngredient(newIngredient) {
  let newIngredients = [...ingredients, newIngredient]
  setIngredients(newIngredients)
}

function handleDeleteIngredient(ingredientIndex) {
  let newIngredients = ingredients.filter((item, index) => index !== ingredientIndex)
  setIngredients(newIngredients)
}

  return (
    <>
      <Navbar setSuggestions={setSuggestions}/>
      <div className='mt-2 ml-4'>
          <Header />
          <IngredientInput 
            ingredients={ingredients} 
            setIngredients={setIngredients} 
            handleAddIngredient={handleAddIngredient} 
            handleDeleteIngredient={handleDeleteIngredient}
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            savedMealsOpen={savedMealsOpen}
            shoppingListOpen={shoppingListOpen}
            />
          {authenticated && <MultiChoiceInput 
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            savedMealsOpen={savedMealsOpen}
            shoppingListOpen={shoppingListOpen}/>}
          {authenticated && <PromptInput 
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            savedMealsOpen={savedMealsOpen}
            shoppingListOpen={shoppingListOpen}/>}
          <MealResults 
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            />
          {!authenticated && <LoginRegister 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            />}
          {isLoading && <Loading />}
          {savedMealsOpen && <SavedMeals />}
          {shoppingListOpen && <ShoppingList />}
      </div>
    </>
  )
}

export default function RootApp() {
  return(
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}
