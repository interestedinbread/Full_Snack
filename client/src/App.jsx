import { useState, useContext } from 'react'
import { Header } from './components/Header'
import { Navbar } from './components/Navbar'
import { IngredientInput } from './components/IngredientInput'
import { MealResults } from './components/MealResults'
import { LoginRegister } from './components/LoginRegister'
import { MultiChoiceInput } from './components/MultiChoiceInput'
import { AuthContext, AuthProvider } from './components/context/AuthContext'
import { PromptInput } from './components/PromptInput'
import { Loading } from './components/Loading'

function App() {

const [ingredients, setIngredients] = useState([])
const [suggestions, setSuggestions] = useState([])
const [isLoading, setIsLoading] = useState(false)

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
      <Navbar />
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
            />
          {authenticated && <MultiChoiceInput 
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}/>}
          {authenticated && <PromptInput 
            suggestions={suggestions}
            setSuggestions={setSuggestions}
            isLoading={isLoading}
            setIsLoading={setIsLoading}/>}
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
