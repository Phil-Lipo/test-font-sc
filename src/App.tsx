import './App.scss';
import StatusRoom from './components/StatusRoom/StatusRoom';
import { FC, useEffect, useState } from 'react' 
import { IToken } from './types/IToken';
import axios from 'axios';
import { IRessource } from './types/IRessource';
import { bookingDefault, IBooking } from './types/IBooking';
import moment from 'moment';
import NextMeeting from './components/NextMeeting/NextMeeting';
import Reservation from './components/Reservation/Reservation';


const resourceDefault: IRessource = {
  "id": "",
  "name": "",
  "minimumBookingDuration": 0,
  "maximumBookingDuration": 0,
  "bookingDurationStep": 0
}



const App:FC=()=> {
  const [token, setToken] = useState<IToken>({token: "", expirationDate: ""});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ressource,setRessource] = useState<IRessource>(resourceDefault);
  const [bookings,setBookings] = useState<IBooking[]>([]);
  const [currentBooking, setCurrentBooking] = useState<IBooking | undefined>();
  const [nextBooking, setNextBooking] = useState<IBooking | undefined>();
  
  useEffect( () => {
    axios.get(`http://localhost:4000/login`).then( res => {
        console.log(res.data.data);
        setToken(res.data.data);
      });
  }, []);

  useEffect(() =>{
    console.log("test");
   
    if(token.token !== ""){
      axios.get(`http://localhost:4000/resource`,{headers: { Authorization: `Bearer ${token.token}` }}).then( res => {
        console.log(res.data.data);
        setRessource(res.data.data);
      });
      axios.get(`http://localhost:4000/bookings`,{headers: { Authorization: `Bearer ${token.token}` }}).then( res => {
        console.log(res.data.data);
        setBookings(res.data.data);
      });
    }
  },[token]);
 
  useEffect(()=> {
      console.log("plop");
      if(bookings.length > 1) {
        const booking: IBooking[] = bookings.filter(( b:IBooking ) => moment(b.start.toString()).isAfter(moment()) && moment(b.end.toString()).isAfter(moment()) )
        
        console.log(booking);
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
    },[bookings])

  return (  
      <div className="App">
      <header className="App-header">{ressource.name}</header>
      <div className="row current-booking">
      <StatusRoom currentBooking={currentBooking} nextBooking={nextBooking}/></div>
      <div className="row corps">
      <div className="col-6 next-meeting-item"><NextMeeting nextBooking={nextBooking}/></div>
      <div className="col-3 reservation-item"><Reservation /></div>
      </div>
      
      <div className="row timeline">ici ce sera la timeline</div>
    </div>
  );
}

export default App;
