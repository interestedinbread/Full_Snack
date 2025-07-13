export function MultiChoiceInput(props) {
    const { suggestions } = props

    if(suggestions.length > 0) return null

    return (
            <>
                <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mt-8">
                    <h4 className="p-3 text-white">Answer a few questions about what you're looking for</h4>
                    <button className="ml-4 bg-white text-black px-2 mb-2 rounded-lg">Begin</button>
                </div>
            </>
    )
}