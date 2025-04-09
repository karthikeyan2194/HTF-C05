import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import './Construction.css';

const Construction = () => {
	const navigate = useNavigate();
	const [selectedType, setSelectedType] = useState(null);

	const constructionTypes = [
		{
			title: "Residential Construction",
			description: "Single-family homes, apartments, and residential complexes",
			items: ["Houses", "Apartments", "Villas", "Residential Complexes"],
			icon: "🏠"
		},
		{
			title: "Commercial Construction",
			description: "Office buildings, retail spaces, and commercial complexes",
			items: ["Office Buildings", "Shopping Centers", "Hotels", "Restaurants"],
			icon: "🏢"
		},
		{
			title: "Industrial Construction",
			description: "Factories, warehouses, and industrial facilities",
			items: ["Factories", "Warehouses", "Manufacturing Plants", "Storage Facilities"],
			icon: "🏭"
		}
	];

	const handleCheckSuitability = (type) => {
		setSelectedType(type);
		navigate(`/construction-check/${type.toLowerCase().replace(/\s+/g, '-')}`);
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Construction Services</h1>
			<div style={styles.typesContainer}>
				{constructionTypes.map((type, index) => (
					<div key={index} style={styles.card}>
						<div style={styles.cardHeader}>
							<span style={styles.icon}>{type.icon}</span>
							<h2 style={styles.cardTitle}>{type.title}</h2>
						</div>
						<p style={styles.description}>{type.description}</p>
						<ul style={styles.list}>
							{type.items.map((item, idx) => (
								<li key={idx} style={styles.listItem}>
									{item}
									<button 
										onClick={() => handleCheckSuitability(item)}
										style={styles.checkButton}
									>
										Check Suitability
									</button>
								</li>
							))}
						</ul>
					</div>
				))}
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
	typesContainer: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: '30px',
		padding: '20px',
	},
	card: {
		backgroundColor: '#ffffff',
		borderRadius: '15px',
		padding: '25px',
		boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
	},
	cardHeader: {
		display: 'flex',
		alignItems: 'center',
		marginBottom: '15px',
	},
	icon: {
		fontSize: '2rem',
		marginRight: '15px',
	},
	cardTitle: {
		color: '#1976d2',
		margin: '0',
		fontSize: '1.5rem',
	},
	description: {
		color: '#666',
		marginBottom: '20px',
	},
	list: {
		listStyle: 'none',
		padding: '0',
		margin: '0',
	},
	listItem: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: '10px 0',
		borderBottom: '1px solid #eee',
	},
	checkButton: {
		backgroundColor: '#1976d2',
		color: 'white',
		border: 'none',
		padding: '8px 15px',
		borderRadius: '20px',
		cursor: 'pointer',
		fontSize: '0.9rem',
		transition: 'all 0.3s ease',
	},
};

export default Construction;
