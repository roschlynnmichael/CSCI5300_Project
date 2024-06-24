// src/components/Login.js
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import * as Components from '../Components/Components';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { dispatch } = useContext(UserContext);
    const navigate = useNavigate();

    //a

    const { login } = useContext(AuthContext); // Use login from AuthContext




//Connecting Node.js Backend to React Frontend
// Frontend Fetch Requests:

// The React frontend makes HTTP requests to the backend endpoints using fetch or libraries like axios.

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
            login({username,token:data.token});
            navigate('/dashboard');
        } else {
            alert('Login failed');
        }
    };

    // const [signIn, toggle] = useState(true);


    return (
        // <form onSubmit={handleSubmit}>
        //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        //     <button type="submit">Login</button>
        // </form>
<Components.Container>
<Components.SignInContainer>
<Components.Form onSubmit={handleSubmit}>
    <Components.Title>Sign In</Components.Title>
    <Components.Input type='text' name='text' placeholder='User Name' value={username} onChange={(e) => setUsername(e.target.value)} required />
    <Components.Input type='password' name='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
    <Components.Anchor href='#'>Forgot your password?</Components.Anchor>
    <Components.Button type="submit">Sign In</Components.Button>
</Components.Form>
</Components.SignInContainer>
</Components.Container>
    );
};

export default Login;
