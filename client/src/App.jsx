import { useState } from 'react'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { IngredientInput } from './components/IngredientInput'
import { MealResults } from './components/MealResults'
import { MealCard } from './components/MealCard'

function App() {

const [ingredients, setIngredients] = useState([])
const [suggestions, setSuggestions] = useState([])

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
      <Navbar />
      <div className='mt-8'>
        <Header />
        <IngredientInput 
          ingredients={ingredients} 
          setIngredients={setIngredients} 
          handleAddIngredient={handleAddIngredient} 
          handleDeleteIngredient={handleDeleteIngredient}
          suggestions={suggestions}
          setSuggestions={setSuggestions}
        />
        <MealResults 
          MealCard={MealCard}
          suggestions={suggestions}
        />
      </div>
    </>
  )
}

export default App
