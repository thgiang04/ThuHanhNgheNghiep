import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPasswordScreen.css';
import bgImage from '../assets/bg.png';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Đã gửi liên kết đặt lại mật khẩu đến ${email}`);
  };

  return (
    <div className="forgot-password-container">
      <img src={bgImage} alt="background" className="background-image1" />
      <div className="form-box">
        <h2>Quên mật khẩu?</h2>
        <p>Nhập email bạn đã đăng ký để nhận liên kết đặt lại mật khẩu.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Gửi liên kết</button>
        </form>
        <Link to="/login" className="back-link">← Quay lại đăng nhập</Link>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
