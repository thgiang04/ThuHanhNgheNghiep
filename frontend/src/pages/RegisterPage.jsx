import React from 'react';
import { useNavigate } from 'react-router-dom'; // Thêm useNavigate
import './RegisterPage.css';
import bgImage from '../assets/bg.png';
import Navbar1 from './Navbar1'; 

function RegisterPage() {
  const navigate = useNavigate(); // Khởi tạo navigate

  const handleRoleSelection = (role) => {
    // Chuyển hướng tới trang đăng ký với role tương ứng
    navigate(`/register/${role}`);
  };

  return (
    <>
      <Navbar1 />
      <div className="homepage">
        <img 
          src={bgImage} 
          alt="background" 
          className="background-image"
        />
        <div className="register-container">
          <h2 className="title">Đăng kí</h2>
          <div className="button-group">
            <button 
              className="teacher-btn" 
              onClick={() => handleRoleSelection('teacher')}
            >
              Giáo viên
            </button>
            <button 
              className="student-btn" 
              onClick={() => handleRoleSelection('student')}
            >
              Học sinh
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
