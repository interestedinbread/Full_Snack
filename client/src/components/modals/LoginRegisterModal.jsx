import { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import { loginUser } from '../../api/login'
import { registerUser } from '../../api/register'
import { AuthContext } from '../context/AuthContext'

export function LoginRegisterModal(props) {

    const { loggingIn, setLoggingIn, registering, setRegistering } = props
    const [usernameValue, setUsernameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const { setAuthenticated, setUsername } = useContext(AuthContext)

    const handleLogin = async (credentials) => {
        try{
            const data = await loginUser(credentials)
            console.log('Login successful', data)
            const { user, token } = data
            localStorage.setItem('user', JSON.stringify({...user, token}))
            
            setAuthenticated(true)
            setUsername(user.username)
            
        } catch (err) {
            console.error('Could not log in:', err.message)
        }
    }

    const handleRegister = async (userInfo) => {
        try{
            const data = await registerUser(userInfo)
            console.log('User registered:', data)
        } catch (err) {
            console.error('Error registering user:', err)
        }
    }

    return ReactDom.createPortal(
        <div className='fixed inset-0 z-10'>
            <button className='fixed inset-0 z-20 bg-black bg-opacity-50' onClick={() => {
                setLoggingIn(false)
                setRegistering(false)
            }}/>
            <div className='bg-[var(--secondary-color)] fixed inset-0 w-max h-max mx-auto mt-24 z-50 rounded-md'>
                {registering && (<div className="flex flex-col gap-4">
                    <input className="mx-4 mt-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='create a username'
                    onChange={(e) => {
                        setUsernameValue(e.target.value)
                    }}></input>
                    <input className="mx-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='enter an email'
                    onChange={(e) => {
                        setEmailValue(e.target.value)
                    }}></input>
                    <input className="mx-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='create a password'
                    onChange={(e) => {
                        setPasswordValue(e.target.value)
                    }}></input>
                </div>)}
                {loggingIn && (<div className="flex flex-col gap-4">
                    <input className="mx-4 pl-2 mt-4 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='your email'
                    onChange={(e) => {
                        setEmailValue(e.target.value)
                    }}></input>
                    <input className="mx-4 pl-2 bg-black border-2 border-slate-400 text-white rounded-lg"
                    placeholder='your password'
                    onChange={(e) => {
                        setPasswordValue(e.target.value)
                    }}></input>
                </div>)}
                <div className='ml-4 my-2'>
                    <button className="bg-white text-black px-2 mr-2 rounded-lg"
                    onClick={ async () => {
                        if((registering && usernameValue === '') || 
                        emailValue === '' || 
                        passwordValue === ''){
                            alert('Please fill out all input fields')
                            return
                        }
                        if(loggingIn){
                            const credentials = {
                            email: emailValue,
                            password: passwordValue,
                        }
                            await handleLogin(credentials)
                        }
                        else if(registering){
                            const userInfo = {
                                username: usernameValue,
                                email: emailValue,
                                password: passwordValue,
                            }
                            await handleRegister(userInfo)
                        }  
                        setUsernameValue('')
                        setEmailValue('')
                        setPasswordValue('')
                    }}>Submit</button>
                    <p className='text-white text-base mt-4'>
                        {registering ? "Already have an account?" : "Don't have an account?"}
                    </p>
                    <button className="bg-white text-black px-2 rounded-lg my-2"
                    onClick={() => {
                        setLoggingIn(prev => !prev)
                        setRegistering(prev => !prev)
                    }}>{registering ? "login" : "register"}</button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}