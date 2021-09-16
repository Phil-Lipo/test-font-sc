import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import './reservation.scss';


interface ReservationProps{
  nextBooking?: IBooking
}

const Reservation:FC<ReservationProps> = (props)=> {
  return (
   <div className="reservation-main">
       nouvelle reservation
   </div>   
 );
}

export default Reservation;