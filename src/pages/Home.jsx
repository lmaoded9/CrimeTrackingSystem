import React from 'react';
import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { mockStats } from '../utils/mockData';

import '../CSS/Home.css';

const Home = ({ theme }) => {
  // const { user } = useAuth();

  const mockStats = {
    totalCases: 1500,
    pendingCases: 300,
    resolvedCases: 1000,
    convictionRate: 75.5,
  };

  const features = [
    {
      icon: '📍',
      title: 'Location-Based Crime Data',
      description:
        'View crime incidents in your area with precise location details and safety information.',
    },
    {
      icon: '📊',
      title: 'Real-Time Statistics',
      description:
        'Access up-to-date crime statistics and trends from official government sources.',
    },
    {
      icon: '👥',
      title: 'Community Safety',
      description:
        'Stay informed about your neighborhood safety and help build a safer community.',
    },
    {
      icon: '🛡️',
      title: 'Legal Compliance',
      description:
        'All data is anonymized and complies with DPDPA 2023 and privacy regulations.',
    },
  ];

  return (
    <div className={`page-wrapper ${theme}`}>
      {/* Hero Section */}
      <section className={`hero ${theme}`}>
        <div className="container text-center">
          <h1 className="hero-title">Stay Informed, Stay Safe</h1>
          <p className="hero-subtitle">
            Access comprehensive crime data and statistics for your area.
            Know what's happening in your neighborhood with official, verified information.
          </p>
          <div className="hero-buttons">
            <Link to="/cases" className="btn btn-lg btn-white">
              View Crime Cases
            </Link>
            <Link to="/statistics" className="btn btn-lg btn-outline-white">
              📊 View Statistics
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className={`stats-section ${theme}`}>
        <div className="container stats-grid">
          <div className="stat-card">
            <div className="card-body">
              <div className="stat-icon">⚠️</div>
              <div className={`stat-value ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {mockStats.totalCases.toLocaleString()}
              </div>
              <div className="stat-label text-gray-600">Total Cases</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-body">
              <div className="stat-icon">⏰</div>
              <div className={`stat-value ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}>
                {mockStats.pendingCases.toLocaleString()}
              </div>
              <div className="stat-label text-gray-600">Pending Cases</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-body">
              <div className="stat-icon">✅</div>
              <div className="stat-value text-green-600">
                {mockStats.resolvedCases.toLocaleString()}
              </div>
              <div className="stat-label text-gray-600">Resolved Cases</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="card-body">
              <div className="stat-icon">📈</div>
              <div className="stat-value text-blue-600">
                {mockStats.convictionRate}%
              </div>
              <div className="stat-label text-gray-600">Conviction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={`features-section ${theme}`}>
        <div className="container text-center">
          <h2 className="section-title">Comprehensive Crime Information Platform</h2>
          <p className="section-subtitle">
            Access verified crime data from official sources with complete privacy protection and legal compliance.
          </p>
        </div>

        <div className="container features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="card-body text-center">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Data Sources Section */}
      <section className={`sources-section ${theme}`}>
        <div className="container text-center">
          <h2 className="section-title">Trusted Data Sources</h2>
          <p className="section-subtitle">
            All information is sourced from verified government databases and official records
          </p>
        </div>

        <div className="container sources-grid">
          <div className="source-card">
            <div className="source-icon">🛡️</div>
            <h3 className="source-title">National Crime Records Bureau</h3>
            <p className="source-description text-gray-600">
              Official crime statistics and annual reports from NCRB
            </p>
          </div>

          <div className="source-card">
            <div className="source-icon">👮</div>
            <h3 className="source-title">State Police Departments</h3>
            <p className="source-description text-gray-600">
              Direct partnerships with local police for real-time data
            </p>
          </div>

          <div className="source-card">
            <div className="source-icon">📊</div>
            <h3 className="source-title">Open Government Data</h3>
            <p className="source-description text-gray-600">
              Transparent access through data.gov.in platform
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={`cta ${theme}`}>
        <div className="container text-center">
          <h2 className="cta-title">Ready to Stay Informed?</h2>
          <p className="cta-subtitle">
            Join thousands of citizens who use our platform to stay updated about safety in their communities.
          </p>
          {/* {!user && (
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Today
            </Link>
          )} */}
          <Link to="/register" className="btn btn-primary btn-lg">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
