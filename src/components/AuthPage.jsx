import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      localStorage.setItem('mockUser', JSON.stringify(loginData));
      window.location.href = '/'; // Force navigation to home page
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (signupData.email && signupData.password && signupData.confirmPassword) {
      localStorage.setItem('mockUser', JSON.stringify(signupData));
      window.location.href = '/'; // Force navigation to home page
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.authContainer}>
        {/* Login */}
        <div style={styles.box}>
          <h2 style={styles.title}>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              required
            />
            <button style={styles.button} type="submit">Login</button>
          </form>
        </div>

        {/* OR separator */}
        <div style={styles.orBox}><span style={styles.or}>or</span></div>

        {/* Sign Up */}
        <div style={styles.box}>
          <h2 style={styles.title}>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <input
              style={styles.input}
              type="email"
              placeholder="Email"
              value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
              required
            />
            <input
              style={styles.input}
              type="password"
              placeholder="Confirm Password"
              value={signupData.confirmPassword}
              onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
              required
            />
            <button style={styles.button} type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(212,173,63,1) 0%, rgba(208,130,60,1) 61%)',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Segoe UI, sans-serif',
    padding: '20px',
  },
  authContainer: {
    display: 'flex',
    gap: '30px',
    backgroundColor: '#ffffffdd',
    padding: '40px',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  box: {
    flex: 1,
    minWidth: '280px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#d0823c',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#d0823c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  orBox: {
    padding: '0 10px',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  or: {
    backgroundColor: '#fff',
    padding: '6px 10px',
    borderRadius: '50%',
    boxShadow: '0 0 8px rgba(0,0,0,0.2)',
  },
};

export default AuthPage;