import React from 'react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
	const navigate = useNavigate();

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Our Services</h1>
			<div style={styles.cardsContainer}>
				<div 
					style={styles.card}
					onClick={() => navigate('/services/infrastructure')}
				>
					<h2 style={styles.cardTitle}>Infrastructure</h2>
					<p style={styles.cardDescription}>
						Comprehensive infrastructure development solutions including site analysis, 
						planning, and sustainable development strategies.
					</p>
					<button style={styles.button}>Learn More</button>
				</div>

				<div 
					style={styles.card}
					onClick={() => navigate('/services/construction')}
				>
					<h2 style={styles.cardTitle}>Construction</h2>
					<p style={styles.cardDescription}>
						Expert construction services for residential, commercial, 
						and industrial projects with quality assurance.
					</p>
					<button style={styles.button}>Learn More</button>
				</div>
			</div>
		</div>
	);
};

const styles = {
	container: {
		padding: '40px',
		maxWidth: '1200px',
		margin: '0 auto',
	},
	title: {
		color: '#1976d2',
		textAlign: 'center',
		marginBottom: '40px',
		fontSize: '2.5rem',
	},
	cardsContainer: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: '30px',
		padding: '20px',
	},
	card: {
		backgroundColor: '#ffffff',
		borderRadius: '15px',
		padding: '30px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
		transition: 'transform 0.3s ease, box-shadow 0.3s ease',
		cursor: 'pointer',
		'&:hover': {
			transform: 'translateY(-5px)',
			boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
		},
	},
	cardTitle: {
		color: '#1976d2',
		marginBottom: '15px',
		fontSize: '1.8rem',
	},
	cardDescription: {
		color: '#666',
		marginBottom: '20px',
		lineHeight: '1.6',
	},
	button: {
		backgroundColor: '#1976d2',
		color: 'white',
		border: 'none',
		padding: '12px 24px',
		borderRadius: '8px',
		cursor: 'pointer',
		fontSize: '1rem',
		transition: 'background-color 0.3s ease',
		'&:hover': {
			backgroundColor: '#1565c0',
		},
	},
};

export default Services;