import { useState, useContext } from 'react'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { IngredientInput } from './components/IngredientInput'
import { MealResults } from './components/MealResults'
import { LoginRegister } from './components/LoginRegister'
import { MultiChoiceInput } from './components/MultiChoiceInput'
import { ShoppingList } from './components/ShoppingList'
import { AuthContext, AuthProvider } from './components/context/AuthContext'
import { PromptInput } from './components/PromptInput'
import { Loading } from './components/Loading'
import { MealModal } from './components/modals/MealModal'
import { addToShoppingList } from './api/addToShoppingList'
import { getShoppingList } from './api/getShoppingList'
import { deleteFromShoppingList } from './api/deleteFromShoppingList'

function App() {

const [ingredients, setIngredients] = useState([])
const [suggestions, setSuggestions] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [savedMealsOpen, setSavedMealsOpen] = useState(false)
const [selectedMeal, setSelectedMeal] = useState(null)
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

async function handleAddToList(itemData) {
  try{
    const result = await addToShoppingList(itemData)
    console.log(result)
  } catch (err) {
    console.error('Error saving item:', err)
  }
}

async function handleDeleteFromList(itemId) {
  try{
    const result = await deleteFromShoppingList(itemId)
    console.log(result)
  } catch (err) {
    console.error('Error deleting item:', err)
  }
}

async function handleGetShoppingList(userId) {
  try{
    const result = await getShoppingList(userId)
    console.log(result)
  } catch (err) {
    console.error('Error getting shopping list:', err)
  }
}

  return (
    <>
      <Navbar setSuggestions={setSuggestions} 
      setSavedMealsOpen={setSavedMealsOpen}
      setSelectedMeal={setSelectedMeal}
      />
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
            MealModal={MealModal}
            selectedMeal={selectedMeal}
            setSelectedMeal={setSelectedMeal}
            savedMealsOpen={savedMealsOpen}
            setSavedMealsOpen={setSavedMealsOpen}
            handleAddToList={handleAddToList}
            handleDeleteFromList={handleDeleteFromList}
            />
          {!authenticated && <LoginRegister 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            />}
          {isLoading && <Loading />}
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
