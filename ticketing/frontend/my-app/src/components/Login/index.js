import React, {useEffect, useRef, useState, useContext} from 'react';
import './login.css';
import loginImage from '../../logo.png';
import axios from "../../api/axios";
//import {AuthContext} from '../../context/AuthProvider'
import LoginContext from "../../context/LoginContext";

// remove later !!
import db from '../database/db.json';

function Login() {

    const userRef = useRef();
    const errRef = useRef();

    const {user, getUser, userIsAuthenticated, userLogin, userLogout} = useContext(LoginContext);

    const [isLogin, setIsLogin] = useState(true);
    const [loginAsASection, setLoginAsASection] = useState(false)
    const [username, setUsername] = useState("");
    const [loginUsername, setLoginUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loged, setLoged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        userRef.current.focus();
    }, [])

    const handleTabChange = () => {
        setIsLogin(!isLogin);
    };

    const login = async (e) => {
        e.preventDefault()

        const newUser = {
            username: loginUsername,
            password: loginPassword
        }

        //       UNCOMMENT LATER
        if (!loginAsASection) {
            try {
                const response = await axios.post('/auth/authenticate', newUser);
                let userObject = response.data.user
                userObject.role = "user"
                setCurrentUser(userObject);
                userLogin(userObject); // SET SESSION
                window.location.replace('/');
            } catch (error) {
                setErrorMessage('Invalid username or password'); // Set error message
                console.log(error);
            }
        } else {
            try {
                const response = await axios.post('/api/sections/login/', newUser);
                let sectionObject = await response.data.user
                sectionObject.role = "section"
                setCurrentUser(sectionObject);
                userLogin(sectionObject); // SET SESSION
                window.location.replace('/');
            } catch (error) {
                setErrorMessage('Invalid username or password'); // Set error message
                console.log(error);
            }
        }


        // try {
        //     const user = db.users.find(user => user.username === newUser.username && user.password === newUser.password);
        //
        //     if (user) {
        //         setCurrentUser(user);
        //         userLogin(user); // SET SESSION
        //         window.location.replace('/');
        //     } else {
        //         setErrorMessage('Invalid username or password');
        //     }
        // } catch (error) {
        //     setErrorMessage('Error reading database');
        //     console.log(error);
        // }
    }

    function register(e) {
        console.log(username, first_name, last_name, password, email, role)
        e.preventDefault();

        //const authorities = [role];
        //console.log(authorities)

        const newUser = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            email: email,
            password: password,

            // role: role
        };

        // console.log(role)
        // console.log('Type ' + typeof(role))


        //     UNCOMMENT LATER


        axios.post('/api/users/register/', newUser)
            .then(response => {
                console.log(response);
                setSuccess(true);
                setErrorMessage(null)
                setUsername('')
                setFirstName('')
                setLastName('')
                setPassword('')
                setEmail('')
            })
            .catch(error => {
                const firstKey = Object.keys(error.response.data)[0];
                const firstValue = error.response.data[firstKey];
                setErrorMessage(firstValue)
                setSuccess(false);
            });

        /*try {
            const existingUser = db.users.find(user => user.username === newUser.username);

            if (existingUser) {
                setErrorMessage('User already exists');
            } else {
                db.users.push(newUser);
                setSuccess(true);
            }
        } catch (error) {
            setErrorMessage('Error updating database');
            console.log(error);
        }*/


        //setUsername('');
        //setPassword('');
        //setEmail('');
        //setRole('');


    }

    function onRoleChange(event) {
        setRole(event.target.value)
    }

    return (
        <div>

            {/* Render error message if it exists */}
            {errorMessage &&
                <div className="alert alert-warning" role="alert">
                    {errorMessage}</div>}

            {success ? (
                <div className="alert alert-success" role="alert">
                    You have successfully registered.
                </div>
            ) : (
                <div/>
            )
            }
            <div className="login-container">
                <div className="image-container">
                    <img src={loginImage} alt="Logo" className="logo"/>
                </div>
                <div className="form-container">
                    <div className="tabs">
                        <button
                            className={`tab-button ${isLogin ? 'active' : ''}`}
                            onClick={handleTabChange}
                        >
                            Login
                        </button>
                        <button
                            className={`tab-button ${isLogin ? '' : 'active'}`}
                            onClick={handleTabChange}
                        >
                            Register
                        </button>
                    </div>
                    {isLogin ? (
                        <form className="login-form" onSubmit={login}>
                            <input
                                type="text"
                                placeholder="Username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setLoginUsername(e.target.value)}
                                value={loginUsername}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setLoginPassword(e.target.value)}
                                value={loginPassword}
                                required
                            />

                            <div className="form-check">
                                <input onChange={() => {
                                    setLoginAsASection(!loginAsASection)
                                }} className="form-check-input" type="checkbox" value={loginAsASection}
                                       id="flexCheckDefault"/>
                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                    Login as a section
                                </label>
                            </div>

                            <button type="submit">Login</button>

                            {/*sessionStorage.getItem('user') !== null ? (//ADD REDIRECT?
                                    <div>
                                        <div>{currentUser.id}</div> 
                                        <div>{currentUser.name}</div>
                                        <div>{currentUser.role}</div>
                                        
                                    </div>
                                ): (
                                    <div></div>
                                )*/}
                        </form>
                    ) : (
                        <form className="register-form" onSubmit={register}>


                            <input
                                type="text"
                                placeholder="First Name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={first_name}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setLastName(e.target.value)}
                                value={last_name}
                                required
                            />
                            <input
                                type="text"
                                placeholder="Username"
                                ref={userRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                            <input type="email"
                                   placeholder="Email"
                                   onChange={(e) => setEmail(e.target.value)}
                                   value={email}
                                   required/>
                            <input type="password"
                                   placeholder="Password"
                                   onChange={(e) => setPassword(e.target.value)}
                                   value={password}
                                   required/>
                            {/*<label htmlFor="role" className="form-label">I want to register as:</label>
                                <select className="form-select mb-3" id="role" aria-label="Type" onChange={onRoleChange} value={role} >
                                    <option value="">--Please choose an option--</option>
                                    <option value="user">Student</option>
                                    <option value="section">ESN Section</option>
                                </select>*/}
                            <button type="submit">Register</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Login;
