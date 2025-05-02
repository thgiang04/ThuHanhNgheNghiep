import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import './StartPage.css';
import bgImage from '../assets/bg2.png'; 
import Navbar2 from './Navbar2';
import Footer from './Footer';

function StartPage() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const exam = state?.exam;

  const handleStartQuiz = () => {
    if (!exam) return alert("Không có thông tin bài kiểm tra.");
    navigate('/quiz', { state: { exam } }); 
  };

  if (!exam) {
    return (
      <>
        <Navbar2 />
        <div className="homepage">
          <h2>Không tìm thấy bài kiểm tra.</h2>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar2 />
      <div className="homepage">
        <img src={bgImage} alt="background" className="background-image" />
        <div className="start-container">
          <h2 className="quiz-title">{exam.title}</h2>
          <p className="quiz-code">Mã bài kiểm tra: <strong>#{exam.code}</strong></p>
          <button className="start-btn" onClick={handleStartQuiz}>Bắt đầu</button>
          <div className="timer">🕒 {exam.duration}s</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StartPage;
