import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { UserContext } from '../context/UserContext';
import { AuthContext } from '../context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../Components/Login';

// Mock Components module
jest.mock('../components/Components', () => ({
    Container: ({ children }) => <div>{children}</div>,
    SignInContainer: ({ children }) => <div>{children}</div>,
    Form: ({ children, ...props }) => <form {...props}>{children}</form>,
    Title: ({ children }) => <h1>{children}</h1>,
    Input: (props) => <input {...props} />,
    Anchor: (props) => <a {...props} />,
    Button: (props) => <button {...props} />
}));

describe('Login Component', () => {
    const mockDispatch = jest.fn();
    const mockLogin = jest.fn();

    beforeEach(() => {
        render(
            <UserContext.Provider value={{ dispatch: mockDispatch }}>
                <AuthContext.Provider value={{ login: mockLogin }}>
                    <Router>
                        <Login />
                    </Router>
                </AuthContext.Provider>
            </UserContext.Provider>
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders login component', () => {
        expect(screen.getByRole('heading', { name: /sign in/i })).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/user name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
        expect(screen.getByText(/forgot your password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });

    test('can type in username and password inputs', () => {
        const usernameInput = screen.getByPlaceholderText(/user name/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password');
    });

    test('successful form submission', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ token: 'test-token', user: { name: 'Test User' } })
            })
        );
    
        const usernameInput = screen.getByPlaceholderText(/user name/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const form = screen.getByTestId('login-form'); // Updated selector
    
        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });
    
        fireEvent.submit(form);
    
        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith({
                type: 'SET_USER',
                payload: { user: { name: 'Test User' }, token: 'test-token' }
            });
        });
    
        await waitFor(() => {
            expect(mockLogin).toHaveBeenCalledWith({ username: 'testuser', token: 'test-token' });
        });
    });
    

    test('login button is disabled when fields are empty', () => {
        const usernameInput = screen.getByPlaceholderText(/user name/i);
        const passwordInput = screen.getByPlaceholderText(/password/i);
        const loginButton = screen.getByRole('button', { name: /sign in/i });

        // Check if the button is disabled initially
        expect(loginButton).toBeDisabled();

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password' } });

        expect(loginButton).toBeEnabled();
    });
});
