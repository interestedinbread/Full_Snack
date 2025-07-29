import { useState, useEffect } from "react"
import { motion } from 'framer-motion'


export function ShoppingList(props) {
    const { shoppingListItems, 
        handleMultiDeleteFromList, 
        handleMultiAddToList, 
        handleAddToList,
         } = props
    const [selectedItems, setSelectedItems] = useState([])
    const [backedUpItems, setBackedUpItems] = useState([])
    const [refetchTrigger, setRefetchTrigger] = useState(0)
    const [inputValue, setInputValue] = useState('')

    const handleAddToSelectedItems = (item) => {
        const newItems = [...selectedItems, item]
        setSelectedItems(newItems)
    }

    const handleRemoveFromSelectedItems = (item) => {
        const newItems = selectedItems.filter(i => i !== item)
        setSelectedItems(newItems)
    }

    return (
        <div>
            <h3 className="text-2xl text-white poppins-extrabold my-3">Here is your shopping list</h3>
            <motion.div
            key="shopping-list"
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
                <motion.div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mb-8 relative min-h-[100px]"
                layout='position'>
                    <img alt="grocery-bag-image" src="/img/noun-grocery-bag-275627-5EE64F.png" 
                    className='h-[75px] w-[75px] absolute top-4 right-4'
                    />
                    <ul className="p-4">
                        {shoppingListItems.map((item, index) => {
                            return(
                                <li key={index}>
                                    <button className="text-white poppins-regular mb-2" onClick={() => {
                                        selectedItems.includes(item) ? 
                                        handleRemoveFromSelectedItems(item) :
                                        handleAddToSelectedItems(item)
                                    }}>
                                        {item.item}
                                        {selectedItems.includes(item) && <motion.i 
                                            className="fa-solid fa-square-check text-base text-green-600 ml-2"
                                            initial = {{ scale: 0.5, opacity: 0 }}
                                            animate = {{ scale: 1, opacity: 1 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                            />}
                                    </button >
                                </li>
                            )
                        })}
                    </ul>
                </motion.div>
                {selectedItems.length > 0 && 
                <motion.div className="bg-[var(--secondary-color)] w-9/10 rounded-lg"
                initial = {{ scale: 0.5, opacity: 0 }}
                animate = {{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}>
                    <p className="p-3 text-white text-base italic">Remove checked items from shopping list?</p>
                    <button className="ml-4 mb-3 bg-white text-black px-2 rounded-lg"
                    onClick={async () => {
                        const backup = [...selectedItems]
                        setBackedUpItems(backup)
                        const ids = backup.map(item => item.id)
                        await handleMultiDeleteFromList(ids)
                        setSelectedItems([])
                        console.log('Backed up Items:', backup)
                        setRefetchTrigger(prev => prev + 1)
                    }}>Remove</button>
                </motion.div>}
                {(backedUpItems.length > 0 && selectedItems.length === 0) && 
                <motion.div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mt-4"
                initial = {{ scale: 0.5, opacity: 0 }}
                animate = {{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 15 }}>
                    <p className="p-3 text-white text-base italic">Undo remove items?</p>
                    <button className="ml-4 mb-3 bg-white text-black px-2 rounded-lg"
                    onClick={async () => {
                        const items = backedUpItems.map(item => item.item_name)
                        await handleMultiAddToList(items)
                        setBackedUpItems([])
                        setSelectedItems([])
                        setRefetchTrigger(prev => prev + 1)
                    }}>Undo</button>
                </motion.div>}
                <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mt-4">
                    <p className="p-3 text-white text-base">Enter new ingredients below</p>
                    <input placeholder="green onion" className="ml-3 mb-3 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                    }}
                    onKeyDown={async (e) => {
                        if(e.key === "Enter" && inputValue){
                            await handleAddToList(inputValue)
                            setInputValue('')
                            setRefetchTrigger(prev => prev + 1)
                        }
                    }}/>
                    <button className="ml-4 bg-white text-black px-2 rounded-lg"
                    onClick={async() => {
                        await handleAddToList(inputValue)
                        setInputValue('')
                        setRefetchTrigger(prev => prev + 1)
                    }}>Add</button>
                </div>
            </motion.div>
        </div>
    )
}