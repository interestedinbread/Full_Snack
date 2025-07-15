import { useContext, useState } from "react"
import { MealModal } from "./modals/MealModal"
import { AuthContext } from "./context/AuthContext"
import { saveMeal } from "../api/saveMeal"

export function MealResults(props) {

    const { suggestions, setSuggestions } = props
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [savedMeals, setSavedMeals] = useState([])
    const { authenticated } = useContext(AuthContext)

    const handleSaveMeal = async (meal) => {
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

    const handleUpdateSavedMeals = (title) => {
        const newSavedMeals = [...savedMeals, title]
        setSavedMeals(newSavedMeals)
    }

    if(!Array.isArray(suggestions) || suggestions.length === 0){
        return null
    }

    return(
        <>
            <h3 className="text-2xl text-white poppins-extrabold my-3">How about making...</h3>
            <div className="flex flex-col">
                {suggestions.map((meal, index) => {
                    return(
                        <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white w-max" key={index} onClick={() => {
                            setSelectedMeal(suggestions[index])
                        }}>{meal.title}</button>
                    )
                })}
            </div>
            <button className="ml-4 w-max bg-white text-black px-2 mb-2 rounded-lg"
            onClick={() => {
                setSuggestions([])
            }}
            >Reset</button>
            {selectedMeal && (
                <MealModal setSelectedMeal={setSelectedMeal} >
                    <h3 className="text-xl poppins-extrabold bg-[var(--secondary-color)] rounded-lg p-2 text-white">{selectedMeal.title}</h3>
                    <div className="bg-[var(--mealcard-color-1)] my-2 rounded-lg">
                        <h4 className="p-2 text-red-700 text-md poppins-extrabold">Time Required</h4>
                        <p className="p-2 text-sm text-red-700 poppins-medium">{selectedMeal.time_required} minutes</p>
                    </div>
            
                    <div className="bg-[var(--mealcard-color-2)] my-2 rounded-lg">
                        <h4 className="p-2 text-md text-red-700 poppins-extrabold">Ingredients</h4>
                        <ul className="px-2 pb-4">
                            {selectedMeal.ingredients.map((ingredient, index) => {
                                return(
                                    <li key={index} className="text-sm text-red-700 poppins-medium">{ingredient}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="bg-[var(--mealcard-color-3)] my-2 rounded-lg">
                        <h4 className="p-2 text-md text-red-700 poppins-extrabold">Directions</h4>
                        <ol className="list-decimal list-outside px-6">
                            {selectedMeal.instructions.map((step, index) => {
                                return(
                                    <li key={index} className="text-sm text-red-700 poppins-medium pl-2 py-2">{step}</li>
                                )
                            })}
                        </ol>
                    </div>
                    {authenticated && <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white" onClick={() => {
                        if(savedMeals.includes(selectedMeal.title)){
                            return
                        }
                        handleSaveMeal(selectedMeal) 
                    }}>{savedMeals.includes(selectedMeal.title) ? 'Saved' : 'Save'}</button>}
                </MealModal>
            )}
            
        </>
    )
}