import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import * as Components from '../Components/Components';
import './CSS/Login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // Use login from AuthContext

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5001/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        const data = await response.json();
        if (response.ok) {
            // Save token and navigate to dashboard
            localStorage.setItem('token', data.token);
            dispatch({ type: 'SET_USER', payload: { user: username, token: data.token } });
            login({ username, token: data.token });
            navigate('/dashboard');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="container">
            <div className="signInContainer">
                <form className="form" onSubmit={handleSubmit}>
                    <h2 className="title">Sign In</h2>
                    <input className="input" type="text" placeholder="User Name" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    <a className="anchor" href="#">Forgot your password?</a>
                    <button className="button" type="submit">Sign In</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
