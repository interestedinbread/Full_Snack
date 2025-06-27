export function Navbar() {

    const tabs = ['Home', 'About', 'Generate', 'Shopping List']

    return(
        <nav className="flex justify-end gap-4 p-4">
            {tabs.map((tab, tabIndex) => {
                return(
                    <button key={tabIndex} className="">
                        <h4 className="text-white poppins-regular text-sm">{tab}</h4>
                    </button>
                )
            })}
        </nav>
    )
}