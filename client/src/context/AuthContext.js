import React, { createContext, useState, useEffect } from 'react';

import { jwtDecode } from 'jwt-decode';

// import axios from 'axios';

const AuthContext = createContext();


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check for user session in localStorage
        const userData = localStorage.getItem('user');

        if (userData) {
            const parsedUserData = JSON.parse(userData);
            const decodedToken = jwtDecode(parsedUserData.token);
            const userId = decodedToken.id; // Make sure your token payload includes 'id'
            setUser({ ...parsedUserData, id: userId });
            console.log("User data from local storage:", { ...parsedUserData, id: userId });
        }
    }, []);

    const login = (userData) => {
        const decodedToken = jwtDecode(userData.token);
        const userId = decodedToken.id; // Make sure your token payload includes 'id'
        localStorage.setItem('user', JSON.stringify(userData));
        setUser({ ...userData, id: userId });
        console.log("User logged in and set:", { ...userData, id: userId });
     };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthProvider };
