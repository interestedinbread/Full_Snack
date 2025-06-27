import { useState } from "react"

export function MealCard(props) {

    const { id, title, ingredients, time_required, directions, openMealId, setOpenMealId } = props
    const isOpen = openMealId === id

    return(
        <>
        <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white"
        onClick={() => {
            setOpenMealId(prev => (prev === id ? null : id))
        }}>{title}</button>

        {isOpen && (
            <div className="grid grid-cols-2 gap-2 mr-4">
            <div className="bg-[var(--mealcard-color-1)] rounded-lg">
                <h4 className="p-2 text-red-700 text-md underline poppins-medium">Time Required</h4>
                <p className="p-2 text-sm text-red-700 poppins-medium">{time_required} minutes</p>
            </div>
        
            <div className="bg-[var(--mealcard-color-2)] rounded-lg">
                <h4 className="p-2 text-md text-red-700 underline poppins-medium">Ingredients</h4>
                <p className="p-2 text-sm text-red-700 poppins-medium">{ingredients}</p>
            </div>

            <div className="col-span-2 bg-[var(--mealcard-color-3)] rounded-lg">
                <h4 className="p-2 text-md text-red-700 underline poppins-medium">Directions</h4>
                <p className="p-2 text-sm text-red-700 poppins-medium">{directions}</p>
            </div>
        </div>
        )}
        
        </>
        
        
    )
}