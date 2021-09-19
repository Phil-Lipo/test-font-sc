import moment from 'moment';
import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import './next-meeting.scss';


interface NextMeetingProps{
  nextBooking?: IBooking
}




const NextMeeting:FC<NextMeetingProps> = ({nextBooking})=> {


  return (
    <div>
      {nextBooking === undefined && <div  className="next-meeting-main lh30" >Aucune réunion de planifiée</div>}
      {nextBooking !== undefined && <div className="next-meeting-main">
      {nextBooking?.name}<br/>
      {moment(nextBooking?.start.toString()).format("HH:mm")} - {moment(nextBooking?.end.toString()).format("HH:mm")}<br/>
      Réservé par Paul Astreide<br/>
    </div>}
   </div>
 );
}

export default NextMeeting;