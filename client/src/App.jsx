import { useState, useContext, useEffect } from 'react'
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
import { multiAddToShoppingList } from './api/multiAddToShoppingList'
import { multiDeleteFromShoppingList } from './api/multiDeleteFromShoppingList'
import { motion, AnimatePresence } from 'framer-motion'

function App() {

const [ingredients, setIngredients] = useState([])
const [suggestions, setSuggestions] = useState([])
const [isLoading, setIsLoading] = useState(false)
const [savedMeals, setSavedMeals] = useState([])
const [savedMealsOpen, setSavedMealsOpen] = useState(false)
const [selectedMeal, setSelectedMeal] = useState(null)
const [loggingIn, setLoggingIn] = useState(false)
const [shoppingListOpen, setShoppingListOpen] = useState(false)
const [shoppingListItems, setShoppingListItems] = useState([])
const [navModalOpen, setNavModalOpen] = useState(false)
const [localShoppingList, setLocalShoppingList] = useState([])


const { authenticated } = useContext(AuthContext)

function handleAddIngredient(newIngredient) {
  let newIngredients = [...ingredients, newIngredient]
  setIngredients(newIngredients)
}

function handleDeleteIngredient(ingredientIndex) {
  let newIngredients = ingredients.filter((item, index) => index !== ingredientIndex)
  setIngredients(newIngredients)
}

function handleUpdateSavedMeals(title) {
        const newSavedMeals = [...savedMeals, title]
        setSavedMeals(newSavedMeals)
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

async function handleMultiAddToList(items) {
  if(items.length === 0){ return }
  try{
    const result = await multiAddToShoppingList(items)
    console.log(result)
  } catch (err) {
    console.error('Error saving multiple items', err)
  }
}

async function handleMultiDeleteFromList(ids) {
  if(ids.length === 0){ return }
  try{
    const result = await multiDeleteFromShoppingList(ids)
    console.log(result)
  } catch (err){
    console.error('Error deleting multiple items', err)
  }
}

async function handleSaveMeal(meal) {
        console.log('Saving meal...')
        try{
            const result = await saveMeal(meal)
            console.log('SaveMeal response:', result);
        } catch (err) {
            console.error('Could not save meal', err)
        } finally {
            handleUpdateSavedMeals(meal.title)
        }
    }

async function handleGetShoppingList() {
  setSuggestions([])
  setNavModalOpen(false)
  try{
    const result = await getShoppingList()
    console.log(result)
    setShoppingListItems(result.items.map(item => item.item_name))
    setShoppingListOpen(true)
  } catch (err) {
    console.error('Error getting shopping list:', err)
  }
}

useEffect(() => {
  async function handleUpdateShoppingList() {
    if(selectedMeal !== null || localShoppingList.length === 0) return;
    function listsAreSame(arr1, arr2) {
      if(arr1.length !== arr2.length){
        return false
      }
      const sorted1 = [...arr1].sort()
      const sorted2 = [...arr2].sort()

      return sorted1.every((item, index) => item === sorted2[index])
    }
    const shoppingListArray = shoppingListItems.map(item => item.item_name)
    if(listsAreSame(localShoppingList, shoppingListArray)) {
      return
    }
    const itemsToRemove = shoppingListItems.filter(item => !localShoppingList.includes(item.ingredient)).map(item => item.ingredient_id)
    const itemsToSave = localShoppingList.filter(item => !shoppingListItems.some(obj => obj.ingredient === item))

    try {
      await handleMultiDeleteFromList(itemsToRemove)
      await handleMultiAddToList(itemsToSave)
      setShoppingListItems([])
      setLocalShoppingList([])
    } catch (err) {
      console.error("Failed to update shopping list", err);
    }
}
  handleUpdateShoppingList()
}, [selectedMeal, localShoppingList, shoppingListItems])

  return (
    <>
      <Navbar setSuggestions={setSuggestions} 
      setSavedMealsOpen={setSavedMealsOpen}
      setSelectedMeal={setSelectedMeal}
      loggingIn={loggingIn}
      setLoggingIn={setLoggingIn}
      handleGetShoppingList={handleGetShoppingList}
      navModalOpen={navModalOpen}
      setNavModalOpen={setNavModalOpen}
      setShoppingListOpen={setShoppingListOpen}
      />
      <AnimatePresence>
        {selectedMeal && (
          <MealModal selectedMeal={selectedMeal} 
          setSelectedMeal={setSelectedMeal}
          savedMeals={savedMeals}
          handleSaveMeal={handleSaveMeal}
          savedMealsOpen={savedMealsOpen}
          handleAddToList={handleAddToList}
          handleDeleteFromList={handleDeleteFromList}
          handleMultiAddToList={handleMultiAddToList}
          handleMultiDeleteFromList={handleMultiDeleteFromList}
          localShoppingList={localShoppingList}
          setLocalShoppingList={setLocalShoppingList}
          shoppingListItems={shoppingListItems}
          setShoppingListItems={setShoppingListItems}
          /> 
        )}
      </AnimatePresence>
      <div className='ml-4'>
          <Header selectedMeal={selectedMeal}/>
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
          <AnimatePresence>
            <MealResults 
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              selectedMeal={selectedMeal}
              setSelectedMeal={setSelectedMeal}
              savedMealsOpen={savedMealsOpen}
              setSavedMealsOpen={setSavedMealsOpen}
              shoppingListOpen={shoppingListOpen}
              />
            </AnimatePresence>
          {!authenticated && <LoginRegister 
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            loggingIn={loggingIn}
            setLoggingIn={setLoggingIn}
            />}
          {isLoading && <Loading />}
          <AnimatePresence>
          {shoppingListOpen && <ShoppingList shoppingListItems={shoppingListItems}
          handleGetShoppingList={handleGetShoppingList}
          handleAddToList={handleAddToList}
          handleMultiDeleteFromList={handleMultiDeleteFromList}
          handleMultiAddToList={handleMultiAddToList}
          />}
          </AnimatePresence>
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
