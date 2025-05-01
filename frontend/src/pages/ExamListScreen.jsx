import React from "react";
import { useNavigate } from "react-router-dom";
import "./ExamListScreen.css";
import NavbarGV from './NavbarGV';
import FooterGV from './FooterGV';

const ExamListScreen = () => {
  const exams = [1, 2, 3, 4];
  const navigate = useNavigate();  // Hook for navigation

  const handleCreateTestClick = () => {
    navigate("/create-test");  // Navigate to CreateTestScreen
  };

  const handleExamClick = (examId) => {
    navigate(`/review-test/${examId}`);  // Navigate to ReviewTestScreen for the selected exam
  };

  return (
    <>
      <NavbarGV />
      <div className="exam-list-container">
        <div className="exam-list">
          {exams.map((exam, index) => (
            <div key={index} className="exam-item">
              <div className="exam-info" onClick={() => handleExamClick(exam)}>
                <strong>Tên bài kiểm tra {exam}</strong>
                <p>Mã bài kiểm tra {exam}</p>
              </div>
              <button className="delete-button">Xoá</button>
            </div>
          ))}
          <button className="create-button" onClick={handleCreateTestClick}>Tạo bài kiểm tra</button>
        </div>
      </div>
      <FooterGV />
    </>
  );
};

export default ExamListScreen;
