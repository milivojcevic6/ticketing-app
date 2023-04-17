import React, {Component, useContext} from 'react'

const AuthContext = React.createContext()

class AuthProvider extends Component {
    state = {
        user: null
    }

    componentDidMount() {
        const user = sessionStorage.getItem('user')
        this.setState({user})
    }

    getUser = () => {
        return JSON.parse(sessionStorage.getItem('user'))
    }

    userIsAuthenticated = () => {
        return sessionStorage.getItem('user') !== null
    }

    userLogin = user => {
        sessionStorage.setItem('user', JSON.stringify(user))
        this.setState({user})
    }

    userLogout = () => {
        sessionStorage.removeItem('user')
        this.setState({user: null})
    }

    render() {
        const {children} = this.props
        const {user} = this.state
        const {getUser, userIsAuthenticated, userLogin, userLogout} = this

        return (
            <AuthContext.Provider value={{user, getUser, userIsAuthenticated, userLogin, userLogout,}}>
                {children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContext

export function useAuth() {
        return useContext(AuthContext)
}

export {AuthProvider}