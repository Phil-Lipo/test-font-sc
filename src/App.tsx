import './App.scss';
import 'react-notifications-component/dist/theme.css';
import { FC, useEffect, useState } from 'react';
import moment from 'moment';
import ReactNotification from 'react-notifications-component';
import StatusRoom from './components/StatusRoom/StatusRoom';
import { IRessource } from './types/IRessource';
import { IBooking } from './types/IBooking';
import NextMeeting from './components/NextMeeting/NextMeeting';
import Reservation from './components/Reservation/Reservation';
import Timeline from './components/Timeline/Timeline';
import ApiService from './api/ApiService';
import useDate from './types/UseDate';
import DELAY_REFRESH from './constant';

const resourceDefault: IRessource = {
  id: '',
  name: '',
  minimumBookingDuration: 0,
  maximumBookingDuration: 0,
  bookingDurationStep: 0,
};

export const App:FC = () => {
  const apiService = ApiService.getInstance();
  const [ressource, setRessource] = useState<IRessource>(resourceDefault);
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<IBooking | undefined>();
  const [nextBooking, setNextBooking] = useState<IBooking | undefined>();
  const [startCheck, setStartCheck] = useState<boolean>(false);
  const { date, time } = useDate();

  const getBookings = async () => {
    await apiService.getBookings().then((res) => setBookings(res.data.data));
  };

  useEffect(() => {
    apiService.getRessource().then((res) => setRessource(res.data.data));
    apiService.getBookings().then((res) => setBookings(res.data.data));
    setStartCheck(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if ((currentBooking === undefined && nextBooking !== undefined && moment(nextBooking.start.toString()).isBefore(moment()))
      || (currentBooking !== undefined && moment(currentBooking?.end.toString()).isBefore(moment()))) {
        getBookings();
      }
    }, DELAY_REFRESH);

    return () => clearInterval(interval);
  }, [startCheck]);

  useEffect(() => {
    if (bookings.length >= 1) {
      const booking: IBooking[] = bookings.filter((b:IBooking) => moment(b.end.toString()).isAfter(moment()));
      if (booking.length >= 1) {
        // reunion en cours
        if (moment(booking[0].end.toString()).isAfter(moment()) && moment(booking[0].start.toString()).isBefore(moment())) {
          setCurrentBooking(booking[0]);
          if (booking.length > 1) {
            setNextBooking(booking[1]);
          } else {
            setNextBooking(undefined);
          }
        } else {
          // pas de reunion en cours
          setNextBooking(booking[0]);
          setCurrentBooking(undefined);
        }
      } else {
        // pas de reunion pendant ni apres
        setNextBooking(undefined);
        setCurrentBooking(undefined);
      }
    }
  }, [bookings]);

  return (
    <div className="App">
      <ReactNotification />
      <header className={`App-header ${currentBooking ? 'color-busy' : 'color-available'}`}>
        <div className="name-room">{ressource.name}</div>
        <div className="real-time">{time}</div>
      </header>
      <StatusRoom currentBooking={currentBooking} nextBooking={nextBooking} getBookings={getBookings} />
      <div className="corps">
        <div className="next-meeting-item"><NextMeeting nextBooking={nextBooking} /></div>
        <div className="reservation-item"><Reservation haveCurrentbooking={currentBooking !== undefined} room={ressource} nextBooking={nextBooking} getBookings={getBookings} /></div>
      </div>
      <div className="row timeline-content"><Timeline haveCurrentbooking={currentBooking !== undefined} lstBooking={bookings} date={date} /></div>
    </div>
  );
};

export default App;
