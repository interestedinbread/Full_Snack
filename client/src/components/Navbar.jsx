import { useContext, useEffect, useState } from "react"
import { NavModal } from "./modals/NavModal"
import { AuthContext } from "./context/AuthContext"

export function Navbar(props) {
    const { setSuggestions, 
        setSavedMealsOpen, 
        setSelectedMeal, 
        setLoggingIn, 
        handleGetShoppingList,
        navModalOpen,
        setNavModalOpen,
        setShoppingListOpen,
        handleGetMeals,
        scrolled } = props
    
    const { authenticated, setAuthenticated } = useContext(AuthContext)
    

    const handleLogout = () => {
        localStorage.removeItem('user')
        setAuthenticated(false)
        setNavModalOpen(false)
        setSuggestions([])
        setShoppingListOpen(false)
    }

    const handleLogin = () => {
        setLoggingIn(true)
        setNavModalOpen(false)
        setShoppingListOpen(false)
    }

    const handleGenerate = () => {
        setSuggestions([])
        setNavModalOpen(false)
        setSavedMealsOpen(false)
        setShoppingListOpen(false)
    }

    


    const tabs = [
        {name: 'Generate', onclick: handleGenerate},
        {name: 'Saved Meals', onclick: handleGetMeals},
        {name: 'Shopping List', onclick: handleGetShoppingList},
        {name: authenticated ? 'Logout' : 'Login', onclick: authenticated ? handleLogout : handleLogin}
    ]


    return(
        <>
            <nav className={`flex justify-end ${scrolled ? 'backdrop-blur-md shadow-md' : ''}`}>
                <div className="flex justify-end gap-4 p-4 hidden">
                    {tabs.map((tab, tabIndex) => {
                        return(
                            <button key={tabIndex} onClick={tab.onclick}>
                                <h4 className="text-white poppins-regular text-sm">{tab.name}</h4>
                            </button>
                        )
                    })}
                </div>
                <button className="mt-4 mr-4 relative z-50" onClick={() => {
                    setNavModalOpen(prev => !prev)
                    setSelectedMeal(null)
                }}>
                    <i className={`fa-solid fa-bars text-white text-3xl transition-transform duration-200 ${navModalOpen? 'rotate-180' : 'rotate-0'}`}></i>
                </button>
            </nav>
            {navModalOpen && (<NavModal tabs={tabs} setNavModalOpen={setNavModalOpen}/>)}
        </>
    )
}