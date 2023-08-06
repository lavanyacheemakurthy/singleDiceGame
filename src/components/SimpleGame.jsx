import "../styles.css";
import { useEffect, useState } from "react";
import Dice from "react-dice-roll";
import ConfettiPop from "../common/ConfettiPop";
const betForpositionsInitialObj = {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0
};
export default function App() {
  const [balance, setBalance] = useState(100);
  const [rolledDiceValue, setRolledDiceValue] = useState(0);
  const [celebrateConfettiCount, setCelebrateConfettiCount] = useState(0);
  const [betForPosition, setBetForPosition] = useState(
    betForpositionsInitialObj
  );
  const [rollCount, setRollCount] = useState(0);

  const adjustBalance = (face, prev, latest) => {
    let diff = latest - prev;

    if (balance - diff < 0) {
      alert("You dont have sufficient balance. Enter different amount.");
      setBetForPosition({
        ...betForPosition,
        [face]: prev
      });
    } else {
      setBalance(balance - diff);
    }
  };
  useEffect(() => {
    if (betForPosition[rolledDiceValue] > 0) {
      setCelebrateConfettiCount(celebrateConfettiCount + 1);
      setBalance(balance + betForPosition[rolledDiceValue] * 2);
    }
  }, [betForPosition, rolledDiceValue]);

  return (
    <div className="container">
      {console.log(betForPosition)}
      <div className="game-title">{`Play a DICE`}</div>
      <div className="game-section">
        <div className="dice-position-bet-label">
          <div>{`Enter bet amounts for dice position you want to bet`}</div>
          <div>{`You have $${balance}`}</div>
        </div>
        <div className="dice-positons-bet">
          {Object.keys(betForPosition).map((x) => {
            return (
              <div className="dice-bet-div">
                <Dice
                  disabled
                  onRoll={(value) =>
                    setBetForPosition({ ...betForPosition, [x]: value })
                  }
                  defaultValue={x}
                  size={100}
                  rollingTime={500}
                />
                <div className="bet-amount">
                  $
                  <input
                    type="number"
                    value={betForPosition[x]}
                    onChange={(e) => {
                      setBetForPosition({
                        ...betForPosition,
                        [x]: +e.target.value
                      });
                      adjustBalance(x, betForPosition[x], +e.target.value);
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="to-roll-div">
          <div className="to-roll-div-label">Click on below dice to roll</div>
          <div className="to-roll-div-dice">
            <Dice
              disabled={rollCount === 10}
              onRoll={(value) => {
                setRollCount(rollCount + 1);
                setRolledDiceValue(value);
              }}
              defaultValue={rolledDiceValue}
              size={150}
              rollingTime={500}
            />
          </div>

          <div className="to-roll-div-label">{`Last rolled face value : ${rolledDiceValue}`}</div>
          <div style={{ fontSize: "12px" }}>
            (You are left with {5 - rollCount} turns)
          </div>
          {rollCount === 5 && (
            <div>
              <div style={{ fontSize: "30px", color: "green" }}>
                {balance > 100 && (
                  <div>End of game! You won ${`${-100 + balance}`}</div>
                )}
                {balance <= 100 && (
                  <div>End of game! You loose ${`${100 - balance}`}</div>
                )}
              </div>
              <button
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer"
                }}
                onClick={() => window.location.reload()}
              >
                Re-start game
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="confetti-section">
        <ConfettiPop celebrateConfettiCount={celebrateConfettiCount} />
      </div>
    </div>
  );
}
