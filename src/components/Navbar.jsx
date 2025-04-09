import { NavLink } from 'react-router-dom';   

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>Land Suitability</div>
      <div style={styles.links}>
        <NavLink 
          to="/" 
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {})
          })}
        >
          Home
        </NavLink>
        <NavLink 
          to="/infrastructure" 
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {})
          })}
        >
          Infrastructure
        </NavLink>
        <NavLink 
          to="/construction" 
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {})
          })}
        >
          Construction
        </NavLink>
        <NavLink 
          to="/about" 
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {})
          })}
        >
          About Us
        </NavLink>
        <NavLink 
          to="/login" 
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {})
          })}
        >
          Login
        </NavLink>
        <NavLink 
          to="/signup" 
          style={({ isActive }) => ({
            ...styles.link,
            ...(isActive ? styles.activeLink : {})
          })}
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: 'linear-gradient(135deg,rgb(244, 153, 26),rgb(251, 255, 18))',
    padding: '15px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
    fontFamily: 'Arial, sans-serif',
    margin: '10px',
  },
  logo: {
    color: 'black',
    fontSize: '28px',
    fontWeight: 'bold',
    letterSpacing: '1px',
  },
  links: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '18px',
    padding: '12px 20px',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    fontWeight: '500',
    cursor: 'pointer',
  },
  activeLink: {
    backgroundColor: '#1565c0',
    color: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  },
};

export default Navbar;
