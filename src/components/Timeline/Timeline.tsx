import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import CalendarDay from '../CalendarDay/CalendarDay';
import './timeline.scss';


interface TimelineProps{
  date: String;
  haveCurrentbooking: boolean;
  lstBooking: IBooking[];
}

const Timeline:FC<TimelineProps> = ({date,haveCurrentbooking,lstBooking})=> {
  return (
   <div className="timeline-main">
     <div className={`title-date ${haveCurrentbooking ? "color-busy" : "color-available" }`}>{date}</div>
        <CalendarDay lstBookings={lstBooking} heureMin={6} heureMax={22} />
   </div>   
 );
}

export default Timeline;