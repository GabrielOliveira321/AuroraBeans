import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the site header', () => {
  render(<App />);
  const headingElement = screen.getByRole('link', { name: /aurora beans/i });
  expect(headingElement).toBeInTheDocument();
});
