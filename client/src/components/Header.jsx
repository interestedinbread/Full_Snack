import { useContext } from "react"
import { AuthContext } from "./context/AuthContext"

export function Header() {

    const { authenticated, username } = useContext(AuthContext)

    return(
        <>
        <header className="w-9/10">
            <h1 className="text-5xl poppins-extrabold text-white">Full Snack</h1>
            {!authenticated && (
                <>
                    <h3 className="my-3 text-lg text-white">Never run out of meal ideas!</h3>
                    <div className="bg-[var(--secondary-color)] max-w-lg rounded-lg mb-4">
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
                    <h3 className="my-3 text-lg text-white">Welcome back {username}!</h3>
                </>
            )}
        </header>
        </>
    )
}