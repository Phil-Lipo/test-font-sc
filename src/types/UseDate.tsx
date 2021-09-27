import moment from 'moment';
import 'moment/locale/fr';
import React from 'react';

const useDate = () => {
  const [today, setDate] = React.useState(moment());
  React.useEffect(() => {
    const timer = setInterval(() => {
      setDate(moment());
    }, 60 * 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  const time = today.format('HH:mm');
  const dateWithoutUpperCase = today.format('dddd D MMMM YYYY');
  const date = dateWithoutUpperCase.charAt(0).toUpperCase() + dateWithoutUpperCase.slice(1);

  return {
    date,
    time,
  };
};

export default useDate;
