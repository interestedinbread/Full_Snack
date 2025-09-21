import { motion } from 'framer-motion'

export function MealResults(props) {

    const { suggestions, 
        setSuggestions,  
        setSelectedMeal, 
        savedMealsOpen, 
        setSavedMealsOpen,
        selectedMeal 
        } = props
    

    if(!suggestions || suggestions.length === 0 || selectedMeal){
        return null
    }

    return(
        <div>
            <h3 className="text-2xl text-white poppins-extrabold my-3">{savedMealsOpen ? "Here are your saved meals!" : "How about making..."}</h3>
            <motion.div
            key="meal-results"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}>
                    <div className="flex flex-col">
                        {suggestions.map((meal, index) => {
                            return(
                                <button className="p-2 text-md md:text-lg poppins-extrabold bg-green-600 rounded-lg m-2 text-white w-max max-w-[350px] truncate overflow-hidden whitespace-nowrap" 
                                key={index} 
                                onClick={() => {
                                    setSelectedMeal(suggestions[index])
                                }}>{meal.title}</button>
                            )
                        })}
                    </div>
                    <motion.button className="ml-4 w-max bg-white text-black px-2 mb-2 rounded-lg border-3 border-green-400"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                        setTimeout(() => {
                            setSuggestions([])
                            setSavedMealsOpen(false)
                        }, 100)
                    }}
                    >{savedMealsOpen? "return" : "reset"}</motion.button>
            </motion.div>
            </div>
    )
}