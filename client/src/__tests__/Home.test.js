import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../Components/Home';
import { UserContext } from '../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
jest.mock('../Components/Calendar', () => () => (
    <div>
      <button onClick={() => { /* Simulate date click */ }}>Calendar Date</button>
    </div>
  ));
jest.mock('axios');

const mockDispatch = jest.fn();
const mockUser = { id: '123' };
const mockState = {
  income: [
    { date: '2024-07-15', amount: 1000, description: 'Salary', frequency: 'monthly' }
  ],
  expenses: [
    { date: '2024-07-10', amount: 200, description: 'Rent', frequency: 'monthly' }
  ]
};

describe('Home Component', () => {
  test('renders Header and Calendar Component', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
          <Home user={mockUser} />
        </UserContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Monthly Budget Forecast/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Transactions/i)).toBeInTheDocument();
  });
  test('calculates forecast correctly', () => {
    render(
      <MemoryRouter>
        <UserContext.Provider value={{ state: mockState, dispatch: mockDispatch }}>
          <Home user={mockUser} />
        </UserContext.Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(/Projected Income: \$1000.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Projected Expenses: \$200.00/i)).toBeInTheDocument();
    expect(screen.getByText(/Projected Savings: \$800.00/i)).toBeInTheDocument();
  }); 
});
