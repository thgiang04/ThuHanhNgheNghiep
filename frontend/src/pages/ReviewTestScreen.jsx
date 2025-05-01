import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import "./ReviewTestScreen.css";
import NavbarGV from './NavbarGV';
import FooterGV from './FooterGV';

const ReviewTestScreen = () => {
  const { examId } = useParams();  
  console.log("Exam ID in ReviewTestScreen:", examId);

  return (
    <>
      <NavbarGV />
      <div className="review-container">
        <div className="test-header">
          <div>
            <strong>Tên bài KT {examId}</strong> <span className="dim-text">(ngày tạo)</span>
          </div>
          <div className="test-meta">Tổng số điểm: 2 &nbsp; Thời gian: 6s</div>
        </div>

        <div className="tab-nav">
          <NavLink to={`/review-test/${examId}`} className={({ isActive }) => isActive ? "active" : ""}>
            Câu hỏi
          </NavLink>
          <NavLink to={`/resulttest/${examId}`} className={({ isActive }) => isActive ? "active" : ""}>
            Điểm
          </NavLink>
        </div>

        {[1, 2].map((index) => (
          <div key={index} className="question-card">
            <div className="question-title">Câu {index}</div>
            <input
              className="question-input"
              value="Nội dung câu hỏi"
              readOnly
            />

            <div className="answers-group">
              {["A", "B", "C", "D"].map((opt, i) => (
                <label key={opt} className="answer-option">
                  <input
                    type="radio"
                    name={`review-${index}`}
                    checked={opt === "A"}
                    readOnly
                  />
                  <span className="label">{opt}</span>
                  <input
                    className="answer-input"
                    value="Đáp án"
                    readOnly
                  />
                </label>
              ))}
            </div>

            <div className="score-time">
              <label>
                Điểm
                <input type="text" value="1" readOnly />
              </label>
            </div>
          </div>
        ))}
      </div>
      <FooterGV />
    </>
  );
};

export default ReviewTestScreen;
