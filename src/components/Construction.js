import React from 'react';
import { NavLink } from 'react-router-dom';
import routes from '../routes';
import './Construction.css';


const Construction = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2 style={{ color: '#1976d2' }}>Construction Suitability</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <NavLink to={routes.road}>Road</NavLink>
        <NavLink to={routes.park}>Park</NavLink>
        <NavLink to={routes.railway}>Railway</NavLink>
        <NavLink to={routes.dam}>Dam</NavLink>
      </div>
    </div>
  );
};

export default Construction;
