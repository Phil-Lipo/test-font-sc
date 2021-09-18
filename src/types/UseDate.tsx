import moment from "moment";
import React from "react";

export const useDate = () => {
    const locale = 'en';
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
    const date = 'plop';
  
    return {
      date,
      time,
    };
  };