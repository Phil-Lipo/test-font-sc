import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import ApiService from '../../api/ApiService';
import { IBooking } from '../../types/IBooking';
import './next-meeting.scss';

interface NextMeetingProps{
  nextBooking: IBooking | undefined
}

const NextMeeting:FC<NextMeetingProps> = ({ nextBooking }) => {
  const apiService = ApiService.getInstance();
  const [auteur, setAuteur] = useState<string>('');
  useEffect(() => {
    if (nextBooking !== undefined) {
      apiService.getUserById(nextBooking?.userId).then((res) => setAuteur(res.data.data.name));
    }
  }, [nextBooking]);

  return (
    <div className="next-meeting-main">
      <h2 className="next-meeting-title">Prochaine réservation</h2>
      {nextBooking === undefined && <div className="no-booking">Aucune réunion de planifiée</div>}
      {nextBooking !== undefined && (
      <div className="new-meeting-info">
        {nextBooking?.name}
        <br />
        {`${moment(nextBooking?.start.toString()).format('HH:mm')} à ${moment(nextBooking?.end.toString()).format('HH:mm')} réservé par`}
        <br />
        {`${auteur}`}
        <br />
      </div>
      )}
    </div>
  );
};

export default NextMeeting;
