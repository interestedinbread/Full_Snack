export function MultiChoiceInput(props) {
    const { suggestions, isLoading } = props

    if(suggestions.length > 0 || isLoading) return null
    
    return (
            <>
                <h3 className="text-3xl poppins-extrabold mt-3 text-white">or...</h3>
                <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mt-2">
                    <h4 className="p-3 text-white">Answer a few questions about what you're looking for</h4>
                    <button className="ml-4 bg-white text-black px-2 mb-2 rounded-lg">Begin</button>
                </div>
            </>
    )
}