import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./ExamListScreen.css";
import NavbarGV from "./NavbarGV";
import FooterGV from "./FooterGV";

const ExamListScreen = () => {
  const [exams, setExams] = useState([]);
  const navigate = useNavigate();

  const { state } = useLocation();
  const teacherId = state?.teacherId || state?.userId;

  useEffect(() => {
    if (!teacherId) {
      console.log("Teacher ID không có, không thể tải bài kiểm tra.");
      return;
    }
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/exam", {
          params: { teacherId },
        });
        console.log(res.data); 
        setExams(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh sách đề:", err);
      }
    };

    fetchExams();
  }, [teacherId]);

  const handleCreateTestClick = () => {
    navigate("/create-test", { state: { teacherId } });
  };

  const handleExamClick = (examId) => {
    navigate(`/review-test/${examId}`);
  };

  const handleDelete = async (examId) => {
    if (!window.confirm("Bạn có chắc muốn xoá bài kiểm tra này?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/exam/${examId}`);
      setExams(exams.filter((exam) => exam._id !== examId));
      alert("Đã xoá bài kiểm tra.");
    } catch (err) {
      console.error("Lỗi khi xoá:", err);
      alert("Xoá thất bại.");
    }
  };

  return (
    <>
      <NavbarGV />
      <div className="exam-list-container">
        <div className="exam-list">
          {exams.map((exam) => (
            <div key={exam._id} className="exam-item">
              <div
                className="exam-info"
                onClick={() => handleExamClick(exam._id)}
              >
                <strong>{exam.title}</strong>
                <p>Mã bài kiểm tra: {exam.code}</p>
                <p>Thời gian: {exam.duration} phút</p>
              </div>
              <button
                className="delete-button"
                onClick={() => handleDelete(exam._id)}
              >
                Xoá
              </button>
            </div>
          ))}
          <button className="create-button" onClick={handleCreateTestClick}>
            Tạo bài kiểm tra
          </button>
        </div>
      </div>
      <FooterGV />
    </>
  );
};

export default ExamListScreen;
