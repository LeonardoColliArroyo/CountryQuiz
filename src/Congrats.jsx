import React from 'react'
import './Congrats.css';
import celebrationImg from '../resources/congrats.png';

export default function Congrats({ score, onPlayAgain }) {
  return (
    <div className="results-card">
      <img src={celebrationImg} alt="Congrats" className="congrats-img" /> 
      <h2 className="quiz-title">Congrats! You completed the quiz. </h2>
      <p className="results-score">
        You answered <span className="score-number">{score}</span>/10 correctly
      </p>
      <button className="again-btn" onClick={onPlayAgain}>Play Again</button>
    </div>
  )
}