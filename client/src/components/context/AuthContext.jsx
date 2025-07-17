import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)
    const [username, setUsername] = useState('')

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if(storedUser){
            setAuthenticated(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated, username, setUsername }} >
            { children }
        </AuthContext.Provider>
    )
}