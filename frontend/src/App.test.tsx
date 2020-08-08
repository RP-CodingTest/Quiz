import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders the Questions page', () => {
  const { getByText } = render(<App />);
  const welcomeText = getByText(/Welcome to OYNB!!/i);
  expect(welcomeText).toBeInTheDocument();
});
