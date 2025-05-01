import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './JoinPage.css';
import Navbar2 from './Navbar2';
import bgImage from '../assets/bg1.png'; 
import Footer from './Footer';

function JoinPage() {
  const navigate = useNavigate(); 

  const handleJoin = () => {
    navigate('/start-page');
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
        <div className="join-container">
          <h2 className="title">Nhập mã</h2>
          <div className="input-group1">
            <input className="code-input" type="text" placeholder="Nhập mã..."/>
            <button className="join-btn" onClick={handleJoin}>Tham gia</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JoinPage;
