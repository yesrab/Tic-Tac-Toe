import React from "react";
import { Link } from "react-router-dom";
import LogoBox from "./LogoBox";
import toast from "react-hot-toast";
function MainMenu({ setPlayer, player }) {
  const setSymbol = (choice) => {
    if (player !== choice) {
      setPlayer(choice);
      localStorage.setItem("playerOption", choice);
    }
  };
  function show(text) {
    toast(text, {
      position: "top-right",
      style: {
        width: "20vw",
        height: "5vh",
        right: "1em",
        color: "var(--forground-btn-secondary)",
        backgroundColor: "var(--main-bag-color)",
        fontSize: "12px",
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "1em",
      },
    });
  }
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
          show("Coming Soon");
        }}
        className='gameBtns gameBtnsBlue'>
        NEW GAME (VS HUMAN) Coming soon
      </a>
      <br />
      <a
        onClick={() => {
          show("Invite Link copied");
          navigator.clipboard.writeText(window.location.href);
        }}
        className='gameBtns gameBtnsinvite'>
        Invite your friend
      </a>
    </div>
  );
}

export default MainMenu;
