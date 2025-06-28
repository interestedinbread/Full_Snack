import ReactDom from 'react-dom'

export function Modal() {
    return ReactDom.createPortal(
        <div>
            <button onClick={handleCloseModal}/>
            <div>
                {children}
            </div>
        </div>,
        document.getElementById('portal')
    )
}