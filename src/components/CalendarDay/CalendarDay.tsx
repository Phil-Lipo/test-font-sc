import  { FC } from 'react';
import Hour from './Hour';
import './calendar-day.scss';
import { IBooking } from '../../types/IBooking';
import moment from 'moment';


interface CalendarDayProps{
    heureMin: number;
    heureMax: number;
    lstBookings: IBooking[];
}

const CalendarDay:FC<CalendarDayProps> = ({heureMin,heureMax,lstBookings})=> {

    const getBookingsFilter = (h: number): IBooking[] => {
      
      return lstBookings.filter(b => {return (moment(b.start.toString()).hour() <= h &&    moment(b.end.toString()).hour() >= h)});
    };

    return (
    <div className="calendar-day-main">
        { Array.from(Array.from(Array(heureMax-heureMin).keys()), x => x + heureMin).map((h) => {
          return (
            <Hour key={`hour-${h}`} heure={h}  statut={false} lstBookingsByHour={getBookingsFilter(h)} />
          );
        })}
    </div>   
  );
}

export default CalendarDay;