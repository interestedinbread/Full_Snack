export function SavedMeals(props) {
    const { savedMeals } = props
    
    return (
        <>
            <h3 className="text-2xl text-white poppins-extrabold my-3">Here are your saved meals!</h3>
            <div className="flex flex-col">
                {savedMeals.meals.map((meal,index) => {
                    return(
                        <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white w-max max-w-[350px] truncate overflow-hidden whitespace-nowrap" 
                        key={index}>{meal.title}</button>
                    )
                })}
            </div>
            <SavedMealModal savedMeals={savedMeals}/>
        
        
        </>
    )
}