import { motion } from "framer-motion"

export function Ingredientlist(props) {

    const { ingredients, isEditing, handleDeleteIngredient } = props

    return(
        <>
            <ul className="px-4 py-2 bg-[var(--secondary-color)] ml-4 w-4/5 rounded-md">
                {ingredients.map((ingredient, ingredientIndex) => {
                    return (
                        <li key={ingredientIndex} className="text-white">
                            <motion.button
                            initial = {{ scale: 0.5, opacity: 0 }}
                            animate = {{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15 }} 
                            onClick={() => {
                                if(!isEditing) { return }
                                handleDeleteIngredient(ingredientIndex)
                            }}>
                                {ingredient} {isEditing && (<motion.span 
                                initial = {{ scale: 0.5, opacity: 0 }}
                                animate = {{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                className="text-red-600 poppins-extrabold">X</motion.span>)}
                            </motion.button>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}