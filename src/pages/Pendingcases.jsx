import React, { useState } from 'react';
import {
  Search,
  Calendar,
  User,
  Clock,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import '../CSS/Pendingcases.css';

// Mock data for pending cases
const mockCases = [
  {
    id: 1,
    title: 'Armed Robbery Investigation',
    type: 'Robbery',
    priority: 'high',
    status: 'critical',
    date: '2025-08-10',
    officer: 'Inspector Singh',
    description: 'Armed robbery at local convenience store. Suspects fled in a black vehicle.',
    deadline: '2025-08-15',
  },
  {
    id: 2,
    title: 'Missing Person Report',
    type: 'Missing Person',
    priority: 'high',
    status: 'pending',
    date: '2025-08-09',
    officer: 'Officer Kumar',
    description: '16-year-old female missing from residence. Last seen at school.',
    deadline: '2025-08-12',
  },
  {
    id: 3,
    title: 'Cybercrime Investigation',
    type: 'Cybercrime',
    priority: 'medium',
    status: 'review',
    date: '2025-08-08',
    officer: 'Cyber Cell Team',
    description: 'Online banking fraud involving multiple accounts. Evidence collection in progress.',
    deadline: '2025-08-20',
  },
  {
    id: 4,
    title: 'Drug Possession Case',
    type: 'Narcotics',
    priority: 'medium',
    status: 'pending',
    date: '2025-08-07',
    officer: 'Officer Sharma',
    description: 'Suspect arrested with controlled substances. Lab analysis pending.',
    deadline: '2025-08-18',
  },
  {
    id: 5,
    title: 'Vehicle Theft Investigation',
    type: 'Theft',
    priority: 'low',
    status: 'review',
    date: '2025-08-06',
    officer: 'Officer Verma',
    description: 'Multiple vehicles reported stolen from parking complex. CCTV footage under review.',
    deadline: '2025-08-25',
  },
];

const Pendingcases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const casesPerPage = 4;

  // Filter cases based on search term and filters
  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || caseItem.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Pagination
  const indexOfLastCase = currentPage * casesPerPage;
  const indexOfFirstCase = indexOfLastCase - casesPerPage;
  const currentCases = filteredCases.slice(indexOfFirstCase, indexOfLastCase);
  const totalPages = Math.ceil(filteredCases.length / casesPerPage);

  return (
    <div className="pending-container">
      <div className="pending-header">
        <h1 className="pending-title">Pending Cases</h1>
        <p className="pending-subtitle">
          Track and manage ongoing investigations and pending cases
        </p>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            className="filter-select"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          <select
            className="filter-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="review">Under Review</option>
            <option value="critical">Critical</option>
          </select>
        </div>
      </div>

      <div className="case-grid">
        {currentCases.map(caseItem => (
          <div key={caseItem.id} className="case-card">
            <div className={`priority-indicator priority-${caseItem.priority}`} />
            
            <div className="case-info">
              <h3 className="case-title">{caseItem.title}</h3>
              <div className="case-meta">
                <div className="meta-item">
                  <Calendar size={16} />
                  {new Date(caseItem.date).toLocaleDateString()}
                </div>
                <div className="meta-item">
                  <User size={16} />
                  {caseItem.officer}
                </div>
                <div className="meta-item">
                  <Clock size={16} />
                  Due: {new Date(caseItem.deadline).toLocaleDateString()}
                </div>
                <div className="meta-item">
                  <AlertTriangle size={16} />
                  {caseItem.type}
                </div>
              </div>
              <p className="case-description">{caseItem.description}</p>
            </div>

            <div className="case-actions">
              <span className={`status-tag status-${caseItem.status}`}>
                {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
              </span>
              <button className="action-button primary-button">Update</button>
              <button className="action-button secondary-button">Details</button>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-button"
            onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
          </button>
          
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx + 1}
              className={`page-button ${currentPage === idx + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </button>
          ))}
          
          <button
            className="page-button"
            onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Pendingcases;
