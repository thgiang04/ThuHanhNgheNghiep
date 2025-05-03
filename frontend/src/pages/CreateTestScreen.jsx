import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CreateTestScreen.css";
import NavbarGV from "./NavbarGV";
import FooterGV from "./FooterGV";

const CreateTestScreen = () => {
  const [title, setTitle] = useState("");
  const [totalTime, setTotalTime] = useState(1);
  const [startTime, setStartTime] = useState(""); // Thêm trường startTime
  const [endTime, setEndTime] = useState(""); // Thêm trường endTime
  const [questions, setQuestions] = useState([
    {
      content: "",
      options: ["", "", "", ""],
      correctAnswer: "A",
      score: 1,
    },
  ]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        content: "",
        options: ["", "", "", ""],
        correctAnswer: "A",
        score: 1,
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    if (field === "content") updated[index].content = value;
    else if (field === "score") updated[index].score = parseInt(value);
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const handleCreateTest = async () => {
    if (!title.trim()) return alert("Vui lòng nhập tên bài kiểm tra.");
    if (!startTime || !endTime)
      return alert("Vui lòng nhập thời gian bắt đầu và kết thúc.");

    try {
      const res = await axios.post("http://localhost:3000/api/exam", {
        title,
        duration: totalTime,
        startTime, // Gửi startTime
        endTime, // Gửi endTime
      });

      const examId = res.data._id;

      for (const q of questions) {
        await axios.post(`http://localhost:3000/api/exam/${examId}/question`, {
          content: q.content,
          options: q.options,
          correctAnswer: q.correctAnswer,
          score: q.score,
        });
      }

      alert("Tạo bài kiểm tra thành công!");
      navigate("/exams");
    } catch (err) {
      console.error(err);
      alert("Tạo bài kiểm tra thất bại.");
    }
  };

  const totalScore = questions.reduce((sum, q) => sum + q.score, 0);

  return (
    <>
      <NavbarGV />
      <div className="create-test-container">
        <div className="test-info">
          <input
            className="test-name"
            placeholder="Nhập tên bài KT"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="test-stats">
            <div className="total-score">Tổng số điểm: {totalScore}</div>
            <div className="time-setting">
              <label>
                Thời gian (phút):
                <input
                  type="number"
                  min="1"
                  value={totalTime}
                  onChange={(e) => setTotalTime(parseInt(e.target.value) || 1)}
                />
              </label>
            </div>
            <div className="time-setting">
              <label>
                Thời gian bắt đầu:
                <input
                  type="datetime-local"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </label>
            </div>
            <div className="time-setting">
              <label>
                Thời gian kết thúc:
                <input
                  type="datetime-local"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        {questions.map((q, index) => (
          <div key={index} className="question-card">
            <div className="question-title">Câu {index + 1}</div>
            <input
              className="question-input"
              placeholder="Nhập câu hỏi"
              value={q.content}
              onChange={(e) =>
                handleQuestionChange(index, "content", e.target.value)
              }
            />
            <div className="answers-group">
              {["A", "B", "C", "D"].map((opt, i) => (
                <label key={opt} className="answer-option">
                  <input
                    type="radio"
                    name={`correct-${index}`}
                    checked={q.correctAnswer === opt}
                    onChange={() => handleCorrectChange(index, opt)}
                  />
                  <span className="label">{opt}</span>
                  <input
                    className="answer-input"
                    placeholder="Nhập đáp án"
                    value={q.options[i]}
                    onChange={(e) =>
                      handleOptionChange(index, i, e.target.value)
                    }
                  />
                </label>
              ))}
            </div>

            <div className="score-time">
              <label>
                Điểm
                <select
                  value={q.score}
                  onChange={(e) =>
                    handleQuestionChange(index, "score", e.target.value)
                  }
                >
                  {[1, 2, 3, 4, 5].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        ))}

        <div className="actions">
          <button className="btn add-btn" onClick={handleAddQuestion}>
            Thêm câu hỏi
          </button>
          <button className="btn create-btn" onClick={handleCreateTest}>
            Tạo bài KT
          </button>
        </div>
      </div>
      <FooterGV />
    </>
  );
};

export default CreateTestScreen;
