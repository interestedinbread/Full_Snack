

export function ShoppingList(props) {
    const { shoppingListItems } = props

    return (
        <>
            <h3 className="text-2xl text-white poppins-extrabold my-3">Here is your shopping list</h3>
            <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg">
                <ul className="p-4">
                    {shoppingListItems.map((item, index) => {
                        return(
                            <li key={index} className="text-white mb-2">{item.item_name}<i className="fa-solid fa-square-check text-base text-green-600 ml-2"></i></li>
                        )
                    })}
                </ul>
            </div>
        
        
        </>
    )
}