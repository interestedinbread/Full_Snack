import { useContext } from "react"
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
        } = props
    
    const { authenticated, setAuthenticated } = useContext(AuthContext)
    

    const handleLogout = () => {
        localStorage.removeItem('user')
        setAuthenticated(false)
        setNavModalOpen(false)
        setSuggestions([])
        setShoppingListOpen(false)
        setSavedMealsOpen(false)
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
            <nav className="flex justify-between px-4 pt-8 fixed left-0 right-0 z-50 bg-black lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:w-96 lg:top-20 lg:rounded-t-[2.5rem] lg:pt-6 lg:border-t-4 lg:border-l-4 lg:border-r-4 lg:border-t-gray-300 lg:border-l-gray-300 lg:border-r-gray-300">
                <div className="flex">
                    <h1 className="text-4xl poppins-extrabold text-white mb-4">Full Snack</h1>
                    <img src="/img/Carrot_icon.png" className="ml-2 -mt-2 h-[60px] w-[60px]"/>
                </div>
                <button className="relative z-50 mr-2" onClick={() => {
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