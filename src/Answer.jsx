import React from 'react';
import './Answer.css';
import correcto from '../resources/correcto.svg';
import incorrecto from '../resources/incorrecto.svg';

export default function Answer({
  questions,
  currentQuestionIndex,
  score,
  handleAnswer,
  handleIndicatorClick,
  selectedAnswer,
  currentQuestion,
  answeredQuestions
}) {
  return (
    <div className="wrong-answer-wrapper">
      <div className="top-header">
        <span className="top-text">Country Quiz</span>
        <div className="points-container">
          <span className="trophy">🏆</span>
          <p className="poinmejots-text">{score} / {questions.length} Points</p>
        </div>
      </div>

      <div className="question-card">
        <div className="question-indicators-container">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`question-indicator ${answeredQuestions[index] ? 'active' : ''}`}
              onClick={() => handleIndicatorClick(index)}
              data-question={index + 1}
            >
              {index + 1}
            </div>
          ))}
        </div>
        
        {currentQuestion.type === 'flag' && (
          <img src={currentQuestion.flagUrl} alt="Bandera del país" className="flag-image" />
        )}
        
        <p className="question-country">{currentQuestion.questionText}</p>
        
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            className={`answer-btn ${
              selectedAnswer !== null
                ? (option === currentQuestion.correctAnswer ? 'correct' : (option === selectedAnswer ? 'wrong' : ''))
                : ''
            }`}
            onClick={() => handleAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
            {selectedAnswer !== null && (
              option === currentQuestion.correctAnswer ? <img src={correcto} alt="Correcto" className="icon-correct" /> : (selectedAnswer === option && <img src={incorrecto} alt="Incorrecto" className="icon-wrong" />)
            )}
          </button>
        ))}
      </div>
    </div>
  );
}