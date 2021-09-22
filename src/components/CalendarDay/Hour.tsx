import moment from 'moment';
import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';


interface HourProps{
  heure: number;
  statut: boolean;
  lstBookingsByHour: IBooking[];
}

const Hour:FC<HourProps> = (props)=> {


    const heures = Array.from(Array(12).keys());
    const checkIsBusy = (stepHour: number): boolean => {
        const timeStep = moment().hour(props.heure).minute(stepHour*5);
        return  props.lstBookingsByHour.findIndex(b => { return timeStep.isBetween(moment(b.start.toString()),moment(b.end.toString()));}) !== -1;
    };
  return (
   <div className="hour-main">
       <div className="label-heure">{props.heure+1}H</div>
       <div className="step-container">{heures.map((stepHour) => {
         return (
           <div key={`step-${props.heure}-${stepHour}`} className={`step ${checkIsBusy(stepHour) ? "bck-color-busy" : "bck-color-available" }`} />
         );
      })}</div>
      
   </div>   
 );
}

export default Hour;
