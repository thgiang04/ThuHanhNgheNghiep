import React, { useState, useEffect, useRef } from "react";
import "./QuizPage.css";
import Navbar2 from "./Navbar2";
import { useLocation, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const exam = state?.exam;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const questions = exam?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const hasSubmitted = useRef(false);

  useEffect(() => {
    if (exam && elapsedTime >= exam.duration && !hasSubmitted.current) {
      hasSubmitted.current = true;
      navigate("/result", {
        state: {
          score,
          total: questions.reduce((sum, q) => sum + q.score, 0),
          elapsedTime,
        },
      });
    }
  }, [elapsedTime, exam, navigate, questions, score]);

  useEffect(() => {
    if (!exam) return;
    const timer = setInterval(() => setElapsedTime((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, [exam]);

  const handleOptionSelect = (index) => {
    setSelectedOptionIndex(index);

    const correctIndex = ["A", "B", "C", "D"].indexOf(
      currentQuestion.correctAnswer
    );
    if (index === correctIndex) {
      setScore(score + currentQuestion.score);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOptionIndex(null); // reset lựa chọn
    } else {
      navigate("/result", {
        state: {
          score,
          total: questions.reduce((sum, q) => sum + q.score, 0),
          elapsedTime,
        },
      });
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs < 10 ? "0" : ""}${secs} giây`;
  };

  if (!exam) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Không có dữ liệu bài kiểm tra. Vui lòng quay lại nhập mã.</h3>
      </div>
    );
  }

  return (
    <>
      <Navbar2 />
      <div className="quiz-container">
        <div className="progress-indicator">
          Câu {currentQuestionIndex + 1}/{questions.length}
        </div>

        <div className="timer-box">⏱️ Thời gian: {formatTime(elapsedTime)}</div>

        {exam.duration - elapsedTime <= 10 &&
          exam.duration - elapsedTime > 0 && (
            <div className="warning">
              ⚠️ Còn {exam.duration - elapsedTime} giây, hãy nhanh lên!
            </div>
          )}

        <h2 className="question-text">{currentQuestion.content}</h2>

        <div className="options-grid">
          {currentQuestion.options.map((option, index) => {
            const correctIndex = ["A", "B", "C", "D"].indexOf(
              currentQuestion.correctAnswer
            );
            const isSelected = selectedOptionIndex === index;
            const isCorrect = index === correctIndex;

            return (
              <button
                key={index}
                className={`option-btn ${
                  isSelected ? (isCorrect ? "correct" : "incorrect") : ""
                }`}
                onClick={() =>
                  selectedOptionIndex === null && handleOptionSelect(index)
                }
                disabled={selectedOptionIndex !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        <div className="navigation">
          <button
            className="next-btn"
            onClick={goToNextQuestion}
            disabled={selectedOptionIndex === null}
          >
            {currentQuestionIndex < questions.length - 1
              ? "Câu tiếp theo →"
              : "Xem kết quả"}
          </button>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
