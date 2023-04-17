import React from "react";
import {useAuth} from "./Context/AuthContext";

function NavBar() {

    const {getUser, userIsAuthenticated, userLogout} = useAuth()

    const logout = () => {
        userLogout()
    }

    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">eBill</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="/">Home</a>
                        </li>
                        {
                            userIsAuthenticated() === true ?
                                <>
                                    {getUser().role === "ADMIN" ? <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/admin">Admin Panel</a>
                                        </li>
                                    </> : null}
                                    <li className="nav-item">
                                        <a className="nav-link" href="/profile">Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/generate">Generate</a>
                                    </li>
                                </> : null
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        {
                            userIsAuthenticated() === true ? <li className="nav-item">
                                    <a href="/" className="nav-link" onClick={logout}>Logout</a>
                                </li> :
                                (
                                    <>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/login">Login</a>
                                        </li>

                                        <li className="nav-item">
                                            <a className="nav-link" href="/register">Register</a>
                                        </li>
                                    </>
                                )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )

}

export default NavBar