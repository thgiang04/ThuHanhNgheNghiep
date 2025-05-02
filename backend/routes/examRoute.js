const express = require("express");
const {
  createExam,
  addQuestionToExam,
  getExamById,
  getAllExams,
  deleteExam,
  getExamByCode,
  submitExamResults,
} = require("../controller/examController");
const router = express.Router();

router.post("/exam", createExam); // Tạo đề
router.post("/exam/:examId/question", addQuestionToExam); // Thêm câu hỏi vào đề

router.get("/exam/:examId", getExamById); // Xem đề
router.get("/exam", getAllExams); // Lấy danh sách đề
router.delete("/exam/:examId", deleteExam);
router.get("/exam/code/:code", getExamByCode);

router.post("/exam/:examId/results", submitExamResults);

module.exports = router;
