
export function LoginRegister(props) {
    const { isLoading, setRegistering, setLoggingIn, setSuggestions } = props
    
    if(isLoading) return null

    return (
        <>
        <div className="mt-8">
            <h2 className="text-xl poppins-extrabold my-3 text-white">Sign Up or Login to use all features!</h2>
            <div className="bg-[var(--secondary-color)] w-max rounded-lg p-2 flex gap-4">
                <button className="bg-white text-black px-2 rounded-lg" 
                onClick={() => {
                    setRegistering(true)
                }}>Sign Up</button>
                <button className="bg-white text-black px-2 rounded-lg"
                onClick={() => {
                    setLoggingIn(true)
                    setSuggestions([])
                }}>Login</button>
            </div>
        </div>
        
        </>
    )
}