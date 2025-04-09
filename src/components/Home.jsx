import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/MAP IN DUST.png';

const styles = {
	mainContainer: {
		backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${bgImage})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center',
		backgroundRepeat: 'no-repeat',
		minHeight: '100vh',
	},
	container: {
		padding: '20px',
		maxWidth: '1200px',
		margin: '0 auto',
	},
	hero: {
		textAlign: 'center',
		padding: '60px 20px',
		background: 'linear-gradient(135deg, rgba(187, 222, 251, 0.9), rgba(227, 242, 253, 0.9))',
		backdropFilter: 'blur(10px)',
		borderRadius: '15px',
		marginBottom: '40px',
	},
	title: {
		fontSize: '3em',
		color: '#1976d2',
		marginBottom: '20px',
		textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
	},
	subtitle: {
		fontSize: '1.5em',
		color: '#333',
		marginBottom: '30px',
	},
	ctaButton: {
		padding: '15px 40px',
		fontSize: '1.2em',
		backgroundColor: '#1976d2',
		color: 'white',
		border: 'none',
		borderRadius: '25px',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
		boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
	},
	featuresContainer: {
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
		gap: '30px',
		padding: '20px',
	},
	feature: {
		background: 'rgba(255, 255, 255, 0.9)',
		backdropFilter: 'blur(5px)',
		padding: '30px',
		borderRadius: '10px',
		textAlign: 'center',
		boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
		position: 'relative',
		overflow: 'hidden',
	},
	icon: {
		fontSize: '3em',
		marginBottom: '15px',
		display: 'block',
	},
	featureButton: {
		padding: '10px 20px',
		marginTop: '15px',
		backgroundColor: '#e3f2fd',
		color: '#1976d2',
		border: 'none',
		borderRadius: '20px',
		cursor: 'pointer',
		transition: 'all 0.3s ease',
	},
	categoryPanel: {
		position: 'absolute',
		top: '0',
		left: '100%',
		width: '100%',
		height: '100%',
		backgroundColor: 'white',
		borderRadius: '10px',
		padding: '30px 20px',
		boxShadow: '-4px 0 8px rgba(0,0,0,0.1)',
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: '15px',
		transition: 'transform 0.4s ease',
	},
	categoryPanelVisible: {
		transform: 'translateX(-100%)',
	},
	categoryItem: {
		backgroundColor: '#1976d2',
		color: 'white',
		padding: '10px 20px',
		borderRadius: '20px',
		textDecoration: 'none',
		width: '80%',
		textAlign: 'center',
		transition: 'background 0.3s ease',
	},
};

const Home = () => {
	const navigate = useNavigate();
	const [showServices, setShowServices] = useState(false);
	const [showInfra, setShowInfra] = useState(false);
	const [showConstruction, setShowConstruction] = useState(false);

	return (
		<div style={styles.mainContainer}>
			<div style={styles.container}>
				<div style={styles.hero}>
					<h1 style={styles.title}>Welcome to MapIndust</h1>
					<p style={styles.subtitle}>Your trusted partner in land development and construction</p>
					<button 
						style={styles.ctaButton}
						onClick={() => setShowServices(true)}
					>
						Explore Our Services
					</button>
				</div>

				{showServices && (
					<div style={styles.featuresContainer}>
						{/* Infrastructure Section */}
						<div style={styles.feature}>
							<span style={styles.icon}>🏗️</span>
							<h2>Infrastructure</h2>
							<p>Expert infrastructure planning and development solutions</p>
							<button 
								style={styles.featureButton}
								onClick={() => {
									setShowInfra(!showInfra);
									setShowConstruction(false);
								}}
							>
								Explore Infrastructure
							</button>
							<div
								style={{
									...styles.categoryPanel,
									...(showInfra ? styles.categoryPanelVisible : {}),
								}}
							>
								<a href="/infrastructure/industry" style={styles.categoryItem}>Industry</a>
								<a href="/infrastructure/hospital" style={styles.categoryItem}>Hospital</a>
								<a href="/infrastructure/school" style={styles.categoryItem}>School/College</a>
								<a href="/infrastructure/residential" style={styles.categoryItem}>Residential</a>
							</div>
						</div>

						{/* Construction Section */}
						<div style={styles.feature}>
							<span style={styles.icon}>🏢</span>
							<h2>Construction</h2>
							<p>Professional construction services for all your needs</p>
							<button 
								style={styles.featureButton}
								onClick={() => {
									setShowConstruction(!showConstruction);
									setShowInfra(false);
								}}
							>
								Explore Construction
							</button>
							<div
								style={{
									...styles.categoryPanel,
									...(showConstruction ? styles.categoryPanelVisible : {}),
								}}
							>
								<a href="/construction/road" style={styles.categoryItem}>Road</a>
								<a href="/construction/park" style={styles.categoryItem}>Park</a>
								<a href="/construction/railway" style={styles.categoryItem}>Railway</a>
								<a href="/construction/dam" style={styles.categoryItem}>Dam</a>
							</div>
						</div>

						{/* Buy/Sell Section */}
						<div style={styles.feature}>
							<span style={styles.icon}>🤝</span>
							<h2>Buy/Sell Land</h2>
							<p>Platform for land transactions and property dealings</p>
							<button 
								style={styles.featureButton}
								onClick={() => navigate('/land-marketplace')}
							>
								Explore Market
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Home;
