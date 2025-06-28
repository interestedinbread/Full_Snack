import { fakeMeals } from "./data/fakeData"
import { useState } from "react"

export function MealResults(props) {

    const { MealCard, suggestions } = props
    const [openMealId, setOpenMealId] = useState(null)

    if(!Array.isArray(suggestions) || suggestions.length === 0){
        return null
    }

    return(
        <>
            <h3 className="text-2xl poppins-extrabold my-3">How about making...</h3>
            <div className="flex flex-col">
                {suggestions.map(meal => {
                    return(
                        <MealCard key={meal.id} 
                        meal={meal}
                        openMealId={openMealId}
                        setOpenMealId={setOpenMealId}
                        />
                    )
                })}
            </div>
        </>
    )
}