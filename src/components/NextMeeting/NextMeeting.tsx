import moment from 'moment';
import  { FC } from 'react';
import { IBooking } from '../../types/IBooking';
import './next-meeting.scss';


interface NextMeetingProps{
  nextBooking?: IBooking
}




const NextMeeting:FC<NextMeetingProps> = (props)=> {
  return (
   <div className="next-meeting-main">
    {props.nextBooking?.name}<br/>
    {moment(props.nextBooking?.start.toString()).format("HH:mm")} - {moment(props.nextBooking?.end.toString()).format("HH:mm")}<br/>
    Réservé par {props.nextBooking?.userId}<br/>
   </div>
 );
}

export default NextMeeting;