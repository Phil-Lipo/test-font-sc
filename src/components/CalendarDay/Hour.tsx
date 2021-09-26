import moment from 'moment';
import { FC } from 'react';
import { IBooking } from '../../types/IBooking';

interface HourProps{
  heure: number;
  lstBookingsByHour: IBooking[];
}

const Hour:FC<HourProps> = ({ heure, ...props }) => {
  const heures = Array.from(Array(12).keys());
  const checkIsBusy = (stepHour: number): boolean => {
    const timeStep = moment().hour(heure).minute(stepHour * 5);
    return props.lstBookingsByHour.findIndex((b) => timeStep.isBetween(moment(b.start.toString()), moment(b.end.toString()))) !== -1;
  };
  return (
    <div className="hour-main">
      <div className="label-heure">
        {heure + 1}
        H
      </div>
      <div className="step-container">
        {heures.map((stepHour) => (
          <div key={`step-${heure}-${stepHour}`} className={`step ${checkIsBusy(stepHour) ? 'bck-color-busy' : 'bck-color-available'}`} />
        ))}
      </div>

    </div>
  );
};

export default Hour;
