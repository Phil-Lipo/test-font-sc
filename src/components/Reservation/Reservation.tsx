import moment from 'moment';
import { FC, useState } from 'react';
import ApiService from '../../api/ApiService';
import { IBooking } from '../../types/IBooking';
import { IRessource } from '../../types/IRessource';
import './reservation.scss';

interface ReservationProps{
  room: IRessource;
  nextBooking: IBooking | undefined;
  haveCurrentbooking: boolean;
  getBookings: () => {};
}

// eslint-disable-next-line arrow-spacing
const Reservation:FC<ReservationProps> = ({ room, ...props })=> {
  const apiService = ApiService.getInstance();
  const [duration, setDuration] = useState<number>(10);
  const [name, setName] = useState<string>('');

  const addDuration = () => {
    const nextDuration = duration + room.bookingDurationStep;
    if (props.nextBooking) {
      if (moment().add(nextDuration, 'minutes').isBefore(moment(props.nextBooking.start.toString())) && nextDuration <= room.maximumBookingDuration) {
        setDuration(nextDuration);
      }
    } else if (nextDuration <= room.maximumBookingDuration) {
      setDuration(nextDuration);
    }
  };
  const removeDuration = () => {
    if (duration > room.minimumBookingDuration) {
      setDuration(duration - room.bookingDurationStep);
    }
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    apiService.postBooking({
      name,
      duration,
    }).then(() => {
      setDuration(room.minimumBookingDuration);
      setName('');
      props.getBookings();
    }).catch((err) => {
      console.log(err);
    });
  };

  return (
    <div className="reservation-main">
      <form onSubmit={handleSubmit}>
        <h2 className="reservation-main-title">Ajouter une réunion</h2>
        <div className="input-name">
          <input type="text" name="name" disabled={props.haveCurrentbooking} value={name} placeholder="Nom de votre réunion" onChange={(event) => { setName(event.target.value); }} />
        </div>
        <div> Temps de la réunion</div>
        <div className="input-duration">
          <button aria-label="Ajouter 5 minutes à la nouvelle réunion" disabled={props.haveCurrentbooking} onClick={addDuration} type="button" className="button-left">+</button>
          <button aria-label="Reduire de 5 minutes à la nouvelle réunion" onClick={removeDuration} type="button" disabled={props.haveCurrentbooking} className="button-right">-</button>
          {duration}
          {' '}
          minutes
          {' '}
        </div>
        <div className="button-send"><input aria-label="Valider l'ajout de la nouvelle réunion" disabled={props.haveCurrentbooking} type="submit" value="Ajouter" /></div>
      </form>
    </div>
  );
};

export default Reservation;
