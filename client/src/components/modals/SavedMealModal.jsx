import ReactDom from 'react-dom'

export function SavedMealModal(props) {
    const { selectedMeal, setSelectedMeal } = props
    
    return ReactDom.createPortal(
        <div className="fixed inset-0 z-10">
            <button className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => {
                setSelectedMeal(null)
            }}/>
            <div className="fixed inset-0 w-4/5 mx-auto mt-24 z-50 max-h-[60vh]">
                 <h3 className="text-xl poppins-extrabold bg-[var(--secondary-color)] rounded-lg p-2 text-white">{selectedMeal.title}</h3>
                    <div className="bg-[var(--mealcard-color-1)] my-2 rounded-lg">
                        <h4 className="p-2 text-red-700 text-md poppins-extrabold">Time Required</h4>
                        <p className="p-2 text-sm text-red-700 poppins-medium">{selectedMeal.time_required} minutes</p>
                    </div>
            
                    <div className="bg-[var(--mealcard-color-2)] my-2 rounded-lg">
                        <h4 className="p-2 text-md text-red-700 poppins-extrabold">Ingredients</h4>
                        <ul className="px-2 pb-4">
                            {selectedMeal.ingredients.map((ingredient, index) => {
                                return(
                                    <li key={index} className="text-sm text-red-700 poppins-medium">{ingredient}</li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className="bg-[var(--mealcard-color-3)] my-2 rounded-lg">
                        <h4 className="p-2 text-md text-red-700 poppins-extrabold">Directions</h4>
                        <ol className="list-decimal list-outside px-6">
                            {selectedMeal.instructions.map((step, index) => {
                                return(
                                    <li key={index} className="text-sm text-red-700 poppins-medium pl-2 py-2">{step}</li>
                                )
                            })}
                        </ol>
                    </div>
                    
            </div>
        </div>,
        document.getElementById('portal')
    )
}