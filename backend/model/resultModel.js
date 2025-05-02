const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  name: { type: String }, // 
  examId: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" }, 
  score: Number,
  timeSpent: Number, // Thời gian hoàn thành bài kiểm tra (tính bằng giây)
});

module.exports = mongoose.model("Result", ResultSchema);
