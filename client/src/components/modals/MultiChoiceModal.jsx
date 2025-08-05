import { useState, useEffect } from "react"
import ReactDom from "react-dom"
import { getMultiChoiceMealSuggestions } from "../../api/multiChoiceMealAPI"
import { motion, AnimatePresence } from "framer-motion"

export function MultiChoiceModal(props) {

    const { multiChoiceOpen, setMultiChoiceOpen, setSuggestions, setIsLoading } = props

    const questionGroups = [
        {
            id: "mealType",
            question: "What type of meal are you looking for?",
            options: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
            multiselect: false
        },
        {
            id: "flavorType",
            question: "Which flavor profile do you prefer?",
            options: ["Sweet", "Savory", "Spicy", "Tangy", "Umami", "Mild"],
            multiselect: false
        },
        {
            id: "dietPreference",
            question: "Do you follow a specific diet?",
            options: ["Vegetarian", "Vegan", "Pescatarian", "Keto/ Low Carb", "Gluten-Free", "Dairy-Free", "Halal", "Kosher", "None"],
            multiselect: true
        },
        {
            id: "proteinPreference",
            question: "What type of proteins do you prefer?",
            options: ["Chicken", "Beef", "Pork", "Fish", "Eggs", "Tofu", "Legumes", "Any"],
            multiselect: true
        },
        {
            id: 'cuisineType',
            question: "Which cuisines do you enjoy?",
            options: ["North American", "Mexican", "Italian", "European", "Indian", "Chinese", "Thai", "Japanese", "Korean", "African", "Any"],
            multiselect: true
        },
        {
            id: "allergiesOrAvoidances",
            question: "Are there any foods you'd like to avoid?",
            options: ["Nuts", "Dairy", "Gluten", "Shellfish", "Eggs", "Soy", "Redmeat", "None"],
            multiselect: true
        },
        {
            id: "timeAvailable",
            question: "How much time do you have to cook?",
            options: ["10 mins or less", "20-30 minutes", "30-45 minutes", "1 hour or more"],
            multiselect: false
        }
    ]

    const [step, setStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [tempSelection, setTempSelection] = useState([])
    const [clickedButtons, setClickedButtons] = useState([])
    const currentGroup = questionGroups[step]
    const isMulti = currentGroup.multiselect

    const handleGetMultiChoiceMeals = async (preferences) => {
        setIsLoading(true)
        setMultiChoiceOpen(false)
        try{
            const result = await getMultiChoiceMealSuggestions(preferences)
            setSuggestions(result)
        } catch (err) {
            alert('Failed to fetch meal suggestions', err);
        } finally{
            setIsLoading(false)
        }
    }

    function handleUpdateClickedButtons(option) {
        clickedButtons.includes(option) ?
        setClickedButtons(prev => prev.filter(o => o !== option)) :
        setClickedButtons(prev => [...prev, option])
    }

    function handleOptionClick(option) {
        if(isMulti){
            setTempSelection(prev => prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option])
            handleUpdateClickedButtons(option)
        } else {
            const updatedAnswers = {
                ...answers,
                [currentGroup.id]: option,
            }

            setAnswers(updatedAnswers)

            const isLastStep = step === questionGroups.length - 1
            if(isLastStep){
                handleGetMultiChoiceMeals(answers)
            } else {
                setStep(prev => prev + 1)
            }
        }
        
    }

    useEffect(() => {
        console.log("answers updated:", answers)
    }, [answers])

    if(!multiChoiceOpen) return null

    return ReactDom.createPortal(
            <div className="fixed inset-0 z-10">
                <button className='fixed inset-0 z-20 bg-black bg-opacity-50' onClick={() => {
                setMultiChoiceOpen(false)
                setAnswers({})
                setClickedButtons([])
                setTempSelection([])
                setStep(0)
                }}/>
                <AnimatePresence
                mode="wait">
                    <motion.div 
                    className="bg-[var(--secondary-color)] fixed inset-0 w-9/10 h-max mx-auto mt-24 z-50 rounded-md"
                    key={step} 
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    >
                        <h3 className="text-xl poppins-extrabold m-4 text-white">{currentGroup.question}</h3>
                        {isMulti && (<p className="text-base poppins-regular m-4 text-white">You can choose more than one</p>)}
                        <div className="grid grid-cols-3 mx-4 mb-2">
                            {currentGroup.options.map((option, index) => {
                                return(
                                    <motion.button key={index} 
                                    className={`m-2 ${clickedButtons.includes(option)? 'bg-blue-400 text-white' : 'bg-white text-black'} px-2 rounded-lg border-3 border-green-400`}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => {
                                        setTimeout(() => {
                                            handleOptionClick(option)
                                        }, 100)
                                    }}>
                                        {option}
                                    </motion.button>
                                )
                            })}
                        </div>
                        <div className="w-full flex justify-center">
                            {isMulti && <motion.button className="bg-white text-black px-2 rounded-lg mb-4 mx-auto"
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                setTimeout(() => {
                                    setAnswers(prev => ({
                                        ...prev,
                                        [currentGroup.id]: tempSelection
                                    }))
                                    setTempSelection([])
                                    setStep(prev => prev + 1)
                                    setClickedButtons([])
                                }, 100)
                            }}>Next</motion.button>}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>,
            document.getElementById('portal')
    )
}