import React, { useState, useEffect } from "react";
import LogoBox from "../components/LogoBox";
import TurnIndicator from "../components/TurnIndicator";
import ReloadBtn from "../components/ReloadBtn";
import InputSquare from "../components/InputSquare";
import ScoreWindow from "../components/ScoreWindow";
import Modal from "../components/Modal";
let winnerName = "";
let alertText = "";
const defaultSquares = () => new Array(9).fill(null);
const WinnerPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function PlayArea({ player }) {
  const [squares, setSquares] = useState(defaultSquares());
  const [curentPlayer, setCurrentPlayer] = useState(player);
  const [gameState, setGamestate] = useState(true);
  let cpuPermission = true;
  let humanPermission = true;

  const [scores, setScores] = useState(scoreRetreval());
  const [showModal, setShowModal] = useState(false);
  function scoreRetreval() {
    const scoretemplate = {
      CPU: 0,
      USER: 0,
      TIE: 0,
    };

    const savedScore = localStorage.getItem("savedScore");
    if (savedScore) {
      return JSON.parse(savedScore);
    } else {
      localStorage.setItem("savedScore", JSON.stringify(scoretemplate));
      return scoretemplate;
    }
  }

  const handelResetBtn = () => {
    winnerName = "";
    alertText = "Do you want to quit ?";
    setShowModal(true);
  };

  const handelModal = (gameStatus, Message) => {
    if (gameStatus === "YOU WON" || gameStatus === "YOU LOST") {
      winnerName = gameStatus;
      alertText = Message;
      setShowModal(true);
    } else if (gameStatus === "GAME TIE") {
      winnerName = "GAME TIE";
      alertText = "DO YOU WANT TO PLAY AGAIN?";
      setShowModal(true);
    }
  };

  const handelPlayerClick = (index) => {
    const humanTurn = squares.filter((square) => square !== null).length % 2 === 0;
    if (humanTurn && gameState) {
      setSquares((prevSquares) => {
        const newSquares = [...prevSquares];

        if (!newSquares[index]) {
          newSquares[index] = player;
          setCurrentPlayer(player == "O" ? "X" : "O");
        }
        return newSquares;
      });
    }
  };

  useEffect(() => {
    const computerSymbol = player == "O" ? "X" : "O";
    const CPUturn = squares.filter((square) => square !== null).length % 2 === 1;
    const doseNullExists = squares.includes(null);
    const squence = (a, b, c) => {
      return WinnerPattern.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
      });
    };

    const humanWon = squence(player, player, player).length > 0;
    const CPUwon = squence(computerSymbol, computerSymbol, computerSymbol).length > 0;
    const tie =
      !doseNullExists &&
      !humanWon &&
      !CPUwon &&
      squares.filter((square) => square === null).length === 0;

    if (humanWon) {
      // alert("user won");
      setScores((prev) => ({ ...prev, USER: prev.USER + 1 }));
      cpuPermission = false;
      handelModal("YOU WON", `${computerSymbol} TAKES THE ROUND`);
    }
    if (CPUwon) {
      // alert("cpu won");
      setScores((prev) => ({ ...prev, CPU: prev.CPU + 1 }));
      setGamestate(false);
      humanPermission = false;
      handelModal("YOU LOST", `${player} TAKES THE ROUND`);
    }

    if (tie) {
      // alert("no moves are possible TIE");
      setScores((prev) => ({ ...prev, TIE: prev.TIE + 1 }));
      humanPermission = false;
      cpuPermission = false;
      handelModal("GAME TIE", "GAME TIED");
    }
    if (CPUturn && doseNullExists && cpuPermission) {
      const emptyIndexes = squares
        .map((square, index) => (square === null ? index : null))
        .filter((val) => val !== null);
      const computerIndex =
        emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

      const cpuTimeoutID = setTimeout(() => {
        setSquares((prevSquares) => {
          const newSquares = [...prevSquares];
          newSquares[computerIndex] = computerSymbol;
          setCurrentPlayer(player);

          return newSquares;
        });
      }, 500);

      return () => clearTimeout(cpuTimeoutID);
    }
  }, [squares]);

  localStorage.setItem("savedScore", JSON.stringify(scores));

  return (
    <div className='GameContainer'>
      <div className='playGrid'>
        <LogoBox />
        <TurnIndicator player={curentPlayer} />
        <ReloadBtn onClick={handelResetBtn} />
        {squares.map((square, index) => (
          <InputSquare
            x={square === "X" ? 1 : 0}
            o={square === "O" ? 1 : 0}
            key={index + 1}
            onClick={() => {
              handelPlayerClick(index);
            }}
          />
        ))}
        <ScoreWindow score={scores.USER} player={player} title={"(YOU)"} />
        <ScoreWindow score={scores.TIE} color={"tie"} player={""} title={"TIES"} />
        <ScoreWindow
          score={scores.CPU}
          color={"cpu"}
          player={player == "O" ? "X" : "O"}
          title={"(CPU)"}
        />
      </div>
      {showModal && (
        <Modal
          alertText={alertText}
          winnerName={winnerName}
          setGamestate={setGamestate}
          setSquares={setSquares}
          setShowModal={setShowModal}
        />
      )}
    </div>
  );
}

export default PlayArea;
export { defaultSquares };
