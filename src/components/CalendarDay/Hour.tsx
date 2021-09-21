import  { FC } from 'react';
//import './calendar-day.scss';


interface HourProps{
  heure: number;
  //nextBooking?: IBooking
}

const Hour:FC<HourProps> = (props)=> {


    const heures = Array.from(Array(6).keys());

  return (
   <div className="hour-main">
       <div className="label-heure">{props.heure+1}H</div>
       <div className="step-container">{heures.map((h) => {
         return (
           <div className="step bck-color-available" />
         );
      })}</div>
      
   </div>   
 );
}

export default Hour;