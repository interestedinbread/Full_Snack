import { fakeMeals } from "./data/fakeData"
import { useState } from "react"

export function MealResults(props) {

    const { MealCard } = props
    const [openMealId, setOpenMealId] = useState(null)

    return(
        <>
            <h3 className="text-2xl poppins-extrabold my-3">How about making...</h3>
            <div className="flex flex-col">
                {fakeMeals.map(meal => {
                    return(
                        <MealCard key={meal.id} 
                        {...meal}
                        openMealId={openMealId}
                        setOpenMealId={setOpenMealId}
                        />
                    )
                })}
            </div>
        </>
    )
}