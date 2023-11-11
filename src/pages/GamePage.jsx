import React, { useEffect, useState } from "react";
import "../styles/GamePage.css";
import Game from "../components/MainMenu";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainMenu from "../components/MainMenu";
import PlayArea from "./PlayArea";

function GamePage() {
  const [player, setPlayer] = useState(playerChoice());

  function playerChoice() {
    const playerOptionExists = localStorage.getItem("playerOption");
    if (playerOptionExists) {
      return playerOptionExists;
    } else {
      return "O";
    }
  }

  useEffect(() => {
    const playerOptionExists = localStorage.getItem("playerOption");
    if (playerOptionExists) {
      setPlayer(playerOptionExists);
    } else {
      localStorage.setItem("playerOption", player);
    }
  }, [player]);

  return (
    <div className='gameBox'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<MainMenu setPlayer={setPlayer} player={player} />} />
          <Route path='/game' element={<PlayArea player={player} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default GamePage;
