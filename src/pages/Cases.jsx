import React, { useState } from 'react';
import '../CSS/Cases.css';
import { Search, MapPin, Calendar, User, FileText } from 'lucide-react';

const mockCases = [
  {
    id: 1,
    title: 'Armed Robbery at Local Store',
    status: 'open',
    location: 'Sector 17, Chandigarh',
    date: '2025-08-10',
    officer: 'Inspector Sharma',
    description: 'Armed individuals robbed a convenience store. CCTV footage under review. No injuries reported.'
  },
  {
    id: 2,
    title: 'Vehicle Theft Investigation',
    status: 'pending',
    location: 'Phase 3, Mohali',
    date: '2025-08-09',
    officer: 'Officer Singh',
    description: 'SUV reported stolen from residential parking. Surveillance footage being collected from nearby cameras.'
  },
  {
    id: 3,
    title: 'Cybercrime Report',
    status: 'closed',
    location: 'Online',
    date: '2025-08-08',
    officer: 'Inspector Kaur',
    description: 'Online banking fraud case. Suspect identified and apprehended. Funds recovered.'
  }
];

const Cases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCases = mockCases.filter(caseItem => {
    const matchesSearch = 
      caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || caseItem.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="cases-page">
      <header className="cases-header">
        <h1>Crime Cases</h1>
        <p>Browse and manage criminal case records</p>
      </header>

      <div className="controls">
        <div className="search-box">
          <Search size={20} />
          <input 
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter"
        >
          <option value="all">All Status</option>
          <option value="open">Open</option>
          <option value="pending">Pending</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div className="cases-grid">
        {filteredCases.map(caseItem => (
          <div key={caseItem.id} className="case-card">
            <div className="card-header">
              <h3>{caseItem.title}</h3>
              <span className={`status ${caseItem.status}`}>
                {caseItem.status.charAt(0).toUpperCase() + caseItem.status.slice(1)}
              </span>
            </div>
            
            <div className="card-details">
              <div className="detail">
                <MapPin size={18} />
                <span>{caseItem.location}</span>
              </div>
              
              <div className="detail">
                <Calendar size={18} />
                <span>{new Date(caseItem.date).toLocaleDateString()}</span>
              </div>
              
              <div className="detail">
                <User size={18} />
                <span>{caseItem.officer}</span>
              </div>
              
              <div className="detail description">
                <FileText size={18} />
                <p>{caseItem.description}</p>
              </div>
            </div>
            
            <div className="card-actions">
              <button className="btn-primary">View Details</button>
              <button className="btn-secondary">Update Status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cases;
