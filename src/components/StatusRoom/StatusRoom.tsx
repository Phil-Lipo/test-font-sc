import moment from 'moment';
import { FC, useEffect, useState } from 'react';
import { store } from 'react-notifications-component';
import ApiService from '../../api/ApiService';
import { IBooking } from '../../types/IBooking';
import './status-room.scss';
import ButtonDefault from '../UI/Button/ButtonDefault';

interface StatusRoomProps{
  currentBooking: IBooking | undefined;
  nextBooking: IBooking | undefined;
  getBookings: () => {};
}

const StatusRoom:FC<StatusRoomProps> = ({ currentBooking, nextBooking, getBookings }) => {
  const apiService = ApiService.getInstance();
  const [isSameAuteur, setIsSameAuteur] = useState<boolean>(false);

  useEffect(() => {
    if (currentBooking !== undefined) {
      apiService.getUserMe().then((res) => setIsSameAuteur(currentBooking.userId === res.data.data.id));
    }
  }, [currentBooking]);

  const cancelBooking = () => {
    if (currentBooking) {
      apiService.deleteBooking(currentBooking?.id).then(() => {
        getBookings();
      });
    }
  };
  const snoozeBooking = () => {
    store.addNotification({
      title: 'PAS SI VITE',
      message: 'Cette fonctionnalité est en cours de développement.',
      type: 'info',
      container: 'top-right',
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });
  };

  let libelle = 'La salle est disponible';
  if (currentBooking === undefined && nextBooking) {
    libelle = `\n Disponible jusqu'à ${moment(nextBooking.start.toString()).format('HH:mm')}`;
  } else if (currentBooking) {
    libelle = `Réunion ${currentBooking.name} \n se termine à ${moment(currentBooking.end.toString()).format('HH:mm')}`;
  }

  return (
    <div className={`statusroom-main ${currentBooking ? 'bck-color-busy' : 'bck-color-available'}`}>
      <div className="zone-smiley"><i aria-hidden="true" className={`${currentBooking ? 'fas fa-comments icon-smiley' : 'fas fa-smile-wink icon-smiley'}`} /></div>
      <div className="zone-information">
        {libelle}
        {currentBooking && (
        <div className="zone-button">
          <ButtonDefault
            disabled
            aria-label="Ajouter 10 minutes à la reunion en cours"
            onClick={snoozeBooking}
            logo={<i aria-hidden="true" className="fas fa-clock icon-btn" />}
            label="Ajouter 10 minutes"
          />
          {isSameAuteur && (
            <ButtonDefault
              onClick={cancelBooking}
              aria-label="Annuler la réunion"
              label="Annuler"
              logo={<i aria-hidden="true" className="fas fa-times-circle  icon-btn" />}
            />
          )}
        </div>
        )}
      </div>
    </div>

  );
};

export default StatusRoom;
