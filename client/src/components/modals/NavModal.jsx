import ReactDom from 'react-dom'


export function NavModal(props) {
    const { tabs, setNavModalOpen } = props

    return ReactDom.createPortal(
        <div className="fixed inset-0 z-10">
            <button className="fixed inset-0 z-20 bg-black bg-opacity-50
                              md:w-96 md:h-[800px] md:left-1/2 md:transform md:-translate-x-1/2 md:top-20 md:rounded-[2.5rem] md:inset-auto
                              lg:w-96 lg:h-[800px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-20 lg:rounded-[2.5rem] lg:border-4 lg:border-gray-300" onClick={() => {
                setNavModalOpen(false)
            }}/>
            <div className="fixed inset-0 w-4/5 mx-auto mt-60 z-50 max-h-[60vh] flex flex-col gap-4 h-max
                           md:w-96 md:h-[800px] md:left-1/2 md:transform md:-translate-x-1/2 md:top-20 md:rounded-[2.5rem] md:inset-auto md:w-4/5 md:mx-auto md:mt-60
                           lg:w-4/5 lg:h-max lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-10 lg:rounded-lg lg:inset-auto lg:mx-auto">
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