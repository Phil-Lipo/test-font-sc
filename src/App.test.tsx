import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders learn react link', async () => {
  render(<App />);

  await waitFor(() => {
    screen.getByText('Open-space');
    screen.getByText('Creer une réunion');
    screen.getByText('Prochaine réservation');
  });
});
