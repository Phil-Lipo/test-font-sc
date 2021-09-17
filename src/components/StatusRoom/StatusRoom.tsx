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
    libelle = `Reunion en cours terminant à ${moment(props.currentBooking.end.toString()).format("HH:mm")}`;
  }

  
  return (
   <div className="statusroom-main">
  {libelle}<br/>
  {props.currentBooking && <button className="btn-add-time-meeting"><i className="fas fa-clock icon-btn"></i> <span>Ajouter 10 minutes à la réunion</span></button>}
   </div>
   
 );
}

export default StatusRoom;