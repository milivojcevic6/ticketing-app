﻿import React, {useEffect, useRef, useState, useContext} from 'react';
import './login.css';
import loginImage from '../../logo.png';
import axios from "../../api/axios";
//import {AuthContext} from '../../context/AuthProvider'
import LoginContext from "../../context/LoginContext";

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
    
       
    const setLogging = () => {
        const isUser = userIsAuthenticated
        setLoged(isUser)
    }
    
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
        
        const result = await axios.post('/auth/authenticate', newUser)
        console.log(result);
        setCurrentUser(result.data)
        //setUser(result.data)
        userLogin(result.data)  //SET SESSION
        //setLoged(true)
        console.log('currrrr', currentUser)
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

        if(role==="section"){
            axios.post('/api/sections/register', newUser)
                .then(response => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch(error => console.log(error));
        }
        else {
            axios.post('/api/users/register', newUser)
                .then(response => {
                    console.log(response);
                    setSuccess(true);
                })
                .catch(error => console.log(error));
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
                                {loged ? (//ADD REDIRECT?
                                    <div>
                                        <div>{currentUser.id}</div> 
                                        <div>{currentUser.name}</div>
                                        <div>{currentUser.role}</div>
                                    </div>
                                ): (
                                    <div></div>
                                )}
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
