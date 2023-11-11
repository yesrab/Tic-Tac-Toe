import React from "react";
import "../styles/turnindicator.css";

function TurnIndicator({ player }) {
  return <div className='turnIndicator'>{player} &nbsp; TURN</div>;
}

export default TurnIndicator;
