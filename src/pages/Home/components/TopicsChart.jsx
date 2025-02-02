import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartContainer = styled.div`
  background-color: var(--color-theme-800);
  border-radius: 10px;
  padding: 20px;
  color: #fff;
  width: 100%;
  max-width: 900px;
  margin: 30px auto;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

const LegendContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 20px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
`;

const ColorDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${(props) => props.color};
`;

const topicsData = [
  { label: 'Front-End Development', value: 82, count: 8, color: '#b27bf1' },
  { label: 'Back-End Development', value: 18, count: 2, color: '#23a7f2' },
  { label: 'Data Science', value: 0, count: 0, color: '#40c437' },
  { label: 'Artificial Intelligence', value: 0, count: 0, color: '#a0a0a0' },
  { label: 'Cloud Computing', value: 0, count: 0, color: '#f14d4d' },
  { label: 'Product Management', value: 0, count: 0, color: '#f2a23e' },
];

const data = {
  labels: topicsData.map((topic) => topic.label),
  datasets: [
    {
      data: topicsData.map((topic) => topic.count),
      backgroundColor: topicsData.map((topic) => topic.color),
      borderRadius: 6,
      barThickness: 30,
    },
  ],
};

const options = {
  indexAxis: 'y', // Horizontal bar chart
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: { color: '#ffffff', beginAtZero: true },
      grid: { color: 'rgba(255,255,255,0.1)' },
    },
    y: {
      ticks: { color: '#ffffff' },
      grid: { display: false },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: { backgroundColor: '#222', titleColor: '#fff' },
  },
};

function TopicsChart() {
  return (
    <ChartContainer>
      <Title>Most Interested Topics</Title>
      <div style={{ height: '250px' }}>
        <Bar data={data} options={options} />
      </div>

      {/* Legend */}
      <LegendContainer>
        {topicsData.map((topic, index) => (
          <LegendItem key={index}>
            <ColorDot color={topic.color} />
            <span>{topic.label}</span>
            <strong>{topic.value}%</strong>
          </LegendItem>
        ))}
      </LegendContainer>
    </ChartContainer>
  );
}

export default TopicsChart;
