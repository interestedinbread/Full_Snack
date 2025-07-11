import { createContext, useState } from "react";

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [authenticated, setAuthenticated] = useState(false)

    return (
        <AuthContext.Provider value={{ authenticated, setAuthenticated }} >
            { children }
        </AuthContext.Provider>
    )
}