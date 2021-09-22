import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import CalendarDay from '../CalendarDay/CalendarDay';
import './timeline.scss';


interface TimelineProps{
  date: String;
  lstBooking: IBooking[];
}

const Timeline:FC<TimelineProps> = (props)=> {
  return (
   <div className="timeline-main">
     <div className="title-date">{props.date}</div>
        <CalendarDay lstBookings={props.lstBooking} heureMin={6} heureMax={22} />
   </div>   
 );
}

export default Timeline;