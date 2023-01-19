import moment from "moment";
import React, { useEffect, useState } from "react";
import "./Clock.css";

function Clock(): JSX.Element {
    const [date, setDate] = useState(new Date());
  
    function refreshClock() {
      setDate(new Date());
    }
    useEffect(() => {
      const timerId = setInterval(refreshClock, 1000);
      return function cleanup() {
        clearInterval(timerId);
      };
    }, []);
    
  
    return (
      <div className="Clock box1">
        {/* {date.toLocaleTimeString()} this is the current time with toLocaleTimeString */}
        {/* <br/> */}
        {moment(date).format("HH:mm:ss")} {/*this is the current time with moment.format("HH:mm:ss)*/}
      </div>
    );
}

export default Clock;
