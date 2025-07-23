import ReactDom from 'react-dom'


export function NavModal(props) {
    const { tabs, setNavModalOpen } = props

    return ReactDom.createPortal(
        <div className="fixed inset-0 z-10">
            <button className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => {
                setNavModalOpen(false)
            }}/>
            <div className="fixed inset-0 w-4/5 mx-auto mt-60 z-50 max-h-[60vh] flex flex-col gap-4 h-max">
                {tabs.map((tab, index) => {
                    return(
                        <button key={index} className='my-2' onClick={async() => {
                            await tab.onclick()
                        }}>
                            <h2 className="text-white poppins-regular text-2xl">{tab.name}</h2>
                        </button>
                    )
                })}
            </div>
        </div>,
        document.getElementById('portal')
    )
}