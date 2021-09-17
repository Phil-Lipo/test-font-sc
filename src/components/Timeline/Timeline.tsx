import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
//import './timeline.scss';


interface TimelineProps{
  nextBooking?: IBooking
}

const Timeline:FC<TimelineProps> = (props)=> {
  return (
   <div className="timeline-main">
       emplacement pour la Timeline
   </div>   
 );
}

export default Timeline;