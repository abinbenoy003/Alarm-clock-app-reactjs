import React, { useState, useEffect } from 'react';
import './App.css';


const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState('');
  const [alarmSet, setAlarmSet] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (alarmSet) {
      const alarmDate = new Date(alarmTime);
      // console.log(currentTime + ' ' + alarmTime)
      const checkAlarm = () => {
        if (currentTime.getHours() === alarmDate.getHours() &&
            currentTime.getMinutes() === alarmDate.getMinutes()) {
          setNotification('Alarm ringing!');
          alert('Alarm')
          setAlarmSet(false);
        }
      };

      checkAlarm();
    }
  }, [currentTime, alarmTime, alarmSet]);

  const handleSetAlarm = () => {
    setAlarmSet(true);
    setNotification('');
  };

  const handleChange = (e) => {
    setAlarmTime(e.target.value);
    console.log(alarmTime)
  };

  return (
    <div className="App">
      <h1><u>Alarm Clock</u></h1>
      <h3>Current time:</h3>
      <div className="clock">
        <p><h2>{currentTime.toLocaleTimeString()}</h2></p>
        </div>
        <div className="textAndButton">
        <input
          type="time"
          value={alarmTime}
          onChange={handleChange}
        />
        <button className="button" onClick={handleSetAlarm}>Set Alarm</button>
        </div>
      {alarmSet && <p className="notification">Alarm set for {alarmTime}</p>}
      {notification && <p className="notification">{notification}</p>}
    </div>
  );
};

export default App;
