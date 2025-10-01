import React, { useState, useEffect } from 'react';
import Answer from './Answer.jsx';
import Congrats from './Congrats.jsx';

export default function Question({ onFinish }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(10).fill(false));

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/independent?status=true');
        const data = await response.json();
        
        const shuffledData = data.sort(() => 0.5 - Math.random());
        const newQuestions = shuffledData.slice(0, 10).map((country) => {
          const questionTypes = ['capital', 'flag'];
          const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
          
          let questionText = '';
          let correctAnswer = '';
          let options = [];

          if (questionType === 'capital' && country.capital) {
            questionText = `¿Cuál es la capital de ${country.name.common}?`;
            correctAnswer = country.capital[0];
            options = shuffledData
              .filter(c => c.name.common !== country.name.common && c.capital)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map(c => c.capital[0]);
          } else {
            questionText = `¿A qué país pertenece esta bandera?`;
            correctAnswer = country.name.common;
            options = shuffledData
              .filter(c => c.name.common !== country.name.common)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3)
              .map(c => c.name.common);
          }
          
          options.push(correctAnswer);
          options.sort(() => 0.5 - Math.random());

          return {
            questionText,
            correctAnswer,
            options,
            flagUrl: country.flags.svg,
            type: questionType
          };
        });

        setQuestions(newQuestions);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; 
    
    setSelectedAnswer(answer);
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion?.correctAnswer;
    
    // Actualiza el estado para marcar la pregunta como respondida
    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (isCorrect) {
      setScore(score + 1);
    }
    
    setTimeout(() => {
      // Verifica si todas las preguntas han sido respondidas
      if (newAnsweredQuestions.every(q => q === true)) {
        onFinish(score + (isCorrect ? 1 : 0));
      } else {
        const nextQuestionIndex = currentQuestionIndex + 1;
        if (nextQuestionIndex < questions.length) {
          setCurrentQuestionIndex(nextQuestionIndex);
          setSelectedAnswer(null);
        } else {
          setCurrentQuestionIndex(0);
          setSelectedAnswer(null);
        }
      }
    }, 1500);
  };
  
  const handleIndicatorClick = (index) => {
      if (selectedAnswer === null) {
          setCurrentQuestionIndex(index);
      }
  };

  if (loading || questions.length === 0) {
    return null;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Answer
      questions={questions}
      currentQuestionIndex={currentQuestionIndex}
      score={score}
      handleAnswer={handleAnswer}
      handleIndicatorClick={handleIndicatorClick}
      selectedAnswer={selectedAnswer}
      currentQuestion={currentQuestion}
      answeredQuestions={answeredQuestions} // Pasamos el nuevo estado
    />
  );
}