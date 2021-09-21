import  { FC } from 'react';
import Hour from './Hour';
import './calendar-day.scss';


interface CalendarDayProps{
    heureMin: number;
    heureMax: number;
  //date: String;
  //nextBooking?: IBooking
}

const CalendarDay:FC<CalendarDayProps> = ({heureMin,heureMax})=> {



  return (
   <div className="calendar-day-main">
       { Array.from(Array.from(Array(heureMax-heureMin).keys()), x => x + heureMin).map((h) => {
         return (
           <Hour heure={h}/>
         );
      })}
   </div>   
 );
}

export default CalendarDay;