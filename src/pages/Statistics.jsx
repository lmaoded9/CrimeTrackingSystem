import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { TrendingUp, TrendingDown } from 'lucide-react';
import '../CSS/Statistics.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Chart options
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        padding: 20,
        font: {
          size: 12
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        drawBorder: false
      },
      ticks: {
        maxTicksLimit: 5
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
};

// Mock data
const mockData = {
  monthly: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [65, 59, 80, 81, 56, 55],
  },
  weekly: {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    data: [28, 35, 25, 30],
  },
  daily: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    data: [12, 19, 15, 17, 20, 15, 10],
  },
};

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const lineChartData = {
    labels: mockData[timeRange].labels,
    datasets: [
      {
        label: 'Number of Cases',
        data: mockData[timeRange].data,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const barChartData = {
    labels: ['Violent', 'Property', 'Cyber', 'Drug', 'Other'],
    datasets: [
      {
        label: 'Cases by Category',
        data: [300, 450, 200, 150, 100],
        backgroundColor: [
          'rgba(239, 68, 68, 0.7)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(139, 92, 246, 0.7)',
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ['Theft', 'Assault', 'Fraud', 'Burglary', 'Cybercrime'],
    datasets: [
      {
        data: [30, 20, 15, 25, 10],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="statistics-container">
      <div className="statistics-header">
        <h1 className="statistics-title">Crime Statistics</h1>
        <p className="statistics-subtitle">
          Analyze crime patterns and trends across different categories
        </p>
      </div>

      <div className="stats-summary">
        <div className="summary-card">
          <h3>Total Cases</h3>
          <div className="value">1,234</div>
          <div className="trend positive">
            <TrendingUp size={18} />
            <span>12% vs last month</span>
          </div>
        </div>
        <div className="summary-card">
          <h3>Solved Cases</h3>
          <div className="value">892</div>
          <div className="trend positive">
            <TrendingUp size={18} />
            <span>8% vs last month</span>
          </div>
        </div>
        <div className="summary-card">
          <h3>Response Time</h3>
          <div className="value">18 min</div>
          <div className="trend negative">
            <TrendingDown size={18} />
            <span>3% vs last month</span>
          </div>
        </div>
        <div className="summary-card">
          <h3>Active Cases</h3>
          <div className="value">342</div>
          <div className="trend negative">
            <TrendingDown size={18} />
            <span>5% vs last month</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Crime Trends</h2>
            <div className="time-filter">
              <button
                className={timeRange === 'daily' ? 'active' : ''}
                onClick={() => setTimeRange('daily')}
              >
                Daily
              </button>
              <button
                className={timeRange === 'weekly' ? 'active' : ''}
                onClick={() => setTimeRange('weekly')}
              >
                Weekly
              </button>
              <button
                className={timeRange === 'monthly' ? 'active' : ''}
                onClick={() => setTimeRange('monthly')}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="chart-content">
            <Line data={lineChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Cases by Category</h2>
          </div>
          <div className="chart-content">
            <Bar data={barChartData} options={chartOptions} />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Crime Type Distribution</h2>
          </div>
          <div className="chart-content">
            <Doughnut 
              data={doughnutData} 
              options={{
                ...chartOptions,
                plugins: {
                  ...chartOptions.plugins,
                  legend: {
                    ...chartOptions.plugins.legend,
                    position: 'right'
                  }
                }
              }} 
            />
          </div>
        </div>

        <div className="chart-container">
          <div className="chart-header">
            <h2 className="chart-title">Monthly Comparison</h2>
          </div>
          <div className="chart-content">
            <Bar
              data={{
                labels: ['Previous Month', 'Current Month'],
                datasets: [
                  {
                    label: 'Violent Crimes',
                    data: [280, 300],
                    backgroundColor: 'rgba(239, 68, 68, 0.7)',
                  },
                  {
                    label: 'Property Crimes',
                    data: [420, 450],
                    backgroundColor: 'rgba(59, 130, 246, 0.7)',
                  },
                  {
                    label: 'Cyber Crimes',
                    data: [180, 200],
                    backgroundColor: 'rgba(16, 185, 129, 0.7)',
                  },
                ],
              }}
              options={{
                ...chartOptions,
                scales: {
                  ...chartOptions.scales,
                  x: {
                    stacked: false,
                  },
                  y: {
                    stacked: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
