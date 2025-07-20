import { useContext, useState } from "react"
import { NavModal } from "./modals/NavModal"
import { AuthContext } from "./context/AuthContext"
import { getSavedMeals } from "../api/getSavedMeals"

export function Navbar(props) {
    const { setSuggestions, setSavedMealsOpen, setSelectedMeal } = props
    const [navModalOpen, setNavModalOpen] = useState(false)
    const { setAuthenticated } = useContext(AuthContext)
    

    const handleLogout = () => {
        localStorage.removeItem('user')
        setAuthenticated(false)
        setNavModalOpen(false)
        setSuggestions([])
    }

    const handleGenerate = () => {
        setSuggestions([])
        setNavModalOpen(false)
        setSavedMealsOpen(false)
    }

    const handleGetMeals = async () => {
        setNavModalOpen(false)
        setSuggestions([])
        setSelectedMeal(null)
        try{
            const result = await getSavedMeals()
            console.log('SaveMeal response:', result);
            setSuggestions(result.meals)
            setSavedMealsOpen(true)
        } catch (err) {
            console.error('Error getting meals', err)
        } 
    }

    const tabs = [
        {name: 'Generate', onclick: handleGenerate},
        {name: 'Saved Meals', onclick: handleGetMeals},
        {name: 'Logout', onclick: handleLogout}
    ]

    return(
        <>
            <nav className="flex justify-end">
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
                }}>
                    <i className={`fa-solid fa-bars text-white text-3xl transition-transform duration-200 ${navModalOpen? 'rotate-180' : 'rotate-0'}`}></i>
                </button>
            </nav>
            {navModalOpen && (<NavModal tabs={tabs} setNavModalOpen={setNavModalOpen}/>)}
        </>
    )
}