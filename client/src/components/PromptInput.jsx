import { useState } from "react";
import { getPromptGenerateMeals } from "../api/promptMealAPI";
import { motion } from "framer-motion";

export function PromptInput(props) {

    const { suggestions, 
        setSuggestions, 
        isLoading, 
        setIsLoading,
        savedMealsOpen,
        shoppingListOpen } = props

    const [prompt, setPrompt] = useState('')

    const handleGetPromptMeals = async () => {
        if (!prompt || prompt.trim().length === 0 || isLoading) return;
        setIsLoading(true)
        try {
            const result = await getPromptGenerateMeals(prompt)
            setSuggestions(result)
        } catch (err) {
            console.error("Failed to fetch meals:", err)
        } finally {
            setIsLoading(false)
            setPrompt('')
        }
    }

    if(suggestions.length > 0 || 
        isLoading ||
        shoppingListOpen ||
        savedMealsOpen
    ) return null

    return (
        <>
        

            <h3 className="text-3xl poppins-extrabold mt-3 text-white">or...</h3>
            <div className="bg-[var(--secondary-color)] w-9/10 md:w-2/5 rounded-lg mt-2 flex flex-col">
                <h4 className="p-3 text-white md:text-lg">Tell us about a meal idea you have. It could be as vague or specific as you like!</h4>
                <textarea placeholder="I'm thinking about something spicy and..."
                className="mx-auto mb-3 p-2 bg-black border-2 border-slate-400 text-white text-sm md:text-lg rounded-lg w-9/10 resize-none overflow-hidden"
                rows={3}
                onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px'
                }}
                onChange={(e) => {
                    setPrompt(e.target.value)
                }}
                ></textarea>
                <motion.button className="ml-4 w-max bg-white text-black px-2 mb-2 rounded-lg border-3 border-green-400"
                whileTap={{ scale: 0.85 }}
                onClick={() => {
                    setTimeout(() => {
                        handleGetPromptMeals()
                    }, 100)
                }}>Submit</motion.button>
            </div>
        
        </>
    )
}