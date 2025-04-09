import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import bgImage from '../assets/images/MAP IN DUST.png';

const ConstructionCheck = () => {
	const { type } = useParams();
	const [formData, setFormData] = useState({
		landArea: '',
		soilType: '',
		budget: '',
		location: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		
		console.log('Checking suitability for:', type);
		console.log('Form data:', formData);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div style={styles.pageContainer}>
			<div style={styles.container}>
			<h1 style={styles.title}>Suitability Check for {type}</h1>
			<form onSubmit={handleSubmit} style={styles.form}>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Plot Size (acres)</label>
					<input
						type="number"
						name="landArea"
						value={formData.landArea}
						onChange={handleChange}
						style={styles.input}
						step="0.01"
						min="0"
						placeholder="Enter plot size in acres"
						required
					/>
					<span style={styles.helpText}>1 acre = 43,560 square feet</span>
				</div>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Soil Type</label>
					<select
						name="soilType"
						value={formData.soilType}
						onChange={handleChange}
						style={styles.input}
						required
					>
						<option value="">Select Soil Type</option>
						<option value="clay">Clay</option>
						<option value="sandy">Sandy</option>
						<option value="loam">Loam</option>
						<option value="silt">Silt</option>
					</select>
				</div>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Budget (₹)</label>
					<input
						type="number"
						name="budget"
						value={formData.budget}
						onChange={handleChange}
						style={styles.input}
						required
					/>
				</div>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Location</label>
					<input
						type="text"
						name="location"
						value={formData.location}
						onChange={handleChange}
						style={styles.input}
						required
					/>
				</div>
				<button type="submit" style={styles.submitButton}>
					Check Suitability
				</button>
			</form>
		</div>
	</div>
	);
};

const styles = {
	pageContainer: {
		minHeight: '100vh',
		backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		padding: '40px',
	},
	container: {
		maxWidth: '800px',
		margin: '0 auto',
		backgroundColor: 'rgba(255, 255, 255, 0.95)',
		borderRadius: '15px',
		padding: '30px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
	},
	title: {
		color: '#1976d2',
		textAlign: 'center',
		marginBottom: '40px',
		textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	inputGroup: {
		marginBottom: '20px',
	},
	label: {
		display: 'block',
		marginBottom: '8px',
		color: '#333',
		fontSize: '1rem',
		fontWeight: '500',
	},
	input: {
		width: '100%',
		padding: '12px',
		borderRadius: '8px',
		border: '1px solid #ddd',
		fontSize: '1rem',
		backgroundColor: 'rgba(255, 255, 255, 0.9)',
		transition: 'all 0.3s ease',
		'&:focus': {
			outline: 'none',
			borderColor: '#1976d2',
			boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
		},
	},
	submitButton: {
		backgroundColor: '#1976d2',
		color: 'white',
		border: 'none',
		padding: '14px 24px',
		borderRadius: '8px',
		fontSize: '1rem',
		cursor: 'pointer',
		width: '100%',
		transition: 'all 0.3s ease',
		'&:hover': {
			backgroundColor: '#1565c0',
			transform: 'translateY(-2px)',
		},
	},
	helpText: {
		fontSize: '0.8rem',
		color: '#666',
		marginTop: '4px',
		display: 'block',
	},
};

export default ConstructionCheck;