import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Click on the Vite and React logos to learn more/i);
  expect(linkElement).toBeInTheDocument();
});



