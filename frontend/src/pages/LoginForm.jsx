import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import bgImage from '../assets/bg.png';

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'teacher@example.com' && password === '123456') {
      navigate('/teacher-dashboard');
    } else if (email === 'student@example.com' && password === '123456') {
      navigate('/student-dashboard');
    } else {
      alert('Thông tin đăng nhập không đúng!');
    }
  };

  return (
    <div className="login-wrapper" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="login-container">
        <h1 className="login-header">Đăng nhập</h1>

        <div className="input-group">
          <input
            type="email"
            placeholder="Nhập email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>Đăng nhập</button>

        <div className="login-footer">
          <p>Bạn chưa có tài khoản? <Link to="/register/:role">Đăng ký ngay!</Link></p>
        </div>
        <Link to="/forgot-password" className="forgot-link">Quên mật khẩu?</Link>
      </div>
    </div>
  );
};

export default LoginForm;
