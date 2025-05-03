import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/Register";
import RegisterPage from "./pages/RegisterPage";
import JoinPage from "./pages/JoinPage";
import StartPage from "./pages/StartPage";
import ResultPage from "./pages/ResultPage";
import QuizPage from "./pages/QuizPage";
import UserProfile from "./pages/UserProfile";
import UserProfileGV from "./pages/UserProfileGV";
import ExamListScreen from "./pages/ExamListScreen";
import CreateTestScreen from "./pages/CreateTestScreen";
import ReviewTestScreen from "./pages/ReviewTestScreen";
import TestResultScreen from "./pages/TestResultScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exams" element={<ExamListScreen />} />
        <Route path="/create-test" element={<CreateTestScreen />} />
        <Route path="/review-test/:examId" element={<ReviewTestScreen />} />
        <Route path="/resulttest/:examId" element={<TestResultScreen />} />
        <Route path="/student-dashboard" element={<JoinPage />} />
        <Route path="/start-page" element={<StartPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/teacher-dashboard" element={<ExamListScreen />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register/:role" element={<Register />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/user" element={<UserProfile />} />
        <Route path="/userGV" element={<UserProfileGV />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
