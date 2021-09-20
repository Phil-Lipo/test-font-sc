import moment from 'moment';
import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
//import './timeline.scss';


interface TimelineProps{
  date: String;
  nextBooking?: IBooking
}

const Timeline:FC<TimelineProps> = (props)=> {
  return (
   <div className="timeline-main">
        {props.date}
       emplacement pour la Timeline
   </div>   
 );
}

export default Timeline;