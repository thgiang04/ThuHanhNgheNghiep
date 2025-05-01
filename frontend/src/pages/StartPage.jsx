import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './StartPage.css';
import bgImage from '../assets/bg2.png'; 
import Navbar2 from './Navbar2';
import Footer from './Footer';

function StartPage() {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <>
      <Navbar2 />
      <div className="homepage">
        <img 
          src={bgImage} 
          alt="background" 
          className="background-image"
        />
        <div className="start-container">
          <h2 className="quiz-title">Bài kiểm tra thường xuyên</h2>
          <p className="quiz-code">Mã bài kiểm tra: <strong>#123456</strong></p>
          <button className="start-btn" onClick={handleStartQuiz}>Bắt đầu</button>
          <div className="timer">🕒 00:00:00</div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default StartPage;
