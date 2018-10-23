import React from 'react';
import "./Score.css"

const Score = ({score}) => (
  <div className="score">
    <h1>{score}</h1>
  </div>
)

export default Score;
