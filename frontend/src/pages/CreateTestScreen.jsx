import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateTestScreen.css";
import NavbarGV from './NavbarGV';
import FooterGV from './FooterGV';

const CreateTestScreen = () => {
  const [questions, setQuestions] = useState([
    { id: 1, score: 1 },
    { id: 2, score: 1 }
  ]);
  const [totalTime, setTotalTime] = useState(60); // chỉnh thời gian toàn bài
  const navigate = useNavigate();

  const addQuestion = () => {
    const newId = questions.length + 1;
    setQuestions([...questions, { id: newId, score: 1 }]);
  };

  const handleScoreChange = (index, newScore) => {
    const updated = [...questions];
    updated[index].score = parseInt(newScore) || 1;
    setQuestions(updated);
  };

  const totalScore = questions.reduce((sum, q) => sum + q.score, 0);

  const handleCreateTest = () => {
    // Xử lý lưu dữ liệu nếu cần
    navigate("/exams");
  };

  return (
    <>
      <NavbarGV />
      <div className="create-test-container">
        <div className="test-info">
          <input className="test-name" placeholder="Nhập tên bài KT" />
          <div className="test-stats">
            <div className="total-score">Tổng số điểm: {totalScore}</div>
            <div className="time-setting">
              <label>
                Thời gian (giây):
                <input
                  type="number"
                  min="1"
                  value={totalTime}
                  onChange={(e) => setTotalTime(parseInt(e.target.value) || 1)}
                />
              </label>
            </div>
          </div>
        </div>

        {questions.map((q, index) => (
          <div key={q.id} className="question-card">
            <div className="question-title">Câu {index + 1}</div>
            <input className="question-input" placeholder="Nhập câu hỏi" />
            <div className="answers-group">
              {["A", "B", "C", "D"].map((opt) => (
                <label key={opt} className="answer-option">
                  <input type="radio" name={`correct-${q.id}`} />
                  <span className="label">{opt}</span>
                  <input className="answer-input" placeholder="Nhập đáp án" />
                </label>
              ))}
            </div>

            <div className="score-time">
              <label>
                Điểm
                <select
                  value={q.score}
                  onChange={(e) => handleScoreChange(index, e.target.value)}
                >
                  {[1,2,3,4,5,6,7,8,9,10].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        ))}

        <div className="actions">
          <button className="btn add-btn" onClick={addQuestion}>Thêm câu hỏi</button>
          <button className="btn create-btn" onClick={handleCreateTest}>Tạo bài KT</button>
        </div>
      </div>
      <FooterGV />
    </>
  );
};

export default CreateTestScreen;
