import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Register.css";
import bgImage from "../assets/bg.png";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const { role } = useParams();
  const users = {
    name: "",
    email: "",
    password: "",
    passwordSecurity: "",
    role: role,
  };

  const [user, setUser] = useState(users);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // chưa xử lí đăng kí
  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, passwordSecurity } = user;

    // Kiểm tra không để trống
    if (!name || !email || !password || !passwordSecurity) {
      alert("Vui lòng điền đầy đủ thông tin.");
      return;
    }

    // Kiểm tra định dạng email đơn giản
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Email không hợp lệ.");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự.");
      return;
    }

    // Kiểm tra mật khẩu khớp
    if (password !== passwordSecurity) {
      alert("Mật khẩu không khớp. Vui lòng nhập lại.");
      return;
    }

    try {
      await axios.post("http://localhost:3000/api/user", {
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
      });
      console.log("User created successfully.");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <div
      className="login-wrapper"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="login-container">
        <h1 className="login-header">
          Đăng ký {role === "teacher" ? "Giáo viên" : "Học sinh"}
        </h1>

        <div className="input-group">
          <input
            onChange={inputHandler}
            name="name"
            type="text"
            placeholder="Nhập họ tên"
          />
        </div>

        <div className="input-group">
          <input
            onChange={inputHandler}
            name="email"
            type="email"
            placeholder="Nhập email"
          />
        </div>

        <div className="input-group">
          <input
            onChange={inputHandler}
            name="password"
            type="password"
            placeholder="Nhập mật khẩu"
          />
        </div>

        <div className="input-group">
          <input
            onChange={inputHandler}
            name="passwordSecurity"
            type="password"
            placeholder="Nhập lại mật khẩu"
          />
        </div>

        <button className="login-btn" onClick={handleRegister}>
          Đăng ký
        </button>

        <div className="login-footer">
          <p>
            Bạn đã có tài khoản? <Link to="/login">Đăng nhập ngay!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
