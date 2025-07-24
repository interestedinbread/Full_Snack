export function MealResults(props) {

    const { suggestions, 
        setSuggestions,  
        setSelectedMeal, 
        savedMealsOpen, 
        setSavedMealsOpen, 
         } = props
    

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
        </>
    )
}