import { useContext, useState } from 'react'
import ReactDom from 'react-dom'
import { loginUser } from '../../api/login'
import { registerUser } from '../../api/register'
import { AuthContext } from '../context/AuthContext'
import { motion } from 'framer-motion'

export function LoginRegisterModal(props) {

    const { loggingIn, setLoggingIn, registering, setRegistering, setRegisterSuccess } = props
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
            setRegistering(false)
            setRegisterSuccess(true)
        } catch (err) {
            console.error('Error registering user:', err)
        }
    }

    return ReactDom.createPortal(
        <div className='fixed inset-0 z-10'>
            <button className='fixed z-20 bg-black bg-opacity-50
                              lg:w-96 lg:h-[800px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-20 lg:rounded-[2.5rem] lg:border-4 lg:border-gray-300
                              md:w-96 md:left-1/2 md:transform md:-translate-x-1/2 md:top-20 md:rounded-[2.5rem]
                              w-80 left-1/2 transform -translate-x-1/2 top-16' onClick={() => {
                setLoggingIn(false)
                setRegistering(false)
            }}/>
            <div className='bg-[var(--secondary-color)] fixed w-max h-max z-50 rounded-md
                           lg:w-60 lg:h-[300px] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:top-50 lg:rounded-lg
                           md:w-96 md:left-1/2 md:transform md:-translate-x-1/2 md:top-20 md:rounded-[2.5rem]
                           w-80 left-1/2 transform -translate-x-1/2 top-16'>
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
                    <motion.button className="bg-white text-black px-2 mr-2 rounded-lg border-3 border-green-400"
                    whileTap={{ scale: 0.85 }}
                    onClick={ async () => {
                        setTimeout(async () => {
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
                            setLoggingIn(false)
                            setRegistering(false)
                        }, 100)
                    }}>Submit</motion.button>
                    <p className='text-white text-base mt-4'>
                        {registering ? "Already have an account?" : "Don't have an account?"}
                    </p>
                    <motion.button className="bg-white text-black px-2 rounded-lg my-2 border-3 border-green-400"
                    whileTap={{ scale: 0.85 }}
                    onClick={() => {
                        setTimeout(() => {
                            setLoggingIn(prev => !prev)
                            setRegistering(prev => !prev)
                        }, 100)
                    }}>{registering ? "login" : "register"}</motion.button>
                </div>
            </div>
        </div>,
        document.getElementById('portal')
    )
}