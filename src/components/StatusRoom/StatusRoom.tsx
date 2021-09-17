import moment from 'moment';
import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import './status-room.scss';


interface StatusRoomProps{
  currentBooking?: IBooking
  nextBooking?: IBooking
}

const StatusRoom:FC<StatusRoomProps> = (props)=> {
  let libelle = "Disponible";
  if(props.currentBooking === undefined && props.nextBooking){
      libelle = `Disponible jusqu'à ${moment(props.nextBooking.start.toString()).format("HH:mm")}`;
  } else if(props.currentBooking) {
    libelle = "Reunion en cours";
  }

  
  return (
   <div className="statusroom-main">
  {libelle}
   </div>
   
 );
}

export default StatusRoom;