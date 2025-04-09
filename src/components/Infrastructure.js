import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';

const Infrastructure = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#1976d2' }}>Infrastructure Suitability</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <NavLink to={routes.industry}>Industry</NavLink>
        <NavLink to={routes.hospital}>Hospital</NavLink>
        <NavLink to={routes.school}>School/College</NavLink>
        <NavLink to={routes.residential}>Residential</NavLink>
      </div>
    </div>
  );
};

export default Infrastructure;
