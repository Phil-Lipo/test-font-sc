import moment from "moment";
import 'moment/locale/fr';
import React from "react";

export const useDate = () => {
    const [today, setDate] = React.useState(moment());
    React.useEffect(() => {
        const timer = setInterval(() => { 
        setDate(moment());
      }, 60 * 1000);
      return () => {
        clearInterval(timer);
      }
    }, []);
    const time = today.format('HH:mm');
    const date = today.format('dddd D MMMM YYYY');
  
    return {
      date,
      time,
    };
  };