import ReactDom from 'react-dom'

export function Modal(props) {
    const { children, setSelectedMeal } = props
    return ReactDom.createPortal(
        <div className="fixed inset-0 z-10">
            <button className="fixed inset-0 z-20 bg-black bg-opacity-50" onClick={() => {
                console.log("modal buttn clicked")
                setSelectedMeal(null)
            }}/>
            <div className="fixed inset-0 w-4/5 mx-auto mt-24 z-50 max-h-[60vh]">
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}