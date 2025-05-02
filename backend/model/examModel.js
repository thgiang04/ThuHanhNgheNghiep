const mongoose = require("mongoose");

const ExamSchema = new mongoose.Schema({
  title: String,
  code: String,
  duration: Number,
  createdAt: { type: Date, default: Date.now },
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
  results: [{ type: mongoose.Schema.Types.ObjectId, ref: "Result" }],
});

module.exports = mongoose.model("Exam", ExamSchema);
