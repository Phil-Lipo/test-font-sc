import { renderHook } from '@testing-library/react-hooks';
import moment from 'moment';
import useDate from './UseDate';

describe('useDate', () => {
  it('get Date label', async () => {
    const { result } = renderHook(() => useDate());
    const dateWithoutUpperCase = moment().format('dddd D MMMM YYYY');
    const dateFinal = dateWithoutUpperCase.charAt(0).toUpperCase() + dateWithoutUpperCase.slice(1);

    expect(result.current.date).toEqual(dateFinal);
  });
  it('get Time label', async () => {
    const { result } = renderHook(() => useDate());
    const time = moment().format('HH:mm');

    expect(result.current.time).toEqual(time);
  });
});
