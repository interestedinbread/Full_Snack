export function Ingredientlist(props) {

    const { ingredients, isEditing, handleDeleteIngredient } = props

    return(
        <>
            <ul className="px-4 py-2 bg-[var(--secondary-color)] ml-4 w-4/5 rounded-md">
                {ingredients.map((ingredient, ingredientIndex) => {
                    return (
                        <li key={ingredientIndex} className="text-white">
                            <button 
                            onClick={() => {
                                if(!isEditing) { return }
                                handleDeleteIngredient(ingredientIndex)
                            }}>
                                {ingredient} {isEditing && (<span className="text-red-600 poppins-extrabold">X</span>)}
                            </button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}