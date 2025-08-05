import React, { useState } from 'react';
import Navbar from './components/navbar'; 
import Home from './pages/Home';
import CrimeMap from './pages/CrimeMap';
import Cases from './pages/Cases';
import Statistics from './pages/Statistics';
import PendingCases from './pages/PendingCases';
import Login from './pages/Login';
import Register from './pages/Register';

const App = () => {
  const [theme, setTheme] = useState('light');

  return (
    <div className={`container ${theme}`}>
      <Navbar theme={theme} setTheme={setTheme} />

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/map" element={<CrimeMap/>}/>
        <Route path="/cases" element={<Cases/>}/>
        <Route path="/statistics" element={<Statistics/>}/>
        <Route path="/pending-cases" element={<PendingCases/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
      </Routes>
    </div>
  );
};

export default App;
