import { render, screen } from '@testing-library/react';
import { IBooking } from '../../types/IBooking';
import NextMeeting from './NextMeeting';

const bookingFixture: IBooking = {
  id: 'ROUaGvmKTUR4p2wpxz_af',
  start: '2023-01-13T08:02:47.620Z',
  end: '2023-01-13T08:17:47.620Z',
  name: 'Réunion d\'urgence',
  userId: 'ylVc7xZwIdOp5R8kS2lSB',
};

describe('NextMeeting Component', () => {
  it('Test without next booking', async () => {
    render(<NextMeeting nextBooking={undefined} />);

    screen.getByText('Prochaine réservation');
    screen.getByText('Aucune réunion de planifiée');
  });

  it('Test with next booking', async () => {
    render(<NextMeeting nextBooking={bookingFixture} />);

    screen.getByText('Prochaine réservation');
  });
});
