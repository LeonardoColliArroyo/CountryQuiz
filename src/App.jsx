import React, { useState } from 'react';
import './App.css';
import Question from './Question.jsx';
import Congrats from './Congrats.jsx';

function App() {
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizFinish = (finalScore) => {
    setScore(finalScore);
    setIsQuizFinished(true);
  };

  const handleRestartQuiz = () => {
    setIsQuizFinished(false);
    setScore(0);
  };

  return (
    <div className='quiz-container'>
      {isQuizFinished ? (
        <Congrats score={score} onPlayAgain={handleRestartQuiz} />
      ) : (
        <Question onFinish={handleQuizFinish} />
      )}
    </div>
  );
}

export default App;