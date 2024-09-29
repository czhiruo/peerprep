import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Container } from 'react-bootstrap';
import './QuestionChart.css'; // Custom CSS for charts

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
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        },
      ],
    });
  }, []);

 return (
    <Container className="mt-5">
      <h3 className="text-center mb-4">Questions by Category</h3>
      <div className="chart-container">
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
    </Container>
  );
};

export default QuestionChart; 
