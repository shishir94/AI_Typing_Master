import React, { useEffect, useRef, useState } from 'react';

export default function Timer({ onTimerExpire, onStart }) {
  const [timer, setTimer] = useState("00:00:59");
  const Ref = useRef(null);

  function getTimeRemaining(e) {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    return { total, hours, minutes, seconds };
  }

  function startTimer(e) {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds)
      );
    } else {
      clearInterval(Ref.current);
      onTimerExpire();
    }
  }

  function clearTimer(e) {
    setTimer("00:00:59");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  }

  function getDeadTime() {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 59);
    return deadline;
  }

  const start = () => {
    clearTimer(getDeadTime());
    onStart();
  };

  useEffect(() => {
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  return (
    <div className="timer">
      <h3>{timer}</h3>
      <div className="button">
        <button className="btn btn-primary" onClick={start}>
          Start Timer
        </button>
      </div>
    </div>
  );
}
