import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the necessary components for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const QuestionChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const storedQuestions = JSON.parse(localStorage.getItem('questions')) || [];
    console.log('Stored Questions for Chart:', storedQuestions); // Add this line
    const categoryCount = {};

    storedQuestions.forEach((question) => {
      categoryCount[question.category] = (categoryCount[question.category] || 0) + 1;
    });

    setChartData({
      labels: Object.keys(categoryCount),
      datasets: [
        {
          label: 'Number of Questions',
          data: Object.values(categoryCount),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
        },
      ],
    });
  }, []);

  return (
    <div>
      <h3>Questions by Category</h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Questions by Category',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default QuestionChart;

