import React from 'react'; 
import { Routes, Route, Navigate } from 'react-router-dom';
import LandMarketplace from './components/LandMarketplace';
import IndustrySuitability from './components/IndustrySuitability';
import HospitalSuitability from './components/HospitalSuitability';
import SchoolSuitability from './components/SchoolSuitability';
import ResidentialSuitability from './components/ResidentialSuitability';
import RoadSuitability from './components/RoadSuitability';
import ParkSuitability from './components/ParkSuitability';
import RailwaySuitability from './components/RailwaySuitability';
import DamSuitability from './components/DamSuitability';
import Infrastructure from './components/Infrastructure';
import Construction from './components/Construction';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/Aboutus';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>MAPINDUST</h1>
      <Navbar />

      <Routes>
        <Route path="/" element={
          <>
            <Navigation />
            <Home />
            <About />
          </>
        } />

        {/* INFRASTRUCTURE ROUTES */}
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/infrastructure/industry" element={<IndustrySuitability />} />
        <Route path="/infrastructure/hospital" element={<HospitalSuitability />} />
        <Route path="/infrastructure/school" element={<SchoolSuitability />} />
        <Route path="/infrastructure/residential" element={<ResidentialSuitability />} />

        {/* CONSTRUCTION ROUTES */}
        <Route path="/construction" element={<Construction />} />
        <Route path="/construction/road" element={<RoadSuitability />} />
        <Route path="/construction/park" element={<ParkSuitability />} />
        <Route path="/construction/railway" element={<RailwaySuitability />} />
        <Route path="/construction/dam" element={<DamSuitability />} />

        {/* OTHER ROUTES */}
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/land-marketplace" element={<LandMarketplace />} />

        {/* Redirect fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
