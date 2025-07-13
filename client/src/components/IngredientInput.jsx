import { useContext, useState } from "react";
import { Ingredientlist } from "./IngredientList";
import { getMealSuggestions } from "../api/mealAPI";
import { AuthContext } from "./context/AuthContext";

export function IngredientInput(props) {

    const { ingredients, setIngredients, handleAddIngredient, handleDeleteIngredient, suggestions, setSuggestions, isLoading, setIsLoading } = props
    const [inputValue, setInputValue] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    
    const { authenticated } = useContext(AuthContext)

    const handleGetMeals = async () => {
        if (!ingredients || ingredients.length === 0) return;
        try {
            const result = await getMealSuggestions(ingredients)
            setSuggestions(result)
        } catch (err){
            alert('Failed to fetch meal suggestions');
        }
    }

    if(suggestions.length > 0 || isLoading) return null

    return (
        <>
            <h2 className="text-3xl poppins-extrabold my-3 text-white">
                { authenticated ? "When you're ready..." : 'Try our meal generator'}
                </h2>
            <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg">
                <h4 className="p-3 text-white">Enter some ingredients you might want to use</h4>
                <input className="ml-3 mb-3 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                placeholder="eggs, cumin, beef..." 
                value={inputValue}
                onChange={(e) => {
                    setInputValue(e.target.value)
                }}
                onKeyDown={(e) => {
                    if(e.key === "Enter" && inputValue){
                        handleAddIngredient(inputValue)
                        setInputValue('')
                        setIsEditing(false)
                    }
                }}></input>
                <button className="ml-4 bg-white text-black px-2 rounded-lg"
                onClick={() => {
                    if(!inputValue) { return }
                    handleAddIngredient(inputValue)
                    setInputValue('')
                    setIsEditing(false)
                }}
                >Add</button>
                <button className="ml-4 bg-white text-black px-2 rounded-lg"
                onClick={() => {
                    setIsEditing(prev => !prev)
                }}>
                    {isEditing && ingredients.length > 0 ? "Done" : "Edit"}
                </button>
                {ingredients.length > 0 && (
                    <>
                    <div>
                    <Ingredientlist ingredients={ingredients} isEditing={isEditing} handleDeleteIngredient={handleDeleteIngredient}/>
                    </div>
                    <button className="ml-4 mt-2 mb-2 bg-white text-black px-2 rounded-lg"
                    onClick={async () => {
                        if(isLoading) { return }
                        setIsLoading(true)
                        try {
                            await handleGetMeals(ingredients)
                        } finally {
                            setIsLoading(false)
                            setIngredients([])
                        }
                    }}
                    >Generate</button>
                </>
                )}
            </div>
        </>
    )
}