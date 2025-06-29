import { useState } from "react"

export function MealCard(props) {

    const { id, title, ingredients, time_required, instructions} = props.meal
    const { openMealId, setOpenMealId } = props
    const isOpen = openMealId === id

    return(
        <>
        <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white"
        onClick={() => {
            setOpenMealId(prev => (prev === id ? null : id))
        }}>{title}</button>

        {isOpen && (
        <div className="grid grid-cols-2 gap-2 w-[90vw] mx-auto z-50">
            <div className="bg-[var(--mealcard-color-1)] rounded-lg">
                <h4 className="p-2 text-red-700 text-md poppins-extrabold">Time Required</h4>
                <p className="p-2 text-sm text-red-700 poppins-medium">{time_required} minutes</p>
            </div>
        
            <div className="bg-[var(--mealcard-color-2)] rounded-lg">
                <h4 className="p-2 text-md text-red-700 poppins-extrabold">Ingredients</h4>
                <ul>
                    {ingredients.map((ingredient, index) => {
                        return(
                            <li key={index} className="text-sm text-red-700 poppins-medium pl-2">{ingredient}</li>
                        )
                    })}
                </ul>
            </div>

            <div className="col-span-2 bg-[var(--mealcard-color-3)] rounded-lg">
                <h4 className="p-2 text-md text-red-700 poppins-extrabold">Directions</h4>
                <p className="p-2 text-sm text-red-700 poppins-medium">{instructions}</p>
            </div>
        </div>
        )}
        
        </>
        
        
    )
}