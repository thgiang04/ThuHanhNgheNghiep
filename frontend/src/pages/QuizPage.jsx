import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import Navbar2 from './Navbar2';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const navigate = useNavigate();

  const questions = [
    {
      id: 1,
      question: "React là thư viện JavaScript để làm gì?",
      options: [
        "A. Xây dựng giao diện người dùng",
        "B. Xử lý dữ liệu backend",
        "C. Thiết kế đồ họa",
        "D. Phân tích dữ liệu"
      ],
      correctAnswer: "A"
    },
    {
      id: 2,
      question: "Hook nào được sử dụng để quản lý state trong function component?",
      options: [
        "A. useEffect",
        "B. useContext",
        "C. useState",
        "D. useReducer"
      ],
      correctAnswer: "C"
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => prev + 1); 
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);

    if (option[0] === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      navigate('/result', {
        state: {
          score,
          total: questions.length,
          elapsedTime
        }
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs < 10 ? '0' : ''}${secs} giây`;
  };

  return (
    <>
      <Navbar2 />
      <div className="quiz-container">
        <div className="progress-indicator">
          Câu {currentQuestionIndex + 1}/{questions.length}
        </div>

        <div className="timer-box">
          ⏱️ Thời gian: {formatTime(elapsedTime)}
        </div>

        <h2 className="question-text">{currentQuestion.question}</h2>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedOption === option
                  ? option[0] === currentQuestion.correctAnswer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => !selectedOption && handleOptionSelect(option)}
              disabled={selectedOption}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="navigation">
          <button
            className="next-btn"
            onClick={goToNextQuestion}
            disabled={!selectedOption}
          >
            {currentQuestionIndex < questions.length - 1
              ? 'Câu tiếp theo →'
              : 'Xem kết quả'}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
