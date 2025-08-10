import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Calendar, Filter } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import '../CSS/Crimemap.css';

// Fix for default marker icon
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Mock data for crime incidents
const mockIncidents = [
  {
    id: 1,
    type: 'Theft',
    location: [30.7333, 76.7794], // Chandigarh coordinates
    date: '2025-08-10',
    description: 'Vehicle theft reported',
    status: 'Under Investigation'
  },
  {
    id: 2,
    type: 'Assault',
    location: [30.7265, 76.7588],
    date: '2025-08-09',
    description: 'Physical altercation',
    status: 'Solved'
  },
  {
    id: 3,
    type: 'Burglary',
    location: [30.7460, 76.7880],
    date: '2025-08-11',
    description: 'Home break-in',
    status: 'Active'
  },
];

const crimeTypes = ['Theft', 'Assault', 'Burglary', 'Robbery', 'Vandalism'];

const Crimemap = () => {
  const [selectedTypes, setSelectedTypes] = useState(crimeTypes);
  const [dateRange, setDateRange] = useState({
    start: '2025-08-01',
    end: '2025-08-31'
  });
  const [showHeatmap, setShowHeatmap] = useState(false);

  const handleTypeToggle = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const filteredIncidents = mockIncidents.filter(incident => 
    selectedTypes.includes(incident.type) &&
    new Date(incident.date) >= new Date(dateRange.start) &&
    new Date(incident.date) <= new Date(dateRange.end)
  );

  return (
    <div className="map-container">
      <div className="map-header">
        <h1 className="map-title">Crime Map</h1>
        <p className="map-subtitle">
          Interactive map showing crime incidents across the city
        </p>
      </div>

      <div className="map-controls">
        <div className="control-section">
          <div className="control-title">
            <Filter size={18} style={{ marginRight: '0.5rem' }} />
            Crime Types
          </div>
          <div className="filter-group">
            {crimeTypes.map(type => (
              <div key={type} className="filter-item">
                <input
                  type="checkbox"
                  id={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                />
                <label htmlFor={type} className="checkbox-label">{type}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <div className="control-title">
            <Calendar size={18} style={{ marginRight: '0.5rem' }} />
            Date Range
          </div>
          <div className="date-range">
            <input
              type="date"
              className="date-input"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
            <input
              type="date"
              className="date-input"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
        </div>

        <div className="control-section">
          <div className="control-title">Statistics</div>
          <div>
            <p>Total Incidents: {filteredIncidents.length}</p>
            <p>Selected Types: {selectedTypes.length}</p>
            <p>Date Range: {dateRange.end - dateRange.start} days</p>
          </div>
        </div>
      </div>

      <div className="map-wrapper">
        <MapContainer
          center={[30.7333, 76.7794]} // Chandigarh center
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredIncidents.map(incident => (
            <Marker
              key={incident.id}
              position={incident.location}
            >
              <Popup>
                <div>
                  <h3>{incident.type}</h3>
                  <p>{incident.description}</p>
                  <p>Date: {new Date(incident.date).toLocaleDateString()}</p>
                  <p>Status: {incident.status}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <button
          className="heatmap-toggle"
          onClick={() => setShowHeatmap(!showHeatmap)}
        >
          {showHeatmap ? 'Show Markers' : 'Show Heatmap'}
        </button>

        <div className="map-legend">
          <div className="legend-title">Crime Types</div>
          {crimeTypes.map(type => (
            <div key={type} className="legend-item">
              <div
                className="legend-color"
                style={{ backgroundColor: type === 'Theft' ? '#ef4444' :
                                       type === 'Assault' ? '#3b82f6' :
                                       type === 'Burglary' ? '#10b981' :
                                       type === 'Robbery' ? '#f59e0b' :
                                       '#8b5cf6' }}
              />
              <span className="legend-label">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Crimemap;
