import React, { useState } from 'react';
import './login.css';
import loginImage from '../../logo.png';

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const handleTabChange = () => {
        setIsLogin(!isLogin);
    };

    return (
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
                    <form className="login-form">
                        <input type="text" placeholder="Username" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                ) : (
                    <form className="register-form">
                        <input type="text" placeholder="Username" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button type="submit">Register</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
