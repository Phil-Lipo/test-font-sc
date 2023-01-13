import { render, screen } from '@testing-library/react';
import StatusRoom from './StatusRoom';
import { IBooking } from '../../types/IBooking';

const bookingFixture: IBooking = {
  id: 'ROUaGvmKTUR4p2wpxz_af',
  start: '2023-01-13T08:02:47.620Z',
  end: '2023-01-13T08:17:47.620Z',
  name: 'Réunion d\'urgence',
  userId: 'ylVc7xZwIdOp5R8kS2lSB',
};

describe('StatusRoom Component', () => {
  it('Test without current and next booking', async () => {
    render(<StatusRoom currentBooking={undefined} nextBooking={undefined} getBookings={() => []} />);

    screen.getByText('La salle est disponible');
  });

  it('Test currentBooking without next booking', async () => {
    render(<StatusRoom currentBooking={bookingFixture} nextBooking={undefined} getBookings={() => []} />);

    screen.getByText('Réunion Réunion d\'urgence se termine à 09:17');
    screen.getByText('Ajouter 10 minutes');
  });

  it('Test Next booking without current booking', async () => {
    render(<StatusRoom currentBooking={undefined} nextBooking={bookingFixture} getBookings={() => []} />);

    screen.getByText('Disponible jusqu\'à 09:02');
  });
});
