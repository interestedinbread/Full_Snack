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
        <header className="w-full">
            <div className="w-9/10 mx-auto">
                <div className="flex">
                    <h1 className="text-4xl poppins-extrabold text-white">Full Snack</h1>
                    <img src="/img/Carrot_icon.png" className="ml-2 -mt-2 h-[60px] w-[60px]"/>
                </div>
            </div>
            {!authenticated && (
                <>
                    <h3 className="mb-3 text-lg text-white w-9/10 mx-auto italic">Never run out of meal ideas!</h3>
                    <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mb-4 mx-auto">
                        <h4 className="text-3xl p-4 poppins-extrabold text-white">Use Full Snack and...</h4>
                        <ul className="pl-4 pb-4">
                            <li className="text-base poppins-regular text-white leading-relaxed">💡 Get inspiration for your next meal!</li>
                            <li className="text-base poppins-regular text-white leading-relaxed">📝 Plan your next grocery list!</li>
                            <li className="text-base poppins-regular text-white leading-relaxed">🧠 Discover the potential of ingredients you already have! </li>
                        </ul>
                    </div>
                </>
            )}
            {authenticated && (
                <>
                    <h3 className="my-3 text-lg text-white md:-ml-12 md:text-center">Welcome back {username}!</h3>
                </>
            )}
        </header>
        </>
    )
}