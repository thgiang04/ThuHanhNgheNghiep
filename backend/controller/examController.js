const Exam = require("../model/examModel.js");
const Question = require("../model/questionModel.js");

exports.createExam = async (req, res) => {
  try {
    const { title, duration } = req.body;
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();

    const newExam = new Exam({ title, duration, code });
    await newExam.save();

    res.status(201).json(newExam); // Trả về ID để frontend tạo câu hỏi
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExamByCode = async (req, res) => {
  try {
    const exam = await Exam.findOne({ code: req.params.code }).populate(
      "questions"
    );
    if (!exam)
      return res.status(404).json({ message: "Không tìm thấy bài kiểm tra." });
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addQuestionToExam = async (req, res) => {
  try {
    const { examId } = req.params;
    const { content, options, correctAnswer, score } = req.body;

    const exam = await Exam.findById(examId);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    const question = new Question({
      examId,
      content,
      options,
      correctAnswer,
      score,
    });
    await question.save();

    exam.questions.push(question._id);
    await exam.save();

    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getExamById = async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId).populate("questions");
    res.status(200).json(exam);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteExam = async (req, res) => {
  try {
    const { examId } = req.params;
    await Exam.findByIdAndDelete(examId); // Xoá đề
    await Question.deleteMany({ examId }); // Xoá câu hỏi thuộc đề

    res.status(200).json({ message: "Xóa bài kiểm tra thành công." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
