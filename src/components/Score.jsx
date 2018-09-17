import React from 'react';
import "./Score.css"

const Score = ({score}) => (
  <div className="score">
    <h2>Score</h2>
    <p>{score}</p>
  </div>
)

export default Score;
