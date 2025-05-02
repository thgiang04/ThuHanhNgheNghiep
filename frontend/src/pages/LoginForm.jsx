import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import bgImage from "../assets/bg.png";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/user/login", {
        email: email,
        password: password,
      });
      const loggedInUser = res.data;
      const role = loggedInUser.role;
      localStorage.setItem("user", JSON.stringify(res.data));
      
      if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else if (role === "student") {
        navigate("/student-dashboard");
      }
    } catch (err) {
      alert("Sai email hoặc mật khẩu!");
      console.error(err);
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
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

        <button className="login-btn" onClick={handleLogin}>
          Đăng nhập
        </button>

        <div className="login-footer">
          <p>
            Bạn chưa có tài khoản? <Link to="/registerPage">Đăng ký ngay!</Link>
          </p>
        </div>
        <Link to="/forgot-password" className="forgot-link">
          Quên mật khẩu?
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
