import ReactDom from 'react-dom'

export function LoginRegisterModal(props) {

    const { loggingIn, setLoggingIn, registering, setRegistering } = props

    return ReactDom.createPortal(
        <div className='fixed inset-0 z-10'>
            <button className='fixed inset-0 z-20 bg-black bg-opacity-50' onClick={() => {
                setLoggingIn(false)
                setRegistering(false)
            }}/>
            <div className='bg-[var(--secondary-color)] fixed inset-0 w-max h-max mx-auto mt-24 z-50 rounded-md'>
                {registering && (<div className="flex flex-col gap-4">
                    <input className="mx-4 mt-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='create a username'></input>
                    <input className="mx-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='enter an email'></input>
                    <input className="mx-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='create a password'></input>
                </div>)}
                {loggingIn && (<div className="flex flex-col gap-4">
                    <input className="mx-4 pl-2 mt-4 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='your email'></input>
                    <input className="mx-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='your password'></input>
                </div>)}
                <div className='ml-4 my-2'>
                    <button className="bg-white text-black px-2 mr-2 rounded-lg">Submit</button>
                    <button className="bg-white text-black px-2 rounded-lg"
                    onClick={() => {
                        setLoggingIn(prev => !prev)
                        setRegistering(prev => !prev)
                    }}>{registering ? "register" : "login"}</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}