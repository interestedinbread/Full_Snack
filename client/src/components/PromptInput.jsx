export function PromptInput(props) {

    const { suggestions } = props

    if(suggestions.length > 0) return null

    return (
        <>
            <div className="bg-[var(--secondary-color)] w-9/10 rounded-lg mt-8 flex flex-col">
                <h4 className="p-3 text-white">Tell us about a meal idea you have. It could be as vague or specific as you like!</h4>
                <input className="mx-auto mb-3 pl-2 bg-black border-2 border-slate-400 text-white text-sm rounded-lg h-16 w-9/10"
                placeholder="I'm thinking about something spicy and..."
                ></input>
                <button className="ml-4 w-max bg-white text-black px-2 mb-2 rounded-lg">Submit</button>
            </div>
        </>
    )
}