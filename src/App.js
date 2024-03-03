import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPause, setPause] = useState(false);
  const [hours, setHours] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [timerid, setTimerId] = useState(0);

  const handleStart = () => {
    if (hours < 0 || minute < 0 || second <= 0) {
      alert("Invalid Input");
      return;
    } else {
      setIsStart(true);
    }
    
  };
  const handleResume = () => {
    setPause(false);
    runTimer(second, minute, hours);
  };

    const handlePause = () => {
      setPause(true);
      clearInterval(timerid);
    };
  
  const handleReset = () => {
    setIsStart(false);
    setHours(0);
    setMinute(0);
    setSecond(0);
    clearInterval(timerid);
  };
  const handleInput = (e) => {
    console.log(e.target.id, e.target.value);
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === "hours") {
      setHours(value);
    } else if (id === "minutes") {
      setMinute(value);
    } else {
      setSecond(value);
    }
  };

  console.log(hours, minute, second);

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSecond((s) => s - 1);
    } else if (sec === 0 && min > 0) {
      setMinute((m) => m - 1);
      setSecond(59);
    } else {
      setHours((h) => h - 1);
      setMinute(59);
      setSecond(59);
    }
    if (sec === 0 && min === 0 && hr === 0) {
      setHours(0);
      setMinute(0);
      setSecond(0);
      clearInterval(tid);
      alert("Timer is finished");
    }
  };
  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(second, minute, hours, tid);
      }, 1000);
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    };
  }, [isStart, hours, minute, second]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {!isStart && (
        <div className="input-container">
          <div className="input-box">
            <input onChange={handleInput} id="hours" placeholder="HH" />
            <input onChange={handleInput} id="minutes" placeholder="MM" />
            <input onChange={handleInput} id="seconds" placeholder="SS" />
          </div>
          <button onClick={handleStart} className="timer-button">
            Start{" "}
          </button>
        </div>
      )}
      {isStart && (
        <div className="show-container">
          <div className="timer-box">
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minute < 10 ? `0${minute}` : minute}</div>
            <span>:</span>
            <div>{second < 10 ? `0${second}` : second}</div>
          </div>
          <div className="action-box">
            {!isPause &&<button onClick={handlePause} className="timer-button" >
                Pause
              </button>
            }
            {isPause && (
              <button className="timer-button" onClick={handleResume}>
                Resume
              </button>
            )}
            <button className="timer-button" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
