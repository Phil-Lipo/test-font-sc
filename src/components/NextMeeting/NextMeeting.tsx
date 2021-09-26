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
      {nextBooking === undefined && <div className="next-meeting-main lh30">Aucune réunion de planifiée</div>}
      {nextBooking !== undefined && (
      <div className="next-meeting-main">
        {nextBooking?.name}
        <br />
        {moment(nextBooking?.start.toString()).format('HH:mm')}
        {' '}
        -
        {moment(nextBooking?.end.toString()).format('HH:mm')}
        <br />
        Réservé par
        {' '}
        {auteur}
        <br />
      </div>
      )}
    </div>
  );
};

export default NextMeeting;
