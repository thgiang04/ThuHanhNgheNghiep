import React from 'react';
import './TestResultScreen.css';
import NavbarGV from './NavbarGV';
import FooterGV from './FooterGV';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useParams, NavLink } from 'react-router-dom'; 

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const TestResultScreen = () => {
  const { examId } = useParams();
  console.log(examId);

  const studentResults = [
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "8d" },
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "6d" },
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "9d" },
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "5d" },
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "8d" },
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "7d" },
    { name: "Tên HS", timeSpent: "Thời gian làm bài", score: "9d" },
  ];

  const scoreDistribution = {
    "9d": studentResults.filter(item => item.score === "9d").length,
    "8d": studentResults.filter(item => item.score === "8d").length,
    "7d": studentResults.filter(item => item.score === "7d").length,
    "6d": studentResults.filter(item => item.score === "6d").length,
    "5d": studentResults.filter(item => item.score === "5d").length,
  };

  const total = Object.values(scoreDistribution).reduce((acc, val) => acc + val, 0);
  const percentages = {};
  for (const [key, value] of Object.entries(scoreDistribution)) {
    percentages[key] = ((value / total) * 100).toFixed(1);
  }

  const chartData = {
    labels: Object.keys(scoreDistribution),
    datasets: [
      {
        data: Object.values(scoreDistribution),
        backgroundColor: ['#006400', '#008000', '#3CB371', '#00FF7F', '#90EE90'],
        hoverBackgroundColor: ['#004d00', '#006600', '#2e8b57', '#00cc66', '#7fdc7f'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 14,
        },
        formatter: (value, context) => {
          const total = context.chart._metasets[0].total || context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = (value / total) * 100;
          return `${percentage.toFixed(1)}%`;
        }
      }
    }
  };

  return (
    <>
      <NavbarGV />

      <div className="content-area">
        <div className="test-header">
          <div className="test-title">Tên bài KT {examId} <span className="test-subtitle">(ngày tạo)</span></div>
          <div className="test-stats">Tổng số điểm: 2 Thời gian: 6s</div>
        </div>

        <div className="tab-nav">
          <NavLink to={`/review-test/${examId}`} className={({ isActive }) => isActive ? "active" : ""}>
            Câu hỏi
          </NavLink>
          <NavLink to={`/resulttest/${examId}`} className={({ isActive }) => isActive ? "active" : ""}>
            Điểm
          </NavLink>
        </div>

        <div className="results-section">
          <div className="students-panel">
            {studentResults.map((student, index) => (
              <div className="student-row" key={index}>
                <div className="student-details">
                  <div className="student-name">{student.name}</div>
                  <div className="student-time">{student.timeSpent}</div>
                </div>
                <div className="score-badge">{student.score}</div>
              </div>
            ))}
          </div>

          <div className="stats-panel">
            <div className="chart">
              <div className="donut-chart">
                <Doughnut data={chartData} options={chartOptions} plugins={[ChartDataLabels]} />
              </div>
              <div className="chart-legend">
                <div className="chart-caption">Thống kê điểm</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FooterGV />
    </>
  );
};

export default TestResultScreen;