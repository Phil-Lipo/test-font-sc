import './App.scss';
import StatusRoom from './components/StatusRoom/StatusRoom';
import { FC, useEffect, useState } from 'react' 
import { IRessource } from './types/IRessource';
import { IBooking } from './types/IBooking';
import moment from 'moment';
import NextMeeting from './components/NextMeeting/NextMeeting';
import Reservation from './components/Reservation/Reservation';
import Timeline from './components/Timeline/Timeline';
import { ApiService } from './ApiService';
import { useDate } from './types/UseDate';


const resourceDefault: IRessource = {
  "id": "",
  "name": "",
  "minimumBookingDuration": 0,
  "maximumBookingDuration": 0,
  "bookingDurationStep": 0
}



const App:FC=()=> {
  const apiService = ApiService.getInstance();
  const [ressource,setRessource] = useState<IRessource>(resourceDefault);
  const [bookings,setBookings] = useState<IBooking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<IBooking | undefined>();
  const [nextBooking, setNextBooking] = useState<IBooking | undefined>();
  const [startCheck, setStartCheck] = useState<boolean>(false);
  const {date, time } = useDate();
  
  const DELAY_REFRESH = 300000; // 5 minutes
  
  useEffect(() => {
        apiService.getRessource().then( res => setRessource(res.data.data));
        apiService.getBookings().then(res => setBookings(res.data.data));
        setStartCheck(true);
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if((currentBooking === undefined && moment(nextBooking?.start.toString()).isBefore(moment())) || 
      (currentBooking !== undefined && moment(currentBooking?.end.toString()).isBefore(moment()))) {
        apiService.getBookings().then(res => setBookings(res.data.data));
      }
    }, DELAY_REFRESH);

    return () => clearInterval(interval);
  }, [startCheck])

  
 
  useEffect(()=> {
      if(bookings.length > 1) {
        const booking: IBooking[] = bookings.filter(( b:IBooking ) => moment(b.end.toString()).isAfter(moment()) )
        
        console.log(booking)
        if(booking.length >= 1) {
          // reunion en cours
          if(moment(booking[0].end.toString()).isAfter(moment()) && moment(booking[0].start.toString()).isBefore(moment())){
          setCurrentBooking(booking[0]);
          if(booking.length > 1) {
            setNextBooking(booking[1]);
          }else{
            setNextBooking(undefined);     
          }
        }else{
          // pas de reunion en cours
          setNextBooking(booking[0])
          setCurrentBooking(undefined)
        }
      }else{
        // pas de reunion pendant ni apres
        setNextBooking(undefined);
        setCurrentBooking(undefined);
      }
    }
    },[bookings]);

  return (  
      <div className="App">
      <header className="App-header"><div className="name-room">{ressource.name}</div><div>{time}</div></header>
      <div className="row current-booking">
      <StatusRoom currentBooking={currentBooking} nextBooking={nextBooking}/></div>
      <div className="row corps">
        <div className="col-6 next-meeting-item"><NextMeeting nextBooking={nextBooking}/></div>
        <div className="col-3 reservation-item"><Reservation /></div>
      </div>
      <div className="row timeline"><Timeline /></div>
    </div>
  );
}

export default App;
