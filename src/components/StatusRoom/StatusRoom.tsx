import moment from 'moment';
import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import './status-room.scss';


interface StatusRoomProps{
  currentBooking?: IBooking
  nextBooking?: IBooking
}

const StatusRoom:FC<StatusRoomProps> = ({currentBooking, nextBooking })=> {
  let libelle = "Disponible";
  if(currentBooking === undefined && nextBooking){
      libelle = `\n Disponible jusqu'à ${moment(nextBooking.start.toString()).format("HH:mm")}`;
  } else if(currentBooking) {
    libelle = `Reunion ${currentBooking.name} \n se termine à ${moment(currentBooking.end.toString()).format("HH:mm")}`;
  }

  return (
   <div className={`statusroom-main ${currentBooking ? "bck-color-busy" : "bck-color-available"}`}>
     <div className="zone-smiley"><i className={`${currentBooking ? "fas fa-comments icon-smiley" : "fas fa-smile-wink icon-smiley"}`}></i></div>
    <div className="zone-information"><div>{libelle}</div>
    {currentBooking && <div><button className="btn-add-time-meeting"><i className="fas fa-clock icon-btn"></i> <span>Ajouter 10 minutes à la réunion</span></button></div>}
   </div>
   </div>
   
 );
}

export default StatusRoom;