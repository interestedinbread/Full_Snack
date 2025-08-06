import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

export function Header(props) {
    const { selectedMeal } = props
    const { authenticated, username } = useContext(AuthContext)

    if(selectedMeal) {
        return null
    }

    return(
        <>
        <header className="w-9/10 md:flex md:flex-col md:justify-center md:items-center">
            <div className="flex">
                <h1 className="text-5xl poppins-extrabold text-white md:text-7xl">Full Snack</h1>
                <img src="/img/Carrot_icon.png" className="ml-2 -mt-2 h-[60px] w-[60px] md:h-[80px] md:w-[80px]"/>
            </div>
            {!authenticated && (
                <>
                    <h3 className="my-3 text-lg md:text-xl text-white md:-ml-14">Never run out of meal ideas!</h3>
                    <div className="bg-[var(--secondary-color)] max-w-lg rounded-lg mb-4 md:max-w-[700px]">
                        <h4 className="text-3xl p-4 poppins-extrabold text-white">Use Full Snack and...</h4>
                        <ul className="pl-4 pb-4 md:px-4">
                            <li className="text-base md:text-lg poppins-regular text-white leading-relaxed">💡 Get inspiration for your next meal!</li>
                            <li className="text-base md:text-lg poppins-regular text-white leading-relaxed">📝 Plan your next grocery list!</li>
                            <li className="text-base md:text-lg poppins-regular text-white leading-relaxed">🧠 Discover the potential of ingredients you already have! </li>
                        </ul>
                    </div>
                </>
            )}
            {authenticated && (
                <>
                    <h3 className="my-3 text-lg text-white md:-ml-12">Welcome back {username}!</h3>
                </>
            )}
        </header>
        </>
    )
}