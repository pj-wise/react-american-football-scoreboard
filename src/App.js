//TODO: STEP 1 - Import the useState hook.
import React, { useState, useEffect } from "react"; //import useState
import "./App.css";
import BottomRow from "./BottomRow";
import soundFile from "./assets/air-horn-club-sample_1.mp3";

function App() {
  //TODO: STEP 2 - Establish your applictaion's state with some useState hooks.  You'll need one for the home score and another for the away score.

  //home
  const [homeTeam, setHome] = useState("Raiders");
  const [homeScore, setHomeScore] = useState(0);
  //away
  const [awayTeam, setAway] = useState("Bears");
  const [awayScore, setAwayScore] = useState(0);

  //quarter
  const [quarter, setQuarter] = useState(1);

  //timer
  const gameTime = 30;
  const [time, setTimer] = useState(gameTime);
  const [timeOn, setTimeOn] = useState(false);
  const [playedSound, setPlayedSound] = useState(false);

  const [playSound, setPlaySound] = useState(0);

  const quarterFunc = () => {
    if (quarter < 4) {
      setQuarter(quarter + 1);
    } else setQuarter(1);
  };

  const toggle = () => {
    setTimeOn(!timeOn);
  };

  useEffect(() => {
    let interval = null;
    if (timeOn && time >= 1) {
      interval = setInterval(() => {
        setTimer(seconds => seconds - 1);
      }, 1000);
    } else if (!timeOn && time !== 0) {
      clearInterval(interval);
    } else if (time === 0) {
      if (!playedSound) {
        setPlayedSound(true);
        setPlaySound(!playSound);
        toggle();
        setTimeout(() => {
          setTimer(gameTime);
        }, 1000);
      }
    }
    return () => {
      clearInterval(interval);
    };
  }, [timeOn, time]);

  return (
    <div className='container'>
      <section className='scoreboard'>
        <h2 className='time_name'>Time</h2>
        <div className='topRow'>
          <div className='home'>
            <h2 className='home__name'>{homeTeam}</h2>

            {/* TODO STEP 3 - We need to change the hardcoded values in these divs to accept dynamic values from our state. */}

            <div className='home__score'>{homeScore}</div>
          </div>

          <div className='time'>
            <div className='timer'>{time}</div>
            {/* <div className='timer'>{time}</div>
            <div className='timer'>{time}</div>
            <div className='timer'>{time}</div> */}
          </div>

          <div className='away'>
            <h2 className='away__name'>{awayTeam}</h2>
            <div className='away__score'>{awayScore}</div>
          </div>
        </div>
        <BottomRow quarter={quarter} />
      </section>
      <section className='buttons'>
        <div className='homeButtons'>
          {/* TODO STEP 4 - Now we need to attach our state setter functions to click listeners. */}
          {/* - A touchdown is worth 7 points (assume the following extra point is made) - A field goal is worth 3 points */}

          {/* <HomeTouchBtn homeScore={}/> */}

          <button
            className='homeButtons__touchdown'
            onClick={event => setHomeScore(homeScore + 7)}>
            Home Touchdown
          </button>

          <button
            className='homeButtons__fieldGoal'
            onClick={event => setHomeScore(homeScore + 3)}>
            Home Field Goal
          </button>
        </div>
        <div className='awayButtons'>
          <button
            className='awayButtons__touchdown'
            onClick={event => setAwayScore(awayScore + 7)}>
            Away Touchdown
          </button>
          <button
            className='awayButtons__fieldGoal'
            onClick={event => setAwayScore(awayScore + 3)}>
            Away Field Goal
          </button>
        </div>
        <button className='quarter-btn' onClick={() => quarterFunc()}>
          Change Quarter
        </button>
        <button className='quarter-btn' onClick={toggle}>
          {!timeOn ? "Start Timer" : "Stop Timer"}
        </button>
      </section>
      <div>
        <button className='soundBtn' onClick={() => setPlaySound(!playSound)}>
          HORN
        </button>
        {playSound ? <audio src={soundFile} autoPlay /> : null}
      </div>
    </div>
  );
}

export default App;
