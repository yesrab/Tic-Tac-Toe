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
  const computerSymbol = player == "O" ? "X" : "O";
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
          setCurrentPlayer(computerSymbol);
        }
        return newSquares;
      });
    }
  };

  useEffect(() => {
    const isHumanTurn = squares.filter((square) => square !== null).length % 2 === 0;
    const doesNullExist = squares.includes(null);

    const findEmptyIndex = (indexes) => {
      if (indexes) {
        return indexes.find((index) => squares[index] === null);
      }
      return undefined;
    };

    const squence = (a, b, c) => {
      return WinnerPattern.filter((squareIndexes) => {
        const squareValues = squareIndexes.map((index) => squares[index]);
        return JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort());
      });
    };

    const humanWon = squence(player, player, player).length > 0;
    const computerWon =
      squence(computerSymbol, computerSymbol, computerSymbol).length > 0;
    const tie =
      !doesNullExist &&
      !humanWon &&
      !computerWon &&
      squares.filter((square) => square === null).length === 0;

    if (humanWon) {
      setScores((prev) => ({ ...prev, USER: prev.USER + 1 }));
      setGamestate(false);
      cpuPermission = false;
      handelModal("YOU WON", `${player} TAKES THE ROUND`);
    }
    if (computerWon) {
      setScores((prev) => ({ ...prev, CPU: prev.CPU + 1 }));
      setGamestate(false);
      handelModal("YOU LOST", `${computerSymbol} TAKES THE ROUND`);
    }

    if (tie) {
      setScores((prev) => ({ ...prev, TIE: prev.TIE + 1 }));
      handelModal("GAME TIE", "GAME TIED");
    }
    function CPUmove(index) {
      setTimeout(() => {
        let newSquares = squares;
        newSquares[index] = computerSymbol;
        setSquares([...newSquares]);
        setCurrentPlayer(player);
      }, 500);
    }
    if (!isHumanTurn && doesNullExist && cpuPermission && gameState) {
      const emptyIndexes = squares
        .map((square, index) => (square === null ? index : null))
        .filter((val) => val !== null);

      const CPUwinMove = squence(computerSymbol, computerSymbol, null);
      const blockHuman = squence(player, player, null);
      const attemptToWin = squence(computerSymbol, null, null);

      const winPosition = findEmptyIndex(CPUwinMove[0]);
      const blockPosition = findEmptyIndex(blockHuman[0]);
      const tryWinPosition = findEmptyIndex(attemptToWin[0]);

      if (winPosition !== undefined) {
        CPUmove(winPosition);
      } else if (blockPosition !== undefined) {
        CPUmove(blockPosition);
      } else if (tryWinPosition !== undefined) {
        CPUmove(tryWinPosition);
      } else {
        if (squares[4] === null) {
          CPUmove(4);
        } else {
          const randomIndex =
            emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
          CPUmove(randomIndex);
        }
      }
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
