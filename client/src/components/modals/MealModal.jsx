import ReactDom from 'react-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext, useState } from 'react'
import { useEffect } from 'react'
import { getShoppingList } from '../../api/getShoppingList'
import { motion, AnimatePresence, useAnimation } from "framer-motion"

export function MealModal(props) {
    
    const { selectedMeal, 
        setSelectedMeal, 
        savedMeals, 
        handleSaveMeal, 
        savedMealsOpen, 
        localShoppingList,
        setLocalShoppingList,
        setShoppingListItems,
         } = props

    const { authenticated } = useContext(AuthContext)
    const [showIngredients, setShowIngredients] = useState(true)
    const [showDirections, setShowDirections] = useState(true)

    useEffect(() => {
        console.log('Loading shopping list for modal')
        const loadShoppingList = async () => {
            try {
                const result = await getShoppingList()
                console.log('Shopping list contents:', result)
                const itemObjects = result.items.map(item => ({
                    ingredient: item.item_name,
                    ingredient_id: item.id
                }))
                const itemNames = result.items.map(item => item.item_name)
                setShoppingListItems(itemObjects)
                setLocalShoppingList(itemNames)
            } catch (err) {
                console.error('Error loading shopping list:', err)
            }
        }

        loadShoppingList()
    }, [])

    const controls = useAnimation()

    return ReactDom.createPortal(
        <div className='fixed inset-0 bg-black bg-opacity-50 z-40 top-10 flex justify-center p-4 h-fit'>
            <button className="fixed inset-0 z-20" onClick={() => {
                setSelectedMeal(null)
            }}/>
            <motion.div
            className='relative w-7/8 max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-xl z-50'
            key="meal-modal"
            initial={{ x: '-100%', y: 0, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={{ x: '-100%', y: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <h3 className="text-xl poppins-extrabold bg-[var(--secondary-color)] rounded-lg p-2 text-white">{selectedMeal.title}</h3>
                    <div className="bg-[var(--mealcard-color-1)] my-2 rounded-lg relative">
                        <h4 className="p-2 pl-4 text-red-700 text-lg poppins-extrabold">Time Required</h4>
                        <p className="p-2 pl-4 text-sm text-red-700 poppins-medium">{selectedMeal.time_required} minutes</p>
                        <img src="/img/noun-clock-7574786-E63946.png" className='absolute top-2 right-4 h-[50px] w-[50px]'></img>
                    </div>
            
                    <div className="bg-[var(--mealcard-color-2)] my-2 rounded-lg relative">
                        <div className='flex justify-between'>
                            <button onClick={() => {
                                setShowIngredients(prev => !prev)
                            }}>
                                <h4 className="p-2 text-lg text-red-700 poppins-extrabold">Ingredients</h4>
                            </button>
                            {showIngredients && <motion.button 
                            onClick={async () => {
                                controls.start({ scale: [1, 0.9, 1], transition: { duration: 0.3, ease: 'easeOut' } })
                                
                                const ingredients = selectedMeal.ingredients
                                const allOnList = ingredients.every(ingredient => 
                                    localShoppingList.some(item => item === ingredient))
                                    if(allOnList){
                                        const newLocalShoppingList = localShoppingList.filter(item => !ingredients.includes(item))
                                        setLocalShoppingList(newLocalShoppingList)
                                        } else {
                                        const newItems = ingredients.filter(ingredient => !localShoppingList.some(item => item === ingredient))  
                                        setLocalShoppingList([...localShoppingList, ...newItems])
                                        }
                                        
                                    }}
                                    animate={controls}>
                            <img 
                                alt="grocery-bag-image" 
                                src="/img/noun-275627-E63946.png" 
                                className='h-[50px] w-[50px] mt-2 mr-4'
                                />
                            </motion.button>}
                        </div>
                       {showIngredients && <ul className="px-2 pb-4">
                            {selectedMeal.ingredients.map((ingredient, index) => {
                                const isOnList = localShoppingList.includes(ingredient)
                                return(
                                    <div key={index} className='flex items-center gap-2'>
                                        <li  className="text-base text-red-700 poppins-medium max-w-[120px] mb-2">
                                            <button onClick={() => {
                                                if(isOnList){
                                                    const newLocalShoppingList = localShoppingList.filter(item => item !== ingredient)
                                                    setLocalShoppingList(newLocalShoppingList)
                                                } else {
                                                    const newLocalShoppingList = [...localShoppingList, ingredient]
                                                    setLocalShoppingList(newLocalShoppingList)
                                                }
                                                
                                            }}
                                            className='text-left'>{ingredient}</button>
                                            </li>
                                        {(isOnList && authenticated) && <motion.i 
                                        className="fa-solid fa-square-check text-base text-green-600 mb-2"
                                        initial = {{ scale: 0.5, opacity: 0 }}
                                        animate = {{ scale: 1, opacity: 1 }}
                                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                        />}
                                    </div>
                                )
                            })}
                        </ul>}
                        <AnimatePresence>
                            {(selectedMeal.ingredients.some(ingredient => 
                                localShoppingList.some(item => item === ingredient)) &&
                                authenticated &&
                                showIngredients) && 
                                <motion.p 
                                className='text-[var(--secondary-color)] text-sm italic absolute bottom-6 right-2 w-[150px]'
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ type: "tween", duration: 0.2 }}
                                >
                                Checked items are in your shopping list
                                </motion.p>
                                }
                        </AnimatePresence>
                    </div>

                    {(authenticated && showIngredients) && <p className='text-white italic text-sm'>Tap ingredient or bag icon to save items.</p>}

                    <div className="bg-[var(--mealcard-color-3)] my-2 rounded-lg relative">
                        <button onClick={() => {
                            setShowDirections(prev => !prev)
                        }}>
                            <h4 className="p-2 text-lg text-red-700 poppins-extrabold">Directions</h4>
                        </button>
                        {showDirections && <img src="/img/noun-checklist-445258-E63946.png" className='absolute top-2 right-4 h-[50px] w-[50px]'></img>}
                        {showDirections && <ol className="list-decimal list-outside px-6 mt-2">
                            {selectedMeal.instructions.map((step, index) => {
                                return(
                                    <li key={index} className="text-sm text-red-700 poppins-medium pl-2 py-2">{step}</li>
                                )
                            })}
                        </ol>}
                    </div>
                    {(authenticated && !savedMealsOpen) && <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white mb-20" onClick={() => {
                        if(savedMeals.includes(selectedMeal.title)){
                            return
                        }
                        handleSaveMeal(selectedMeal) 
                    }}>{savedMeals.includes(selectedMeal.title) ? 'Saved' : 'Save'}</button>}
                   
                
            </motion.div>
        </div>,
            document.getElementById('portal')
        
    )
}