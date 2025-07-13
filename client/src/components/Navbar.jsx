import { useState } from "react"
import { NavModal } from "./modals/NavModal"

export function Navbar() {

    const tabs = ['Home', 'About', 'Generate', 'Shopping List', 'Meals']
    const [navModalOpen, setNavModalOpen] = useState(false)

    return(
        <>
            <nav className="flex justify-end">
                <div className="flex justify-end gap-4 p-4 hidden">
                    {tabs.map((tab, tabIndex) => {
                        return(
                            <button key={tabIndex} className="">
                                <h4 className="text-white poppins-regular text-sm">{tab}</h4>
                            </button>
                        )
                    })}
                </div>
                <button className="mt-4 mr-4" onClick={() => {
                    setNavModalOpen(prev => !prev)
                }}>
                    <i className="fa-solid fa-bars text-white text-3xl"></i>
                </button>
            </nav>
            {navModalOpen && (<NavModal tabs={tabs} setNavModalOpen={setNavModalOpen}/>)}
        </>
    )
}