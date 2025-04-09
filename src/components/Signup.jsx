import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

const Signup = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
		confirmPassword: '',
	});
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');

		if (formData.password !== formData.confirmPassword) {
			return setError('Passwords do not match');
		}

		setLoading(true);

		try {
			await createUserWithEmailAndPassword(auth, formData.email, formData.password);
			navigate('/'); 
		} catch (err) {
			setError('Failed to create an account. ' + err.message);
			console.error(err);
		}

		setLoading(false);
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Sign Up</h1>
			{error && <div style={styles.error}>{error}</div>}
			<form onSubmit={handleSubmit} style={styles.form}>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Email</label>
					<input
						type="email"
						value={formData.email}
						onChange={(e) => setFormData({...formData, email: e.target.value})}
						style={styles.input}
						required
					/>
				</div>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Password</label>
					<input
						type="password"
						value={formData.password}
						onChange={(e) => setFormData({...formData, password: e.target.value})}
						style={styles.input}
						required
					/>
				</div>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Confirm Password</label>
					<input
						type="password"
						value={formData.confirmPassword}
						onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
						style={styles.input}
						required
					/>
				</div>
				<button 
					type="submit" 
					style={styles.button}
					disabled={loading}
				>
					{loading ? 'Creating Account...' : 'Sign Up'}
				</button>
			</form>
		</div>
	);
};

const styles = {
	container: {
		padding: '40px',
		maxWidth: '400px',
		margin: '0 auto',
	},
	title: {
		color: '#1976d2',
		textAlign: 'center',
		marginBottom: '40px',
	},
	form: {
		backgroundColor: '#ffffff',
		padding: '30px',
		borderRadius: '15px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
	},
	inputGroup: {
		marginBottom: '20px',
	},
	label: {
		display: 'block',
		marginBottom: '8px',
		color: '#333',
	},
	input: {
		width: '100%',
		padding: '10px',
		borderRadius: '8px',
		border: '1px solid #ddd',
	},
	button: {
		width: '100%',
		padding: '12px',
		backgroundColor: '#1976d2',
		color: 'white',
		border: 'none',
		borderRadius: '8px',
		cursor: 'pointer',
	},
	error: {
		color: '#dc3545',
		marginBottom: '20px',
		textAlign: 'center',
	}
};

export default Signup;