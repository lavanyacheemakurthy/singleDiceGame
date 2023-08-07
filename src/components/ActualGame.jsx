import ".././styles.css";
import { useEffect, useRef, useState, lazy, Suspense } from "react";

import Dice from "react-dice-roll";

import Loading from "../icons/Loading";
import ConfettiPop from "../common/ConfettiPop";
const Banner = lazy(() => import("../common/Banner"));

const Restartgame = lazy(() => import("./RestartGame"));

// consts
const betForpositionsInitialObj = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};

// Comp
export default function App() {
  //state
  const [balance, setBalance] = useState(100);
  const [rolledDiceValue, setRolledDiceValue] = useState(0);
  const [celebrateConfettiCount, setCelebrateConfettiCount] = useState(0);
  const [betForPosition, setBetForPosition] = useState(
    betForpositionsInitialObj
  );
  const [rollCount, setRollCount] = useState(0);
  const [disableSettingBets, setDisableSettingBets] = useState(false);
  const [winnerSelectionDiceDisable, setWinnerSelectionDiceDisable] = useState(
    true
  );
  const [displayWinnerBanner, setDisplayWinnerBanner] = useState(false);
  const [isTimerOn, setIsTimerOn] = useState(false);
  const [timerValueInDisplay, setTimerValueInDisplay] = useState(10);
  const [intravalLocal, setIntravalLocal] = useState(null);
  const [waitingForWinnerSelection, setWaitingForWinnerSelection] = useState(
    false
  );

  // ref for winner determination dice
  const winnerDiceRef = useRef(null);

  // functions
  const funcToCallEverySec = () => {
    setTimerValueInDisplay((timerValueInDisplay) => timerValueInDisplay - 1);
  };
  const findWinner = () => {
    setWinnerSelectionDiceDisable(false);
  };
  //effects
  useEffect(() => {
    if (betForPosition[rolledDiceValue] > 0) {
      setCelebrateConfettiCount(
        (celebrateConfettiCount) => celebrateConfettiCount + 1
      );
      setDisplayWinnerBanner(true);
      setBalance((balance) => balance + betForPosition[rolledDiceValue] * 2);
    }
  }, [betForPosition, rolledDiceValue]);
  useEffect(() => {
    if (isTimerOn) {
      setTimerValueInDisplay(10);
      let intravalToClear = setInterval(funcToCallEverySec, 1000);
      setIntravalLocal(intravalToClear);
    } else if (!isTimerOn) {
      clearInterval(intravalLocal);
    }
  }, [isTimerOn]);
  useEffect(() => {
    if (displayWinnerBanner) {
      setTimeout(() => {
        setDisplayWinnerBanner(false);
      }, 5000);
    }
  }, [displayWinnerBanner]);
  useEffect(() => {
    setTimeout(() => {
      if (!winnerSelectionDiceDisable) {
        winnerDiceRef &&
          winnerDiceRef.current &&
          winnerDiceRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 500);
  }, [winnerSelectionDiceDisable]);
  // JSX
  return (
    <div className="container">
      {console.log(betForPosition)}

      <div className="game-section">
        <div className="dice-position-bet-label">
          <div>{`Enter bet amounts for dice position you want to bet`}</div>
          <div>{`You have : $${balance}`}</div>
        </div>
        {isTimerOn && timerValueInDisplay > 0 && (
          <div style={{ textAlign: "center", height: "40px" }}>
            You are left with{" "}
            <span
              style={
                timerValueInDisplay > 3
                  ? {
                      // color: "rgb(89,128,59)",
                      backgroundColor: "green",
                      color: "white",
                      borderRadius: "20px",
                      padding: "0 10px"
                    }
                  : {
                      // color: "red",
                      backgroundColor: "red",
                      color: "white",
                      fontSize: "20px",
                      borderRadius: "20px",
                      padding: "0 10px"
                    }
              }
            >
              {timerValueInDisplay - 1} sec{" "}
            </span>{" "}
            to click dice !
          </div>
        )}

        <div className="dice-positons-bet">
          {new Array(6).fill(1).map((i, x) => {
            return (
              <div className="dice-bet-div">
                <Dice
                  disabled={!isTimerOn}
                  triggers={["click", "focus", "onTouchStart"]} // applicable triggers
                  onRoll={(value) =>
                    setBetForPosition({
                      ...betForPosition,
                      [x + 1]: betForPosition[x + 1] + 1
                    })
                  }
                  defaultValue={x + 1}
                  cheatValue={x + 1}
                  size={100}
                  rollingTime={100}
                />
                <div className="bet-amount">$ {betForPosition[x + 1]}</div>
              </div>
            );
          })}
        </div>
        <div className="timer-set-section">
          <button
            disabled={disableSettingBets}
            className="timer-set-section-button"
            onClick={() => {
              setIsTimerOn(true);
              setTimeout(() => {
                setIsTimerOn(false);
                setIntravalLocal(null);
                setDisableSettingBets(true);
                setWaitingForWinnerSelection(true);
                setTimeout(() => {
                  findWinner();
                  setWaitingForWinnerSelection(false);
                }, 2000);
              }, 10000);
            }}
          >
            Set Bets
          </button>
        </div>
        {waitingForWinnerSelection && (
          <div>
            <Loading />
          </div>
        )}
        {!winnerSelectionDiceDisable && (
          <div className="to-win-roll-div">
            <div className="to-win-roll-div-title">
              Roll below dice to find winner!
            </div>
            <div className="to-win-roll-div-dice" ref={winnerDiceRef}>
              <Dice
                disabled={winnerSelectionDiceDisable}
                onRoll={(value) => {
                  setRollCount(rollCount + 1);
                  setRolledDiceValue(value);
                  setTimeout(() => {
                    // allow not to click for winner multiple times
                    // mocked to hide after 3 sec
                    setWinnerSelectionDiceDisable(true);
                  }, 3000);
                }}
                defaultValue={rolledDiceValue}
                size={150}
                rollingTime={500}
              />
            </div>
          </div>
        )}
      </div>
      {displayWinnerBanner && (
        <div style={{ position: "relative" }}>
          <Banner>{`Winner : ${rolledDiceValue}`}</Banner>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >
            <div style={{ textAlign: "center" }}>
              You won ${`${balance - 100}`}
            </div>
            <Suspense fallback={<Loading />}>
              <Restartgame />
            </Suspense>
          </div>
        </div>
      )}
      <div className="confetti-section">
        <ConfettiPop celebrateConfettiCount={celebrateConfettiCount} />
      </div>
    </div>
  );
}
