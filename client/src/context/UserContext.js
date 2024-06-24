// State Management and Context API:

// The React application uses Context API to manage global state, such as user information and authentication status.



// src/context/UserContext.js
import React, { createContext, useReducer, useEffect } from 'react';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    income: 0,
    expenses: [],
    savingsGoals: []
};

const reducer = (state, action) => {
    
    switch (action.type) {
        case 'SET_USER':
            localStorage.setItem('token', action.payload.token);
            return { ...state, user: action.payload.user, token: action.payload.token };
        case 'LOGOUT':
            localStorage.removeItem('token');
            return { ...state, user: null, token: null, income: 0, expenses: [], savingsGoals: [] };
        // Add cases for setting income, expenses, savings goals, etc.
        default:
            return state;
    }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Optionally: Fetch user data if token exists
        if (state.token) {
            console.log(state);
            // Fetch user data and dispatch actions to update state
        }
    }, [state.token]);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};
