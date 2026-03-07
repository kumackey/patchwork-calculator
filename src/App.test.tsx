import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders patchwork calculator', () => {
  render(<App />);
  const heading = screen.getByText(/Patchwork Calculator/i);
  expect(heading).toBeInTheDocument();
});
