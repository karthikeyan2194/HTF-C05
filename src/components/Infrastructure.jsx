import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Infrastructure = () => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		landArea: '',
		soilType: '',
		budget: '',
		location: '',
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log('Form data:', formData);
	};

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value
		});
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Infrastructure Development Assessment</h1>

			<div style={styles.categoryBox}>
				<button style={styles.categoryItem} onClick={() => navigate('/infrastructure/industry')}>Industry</button>
				<button style={styles.categoryItem} onClick={() => navigate('/infrastructure/hospital')}>Hospital</button>
				<button style={styles.categoryItem} onClick={() => navigate('/infrastructure/school')}>School/College</button>
				<button style={styles.categoryItem} onClick={() => navigate('/infrastructure/residential')}>Residential</button>
			</div>

			<form onSubmit={handleSubmit} style={styles.form}>
				<div style={styles.inputGroup}>
					<label style={styles.label}>Land Area (acres)</label>
					<input
						type="number"
						name="landArea"
						value={formData.landArea}
						onChange={handleChange}
						style={styles.input}
						step="0.01"
						min="0"
						placeholder="Enter land size in acres"
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
					Assess Infrastructure Suitability
				</button>
			</form>
		</div>
	);
};

const styles = {
	container: {
		padding: '40px',
		maxWidth: '900px',
		margin: '0 auto',
	},
	title: {
		color: '#1976d2',
		textAlign: 'center',
		marginBottom: '30px',
	},
	categoryBox: {
		display: 'flex',
		justifyContent: 'center',
		gap: '20px',
		marginBottom: '30px',
		flexWrap: 'wrap',
	},
	categoryItem: {
		backgroundColor: '#1976d2',
		color: 'white',
		padding: '10px 20px',
		border: 'none',
		borderRadius: '8px',
		cursor: 'pointer',
		fontSize: '1rem',
		boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
		transition: 'transform 0.2s',
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
		fontSize: '1rem',
	},
	input: {
		width: '100%',
		padding: '10px',
		borderRadius: '8px',
		border: '1px solid #ddd',
		fontSize: '1rem',
	},
	helpText: {
		fontSize: '0.8rem',
		color: '#666',
		marginTop: '4px',
		display: 'block',
	},
	submitButton: {
		backgroundColor: '#1976d2',
		color: 'white',
		border: 'none',
		padding: '12px 24px',
		borderRadius: '8px',
		fontSize: '1rem',
		cursor: 'pointer',
		width: '100%',
		transition: 'all 0.3s ease',
	},
};

export default Infrastructure;
