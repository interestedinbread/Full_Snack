import ReactDom from 'react-dom'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { getShoppingList } from '../../api/getShoppingList'
import { useState } from 'react'

export function MealModal(props) {
    
    const { selectedMeal, 
        setSelectedMeal, 
        savedMeals, 
        handleSaveMeal, 
        savedMealsOpen, 
        handleAddToList,
        suggestions } = props

    const { authenticated } = useContext(AuthContext)
    const [ shoppingList, setShoppingList ] = useState([])
    const [refetchTrigger, setRefetchTrigger] = useState(0)

    useEffect(() => {
        console.log('Checking shopping list')
        const loadShoppingList = async () => {
            try {
                const result = await getShoppingList()
                console.log('Shopping list contents', result)
                const handleSetShoppingList = () => {
                    const list = []
                    result.items.forEach(item => {
                        list.push({
                            ingredient_id: item.id,
                            ingredient: item.item_name
                        })
                    })
                    setShoppingList(list)
                }
                handleSetShoppingList(result)
            } catch (err) {
                console.error('Error checking shopping list:', err)
            }
        }
        
        loadShoppingList()

    }, [refetchTrigger])

    return ReactDom.createPortal(
        <div className="fixed inset-0 z-10">
            <button className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => {
                setSelectedMeal(null)
            }}/>
            <div className="fixed inset-0 w-4/5 mx-auto mt-24 z-50 h-max">
                 <h3 className="text-xl poppins-extrabold bg-[var(--secondary-color)] rounded-lg p-2 text-white">{selectedMeal.title}</h3>
                    <div className="bg-[var(--mealcard-color-1)] my-2 rounded-lg relative">
                        <h4 className="p-2 pl-4 text-red-700 text-lg poppins-extrabold">Time Required</h4>
                        <p className="p-2 pl-4 text-sm text-red-700 poppins-medium">{selectedMeal.time_required} minutes</p>
                        <img src="/img/noun-clock-7574786-E63946.png" className='absolute top-2 right-4 h-[50px] w-[50px]'></img>
                    </div>
            
                    <div className="bg-[var(--mealcard-color-2)] my-2 rounded-lg relative">
                        <h4 className="p-2 text-lg text-red-700 poppins-extrabold">Ingredients</h4>
                        <img src="/img/noun-275627-E63946.png" className='absolute top-2 right-4 h-[50px] w-[50px]'></img>
                        <ul className="px-2 pb-4">
                            {selectedMeal.ingredients.map((ingredient, index) => {
                                const matchedItem = shoppingList.some(item => item.ingredient === ingredient)
                                const isOnList = Boolean(matchedItem)
                                return(
                                    <div key={index} className='flex items-center gap-2'>
                                        <li  className="text-sm text-red-700 poppins-medium">
                                            <button onClick={() => {
                                                if(isOnList){
                                                    // set up delete functionality then do this part
                                                } else {
                                                    handleAddToList(ingredient)
                                                }
                                                
                                                setRefetchTrigger(prev => prev + 1)
                                            }}>{ingredient}</button>
                                            </li>
                                        {isOnList && <i className="fa-solid fa-square-check text-base text-green-600"></i>}
                                    </div>
                                )
                            })}
                        </ul>
                        <p className='text-[var(--secondary-color)] text-sm italic absolute bottom-4 right-2 w-[150px]'>Checked items are in your shopping list</p>
                    </div>

                    <p className='text-white italic text-sm'>Tap ingredients or bag icon to manage shopping list. 
                        View full shopping list in the menu above.</p>

                    <div className="bg-[var(--mealcard-color-3)] my-2 rounded-lg relative">
                        <h4 className="p-2 text-lg text-red-700 poppins-extrabold">Directions</h4>
                        <img src="/img/noun-checklist-445258-E63946.png" className='absolute top-2 right-4 h-[50px] w-[50px]'></img>
                        <ol className="list-decimal list-outside px-6 mt-2">
                            {selectedMeal.instructions.map((step, index) => {
                                return(
                                    <li key={index} className="text-sm text-red-700 poppins-medium pl-2 py-2">{step}</li>
                                )
                            })}
                        </ol>
                    </div>
                    {(authenticated && !savedMealsOpen) && <button className="p-2 text-md poppins-extrabold bg-[var(--secondary-color)] rounded-lg m-2 text-white" onClick={() => {
                        if(savedMeals.includes(selectedMeal.title)){
                            return
                        }
                        handleSaveMeal(selectedMeal) 
                    }}>{savedMeals.includes(selectedMeal.title) ? 'Saved' : 'Save'}</button>}
            </div>
        </div>,
        document.getElementById('portal')
    )
}