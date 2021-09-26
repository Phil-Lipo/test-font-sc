import moment from 'moment';
import { FC } from 'react';
import Hour from './Hour';
import './calendar-day.scss';
import { IBooking } from '../../types/IBooking';

interface CalendarDayProps{
    heureMin: number;
    heureMax: number;
    lstBookings: IBooking[];
}

const CalendarDay:FC<CalendarDayProps> = ({ heureMin, heureMax, lstBookings }) => {
  const getBookingsFilter = (h: number): IBooking[] => lstBookings.filter((b) => (moment(b.start.toString()).hour() <= h && moment(b.end.toString()).hour() >= h));

  return (
    <div className="calendar-day-main">
      { Array.from(Array.from(Array(heureMax - heureMin).keys()), (x) => x + heureMin).map((h) => (
        <Hour key={`hour-${h}`} heure={h} lstBookingsByHour={getBookingsFilter(h)} />
      ))}
    </div>
  );
};

export default CalendarDay;
