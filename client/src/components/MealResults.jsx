import { useState } from "react"
import { saveMeal } from "../api/saveMeal"

export function MealResults(props) {

    const { suggestions, 
        setSuggestions, 
        MealModal, 
        selectedMeal, 
        setSelectedMeal, 
        savedMealsOpen, 
        setSavedMealsOpen, 
        handleAddToList,
        handleDeleteFromList } = props
    
    const [savedMeals, setSavedMeals] = useState([])

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

    if(!suggestions || suggestions.length === 0){
        return null
    }

    return(
        <>
            <h3 className="text-2xl text-white poppins-extrabold my-3">{savedMealsOpen ? "Here are your saved meals!" : "How about making..."}</h3>
            <div className="flex flex-col">
                {suggestions.map((meal, index) => {
                    return(
                        <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white w-max max-w-[350px] truncate overflow-hidden whitespace-nowrap" key={index} onClick={() => {
                            setSelectedMeal(suggestions[index])
                        }}>{meal.title}</button>
                    )
                })}
            </div>
            <button className="ml-4 w-max bg-white text-black px-2 mb-2 rounded-lg"
            onClick={() => {
                setSuggestions([])
                setSavedMealsOpen(false)
            }}
            >{savedMealsOpen? "return" : "reset"}</button>
            {selectedMeal && (
                <MealModal selectedMeal={selectedMeal} 
                setSelectedMeal={setSelectedMeal}
                savedMeals={savedMeals}
                handleSaveMeal={handleSaveMeal}
                savedMealsOpen={savedMealsOpen}
                handleAddToList={handleAddToList}
                handleDeleteFromList={handleDeleteFromList}
                 />
            )}
            
        </>
    )
}