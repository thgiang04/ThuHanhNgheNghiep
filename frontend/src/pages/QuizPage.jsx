import React, { useState, useEffect, useRef } from "react";
import "./QuizPage.css";
import Navbar2 from "./Navbar2";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const QuizPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const exam = state?.exam;

  // dang fix
  const userId = state?.userId
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [score, setScore] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  
  
  const questions = exam?.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const hasSubmitted = useRef(false);

  const submitExamResults = async () => {
    // const user = JSON.parse(localStorage.getItem("user")); // Lấy thông tin người dùng từ localStorage
    // const name = user?.name; // Dùng email thay vì studentId

    try {
      const response = await axios.post(
        `http://localhost:3000/api/exam/${exam._id}/results`,
        {
          // name: name, // Gửi email thay vì studentId
          userId: userId,
          examId: exam._id,
          score: score,
          timeSpent: elapsedTime,
        }
      );
      console.log("Kết quả đã được lưu:", response.data);
    } catch (error) {
      console.error("Lỗi khi lưu kết quả:", error);
    }
  };

  useEffect(() => {
    if (exam && elapsedTime >= exam.duration * 60 && !hasSubmitted.current) {
      hasSubmitted.current = true;
      submitExamResults(); // Gửi kết quả khi hết thời gian
      navigate("/result", {
        state: {
          score,
          total: questions.reduce((sum, q) => sum + q.score, 0),
          elapsedTime,
          title: exam.title,
          code: exam.code,
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
      submitExamResults();
      navigate("/result", {
        state: {
          score,
          total: questions.reduce((sum, q) => sum + q.score, 0),
          elapsedTime,
          title: exam.title,
          code: exam.code,
        },
      });
    }
  };

  localStorage.setItem(`completed_${exam._id}`, "true");

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

        {exam.duration * 60 - elapsedTime <= 10 &&
          exam.duration * 60 - elapsedTime > 0 && (
            <div className="warning">
              ⚠️ Còn {exam.duration * 60 - elapsedTime} giây, hãy nhanh lên!
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
