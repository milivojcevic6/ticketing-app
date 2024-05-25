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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
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
    
    /*useEffect(() => {
        setErrMsg('');
    },[username, password])*/
    
    const handleTabChange = () => {
        setIsLogin(!isLogin);
    };
    
    /*const login1 = async (e) => {
        e.preventDefault()
        console.log(username, password);
        //axios
        
        
        const newUser = {
            username: username,
            password: password
        }

        
       await axios.post('/auth/authenticate', newUser)
            .then(response => {

                console.log(response.data);
                setCurrentUser(convert(response.data));
                console.log('Logged in user', currentUser);
                //setCurrentUser(response.data)
                //console.log(user);
                //console.log('currentUser', currentUser);
                //setLoged(true);
                //setLoginSuccess(true);
            })
            .catch(error => console.log(error));
      
    }*/

    const login = async (e) => {
        e.preventDefault()
        
        const newUser = {
            username: username,
            password: password
        }
        
        //       UNCOMMENT LATER
        // try {
        //     const response = await axios.post('/auth/authenticate', newUser);
        //     setCurrentUser(response.data);
        //     userLogin(response.data); // SET SESSION
        //     window.location.replace('http://localhost:3000/');
        // } catch (error) {
        //     setErrorMessage('Invalid username or password'); // Set error message
        //     console.log(error);
        // }

        try {
            const user = db.users.find(user => user.username === newUser.username && user.password === newUser.password);

            if (user) {
                setCurrentUser(user);
                userLogin(user); // SET SESSION
                window.location.replace('/');
            } else {
                setErrorMessage('Invalid username or password');
            }
        } catch (error) {
            setErrorMessage('Error reading database');
            console.log(error);
        }
    }
    
    function register(e) {
        console.log(username, password, email, role)
        e.preventDefault();
        
        //const authorities = [role];
        //console.log(authorities)
        
        const newUser = {
            username: username,
            email: email,
            password:password,
            role: role
        };
        
        console.log(role)
        console.log('Type ' + typeof(role))

        
        //     UNCOMMENT LATER
        // if(role==="section"){
        //     axios.post('/api/sections/register', newUser)
        //         .then(response => {
        //             console.log(response);
        //             setSuccess(true);
        //         })
        //         .catch(error => console.log(error));
        // }
        // else {
        //     axios.post('/api/users/register', newUser)
        //         .then(response => {
        //             console.log(response);
        //             setSuccess(true);
        //         })
        //         .catch(error => console.log(error));
        // }

        try {
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
        }

        
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
                
                { success ? (
                    <div className="alert alert-success" role="alert">
                        You have successfully registered.
                    </div>
                ) : (
                    <div/>
                )
                }
                <div className="login-container">
                    <div className="image-container">
                        <img src={loginImage} alt="Logo" className="logo" />
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
                                    ref = {userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                
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
                                    placeholder="Username"
                                    ref = {userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                />
                                <input type="email"
                                       placeholder="Email"
                                       onChange={(e) => setEmail(e.target.value)}
                                       value={email}
                                       required />
                                <input  type="password"
                                        placeholder="Password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        value={password}
                                        required />
                                <label htmlFor="role" className="form-label">I want to register as:</label>
                                <select className="form-select mb-3" id="role" aria-label="Type" onChange={onRoleChange} value={role} >
                                    <option value="">--Please choose an option--</option>
                                    <option value="user">Student</option>
                                    <option value="section">ESN Section</option>
                                </select>
                                <button type="submit">Register</button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
    );
}

export default Login;
