import { NavLink, Routes, Route } from 'react-router-dom';
import Infrastructure from './Infrastructure';
import Construction from './Construction';

const Services = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Our Services</h2>
      <div>
        <NavLink to="infrastructure" style={styles.link}>Infrastructure</NavLink>
        <NavLink to="construction" style={styles.link}>Construction</NavLink>
      </div>

      <Routes>
        <Route path="infrastructure" element={<Infrastructure />} />
        <Route path="construction" element={<Construction />} />
      </Routes>
    </div>
  );
};

const styles = {
  link: {
    margin: '10px',
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#f8f9fa',
    textDecoration: 'none',
    color: '#1976d2',
    border: '1px solid #ddd'
  }
};

export default Services;
