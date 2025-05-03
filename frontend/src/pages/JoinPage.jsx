import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./JoinPage.css";
import Navbar2 from "./Navbar2";
import bgImage from "../assets/bg1.png";
import Footer from "./Footer";
import axios from "axios";

function JoinPage() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleJoin = async () => {
    if (!code.trim()) return alert("Vui lòng nhập mã bài kiểm tra.");

    try {
      const res = await axios.get(
        `http://localhost:3000/api/exam/code/${code}`
      );
      const exam = res.data;
      const currentTime = new Date().getTime(); 
      const startTime = new Date(exam.startTime).getTime(); 
      const endTime = new Date(exam.endTime).getTime(); 

      // Kiểm tra trạng thái đã hoàn thành của bài kiểm tra

      if (currentTime < startTime || currentTime > endTime) {
        alert("Bài kiểm tra đã đóng, bạn không thể tham gia.");
        return; // Không cho phép vào bài kiểm tra nếu quá thời gian
      }

      const isCompleted =
        localStorage.getItem(`completed_${exam._id}`) === "true";
      if (isCompleted) {
        alert("Bạn đã hoàn thành bài kiểm tra này và không thể tham gia lại.");
        return; // Không cho phép vào lại bài kiểm tra
      }

      navigate("/start-page", { state: { exam } }); // chuyển dữ liệu qua state
    } catch (err) {
      console.error(err);
      alert("Không tìm thấy bài kiểm tra với mã đã nhập.");
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="homepage">
        <img src={bgImage} alt="background" className="background-image" />
        <div className="join-container">
          <h2 className="title">Nhập mã</h2>
          <div className="input-group1">
            <input
              className="code-input"
              type="text"
              placeholder="Nhập mã..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="join-btn" onClick={handleJoin}>
              Tham gia
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JoinPage;
