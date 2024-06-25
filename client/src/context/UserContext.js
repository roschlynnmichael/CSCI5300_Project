import React, { createContext, useReducer, useEffect } from 'react';

import axios from 'axios';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    income: [],
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
            return { ...state, user: null, token: null, income: [], expenses: [], savingsGoals: [] };
        case 'ADD_INCOME':
            return { ...state, income: [...state.income, action.payload] };
        case 'ADD_EXPENSE':
            return { ...state, expenses: [...state.expenses, action.payload] };
        default:
            return state;
    }
};

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (state.token) {
            console.log(state);
            axios.defaults.headers.common['Authorization'] = state.token;

            // Fetch user data and dispatch actions to update state
        }
    }, [state.token]);

    const addIncome = async (incomeData) => {
        try {
            await axios.post('http://localhost:5001/api/income', incomeData);
            dispatch({ type: 'ADD_INCOME', payload: incomeData });
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    const addExpense = async (expenseData) => {
        try {
            await axios.post('http://localhost:5001/api/expense', expenseData);
            dispatch({ type: 'ADD_EXPENSE', payload: expenseData });
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <UserContext.Provider value={{ state, dispatch, addIncome, addExpense }}>
            {children}
        </UserContext.Provider>
    );
};
