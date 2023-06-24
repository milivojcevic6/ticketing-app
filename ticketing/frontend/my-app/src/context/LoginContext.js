import {createContext, useContext, useEffect, useState} from "react";

const LoginContext = createContext({});

function AuthProvider ({children}) {
    const [user, setUser] = useState(null);
    
    useEffect(()=>{
        const user = sessionStorage.getItem('user')
        setUser({user})
    },[setUser])

    const getUser = () => {
        return JSON.parse(sessionStorage.getItem('user'))
    }

    const userIsAuthenticated = () => {
        return sessionStorage.getItem('user') !== null
    }

    const userLogin = (user) => {
        sessionStorage.setItem('user', JSON.stringify(user))
        setUser({user})
    }

    const userLogout = () => {
        sessionStorage.removeItem('user')
        setUser(null)
    }

  
    return (
        <LoginContext.Provider value={{user, getUser, userIsAuthenticated, userLogin, userLogout,}}>
            {children}
        </LoginContext.Provider>
    )
    
}

export default LoginContext

export function useAuth() {
    return useContext(LoginContext)
}

export {AuthProvider}