import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom'; 
import './Register.css';
import bgImage from '../assets/bg.png';

const Register = () => {
  const navigate = useNavigate(); 
  const { role } = useParams(); 


  // chưa xử lí đăng kí
  const handleRegister = () => {
    navigate('/login');
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-container">
        <h1 className="login-header">Đăng ký {role === 'teacher' ? 'Giáo viên' : 'Học sinh'}</h1>
        
        <div className="input-group">
          <input type="text" placeholder="Nhập họ tên" />
        </div>

        <div className="input-group">
          <input type="email" placeholder="Nhập email" />
        </div>

        <div className="input-group">
          <input type="password" placeholder="Nhập mật khẩu" />
        </div>

        <div className="input-group">
          <input type="password" placeholder="Nhập lại mật khẩu" />
        </div>

        <button className="login-btn" onClick={handleRegister}>Đăng ký</button>

        <div className="login-footer">
          <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay!</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
