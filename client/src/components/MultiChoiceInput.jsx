import { useState } from "react"
import { MultiChoiceModal } from "./modals/MultiChoiceModal"

export function MultiChoiceInput(props) {
    const { suggestions, 
        setSuggestions, 
        isLoading, 
        setIsLoading,
        shoppingListOpen,
        savedMealsOpen } = props
    const [multiChoiceOpen, setMultiChoiceOpen] = useState(false)

    if(suggestions.length > 0 ||
        isLoading ||
        shoppingListOpen ||
        savedMealsOpen) return null
    
    return (
            <>
                <h3 className="text-3xl poppins-extrabold mt-3 text-white">or...</h3>
                <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mt-2">
                    <h4 className="p-3 text-white">Answer a few questions about what you're looking for!</h4>
                    <button className="ml-4 bg-white text-black px-2 mb-2 rounded-lg"
                    onClick={() => {
                        setMultiChoiceOpen(true)
                    }}>Begin</button>
                </div>
                <MultiChoiceModal multiChoiceOpen={multiChoiceOpen} 
                setMultiChoiceOpen={setMultiChoiceOpen}
                suggestions={suggestions}
                setSuggestions={setSuggestions}
                setIsLoading={setIsLoading}/>
            </>
    )
}