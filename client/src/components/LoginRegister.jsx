
import { motion } from "framer-motion";

export function LoginRegister(props) {
    const { isLoading, setRegistering, setLoggingIn, setSuggestions } = props
    
    if(isLoading) return null

    return (
        <>
        <div className="mt-6 w-9/10 mx-auto">
            <h2 className="text-xl poppins-extrabold my-3 text-white">Sign Up or Login to use all features!</h2>
            <div className="">
                <div className="bg-[var(--secondary-color)] w-max rounded-lg p-2 flex gap-4">
                    <motion.button className="bg-white text-black px-2 rounded-lg border-3 border-green-400" 
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                        setTimeout(() => {
                            setRegistering(true)
                        }, 100)
                    }}>Sign Up</motion.button>
                    <motion.button className="bg-white text-black px-2 rounded-lg border-3 border-green-400"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                        setTimeout(() => {
                            setLoggingIn(true)
                            setSuggestions([])
                        }, 100)
                    }}>Login</motion.button>
                </div>
            </div>
        </div>
        
        </>
    )
}