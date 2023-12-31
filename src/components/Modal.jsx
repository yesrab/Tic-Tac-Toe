import React from "react";
import "../styles/Modal.css";
import { defaultSquares } from "../pages/PlayArea";
import { Link } from "react-router-dom";
function Modal({
  setScores,
  btnName,
  winnerName,
  alertText,
  setGamestate,
  setSquares,
  setShowModal,
}) {
  function handlePlayAgain() {
    console.log(btnName.current);
    if (btnName.current === "PLAY AGAIN") {
      reSetScore();
      setScores({
        CPU: 0,
        USER: 0,
        TIE: 0,
      });
      setGamestate(true);
      setSquares(defaultSquares());
      setShowModal(false);
    }
    if (btnName.current === "NEXT ROUND") {
      setGamestate(true);
      setSquares(defaultSquares());
      setShowModal(false);
    }
  }
  function reSetScore() {
    const scoretemplate = {
      CPU: 0,
      USER: 0,
      TIE: 0,
    };
    localStorage.setItem("savedScore", JSON.stringify(scoretemplate));
  }

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='title'>
          <p>{winnerName}</p>
        </div>
        <div className='body'>
          <h3>{alertText}</h3>
        </div>
        <div className='footer'>
          <Link onClick={reSetScore} className='modalBtns linkcenter' to='/'>
            <button className='modalBtns quitBtn'>QUIT</button>
          </Link>
          <button onClick={handlePlayAgain} className='modalBtns'>
            {btnName.current}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
