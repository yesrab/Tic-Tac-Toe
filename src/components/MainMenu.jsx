import React from "react";
import { Link } from "react-router-dom";
import LogoBox from "./LogoBox";
function MainMenu({ setTrigger, setPlayer, player, setToastText }) {
  const setSymbol = (choice) => {
    if (player !== choice) {
      setPlayer(choice);
      localStorage.setItem("playerOption", choice);
    }
  };

  return (
    <div className='gameNavigator'>
      <LogoBox />
      <div className='pickerWindow'>
        <h3>PICK PLAYER</h3>
        <div className='buttonHouse'>
          <button
            className='xBtn'
            autoFocus={player === "X"}
            onClick={() => {
              setSymbol("X");
            }}></button>
          <button
            className='oBtn'
            autoFocus={player === "O"}
            onClick={() => {
              setSymbol("O");
            }}></button>
        </div>
      </div>
      <Link className='gameBtns ' to='/game'>
        NEW GAME (VS CPU)
      </Link>
      <br />
      <a
        onClick={() => {
          setToastText("Coming Soon");
          setTrigger((prev) => !prev);
          setTimeout(() => {
            setTrigger(false);
          }, 6000);
        }}
        className='gameBtns gameBtnsBlue'>
        NEW GAME (VS HUMAN) Coming soon
      </a>
      <br />
      <a
        onClick={() => {
          setToastText("Invite Link copied");
          navigator.clipboard.writeText(window.location.href);
          setTrigger((prev) => !prev);
          setTimeout(() => {
            setTrigger(false);
          }, 6000);
        }}
        className='gameBtns gameBtnsinvite'>
        Invite your friend
      </a>
    </div>
  );
}

export default MainMenu;
