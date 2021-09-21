import moment from 'moment';
import  { FC, useState } from 'react';
import { ApiService } from '../../ApiService';
import { IBooking } from '../../types/IBooking';
import { IRessource } from '../../types/IRessource';
import NextMeeting from '../NextMeeting/NextMeeting';
import './reservation.scss';


interface ReservationProps{
  room: IRessource;
  nextBooking?: IBooking;
  getBookings: () => {};
}

const Reservation:FC<ReservationProps> = ({room, ...props})=> {
  const apiService = ApiService.getInstance();
  const [duration,setDuration] = useState<number>(0);

  const addDuration = () => {
    const nextDuration = duration + room.bookingDurationStep;
    if((moment().add(nextDuration, "minutes").isBefore(moment(props.nextBooking?.start.toString()))) && nextDuration <= room.maximumBookingDuration ) {
      setDuration(nextDuration);
    }
  }
  const removeDuration = () => {
    if(duration > 0){
      setDuration(duration - room.bookingDurationStep);
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    apiService.postBooking({
      name: "phil-test",
      duration: duration
    }).then((res) => {
      props.getBookings();
    }).catch((err) => {
        console.log(err);
    });
  }


  return (
   <div className="reservation-main">
     <form onSubmit={handleSubmit}>
     <div className="title">Ajouter une réunion</div>
      <div className="input-name"><input type="text" name="name" placeholder="Nom de la réunion"/></div>
      <div> Temps de la réunion en minutes </div>
      <div className="input-duration"><button onClick={addDuration} type='button' className="button-left">+</button>{duration} minutes <button onClick={removeDuration}  type='button' className="button-right" >-</button></div>
      <div className="button-send"><input type="submit" value="Ajouter" /></div>
    </form>
   </div>   
 );
}

export default Reservation;