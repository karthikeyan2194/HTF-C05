import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase/config';
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';

import web3, { initializeWeb3, checkWalletConnection, sendTransaction } from '../blockchain';


const LandMarketplace = () => {
	const [listings, setListings] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [listingForm, setListingForm] = useState({
		type: 'sell',
		location: '',
		area: '',
		price: '',
		description: '',
		contact: ''
	});
	const [account, setAccount] = useState('');
	const [balance, setBalance] = useState('');
	const [selectedListing, setSelectedListing] = useState(null);
	const [amount, setAmount] = useState('');

	useEffect(() => {
		fetchListings();
		const loadAccount = async () => {
			try {
				
				if (typeof window.ethereum !== 'undefined') {
					
					await window.ethereum.request({ method: 'eth_requestAccounts' });
					const accounts = await web3.eth.getAccounts(); 
					if (accounts.length > 0) {
						setAccount(accounts[0]);
						
						const balance = await web3.eth.getBalance(accounts[0]);
						setBalance(web3.utils.fromWei(balance, 'ether')); 
					} else {
						setError('No accounts found. Please log in to MetaMask.');
					}
				} else {
					setError('Please install MetaMask!');
				}
			} catch (err) {
				console.error('Error loading account:', err);
				setError('');
			}
		};

		loadAccount();

		
		if (window.ethereum) {
			window.ethereum.on('accountsChanged', (accounts) => {
				if (accounts.length > 0) {
					setAccount(accounts[0]);
					
					web3.eth.getBalance(accounts[0]).then(balance => {
						setBalance(web3.utils.fromWei(balance, 'ether'));
					});
				} else {
					setAccount('');
					setBalance('');
					setError('Please connect to MetaMask.');
				}
			});

			
			window.ethereum.on('networkChanged', (networkId) => {
				console.log('Network changed to:', networkId);
				
			});
		}

	}, []);

	const fetchListings = async () => {
		try {
			const q = query(collection(db, 'landListings'), orderBy('createdAt', 'desc'));
			const querySnapshot = await getDocs(q);
			const listingsData = querySnapshot.docs.map(doc => ({
				id: doc.id,
				...doc.data()
			}));
			setListings(listingsData);
		} catch (err) {
			console.error('Error fetching listings:', err);
			setError('Failed to load listings');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			if (!auth.currentUser) {
				throw new Error('Please login to post a listing');
			}

			await addDoc(collection(db, 'landListings'), {
				...listingForm,
				userId: auth.currentUser.uid,
				userEmail: auth.currentUser.email,
				createdAt: new Date().toISOString()
			});

			setListingForm({
				type: 'sell',
				location: '',
				area: '',
				price: '',
				description: '',
				contact: ''
			});

			fetchListings();
		} catch (err) {
			console.error('Error creating listing:', err);
			setError(err.message);
		}

		setLoading(false);
	};

	const handleTransaction = async () => {
		if (!account) {
			setError('Please connect your wallet first.');
			return;
		}

		const transaction = {
			from: account,
			to: '0xRecipientAddress', 
			value: web3.utils.toWei('0.1', 'ether'), 
		};

		try {
			await web3.eth.sendTransaction(transaction);
			console.log('Transaction successful');
		} catch (error) {
			console.error('Transaction failed:', error);
			setError('Transaction failed. Please check the console for details.');
		}
	};

	const handlePayment = async () => {
		if (!selectedListing) {
			alert('Please select a listing to proceed with payment.');
			return;
		}

		const orderData = {
			amount: selectedListing.price * 100, 
		};

		try {
			
			const response = await fetch('http://localhost:5000/create-order', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(orderData),
			});

			if (!response.ok) {
				throw new Error('Failed to create order');
			}

			const order = await response.json();
			console.log('Order response:', order); 
			
			const options = {
				key: 'asdfghjkjjjjjjjjj',
				amount: order.amount, 
				currency: order.currency,
				name: 'MAPINDUST',
				description: 'Purchase of Land',
				order_id: order.id, 
				handler: function (response) {
					alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);
				},
				prefill: {
					name: 'Customer Name',
					email: 'customer@example.com',
					contact: '9999999999',
				},
				theme: {
					color: '#F37254',
				},
			};

			const razorpay = new window.Razorpay(options);
			razorpay.open();
		} catch (error) {
			console.error('Error during payment:', error);
			alert('Payment failed. Please try again.');
		}
	};

	return (
		<div style={styles.container}>
			<h1 style={styles.title}>Land Marketplace</h1>
			
			<div style={styles.content}>
				<div style={styles.formSection}>
					<h2>Create New Listing</h2>
					{error && <div style={styles.error}>{error}</div>}
					<form onSubmit={handleSubmit} style={styles.form}>
						<div style={styles.formGroup}>
							<label>Type:</label>
							<select 
								value={listingForm.type}
								onChange={(e) => setListingForm({...listingForm, type: e.target.value})}
								style={styles.input}
							>
								<option value="sell">Sell Land</option>
								<option value="buy">Buy Land</option>
							</select>
						</div>

						<div style={styles.formGroup}>
							<label>Location:</label>
							<input
								type="text"
								value={listingForm.location}
								onChange={(e) => setListingForm({...listingForm, location: e.target.value})}
								style={styles.input}
								placeholder="Enter location"
								required
							/>
						</div>

						<div style={styles.formGroup}>
							<label>Area (acres):</label>
							<input
								type="number"
								value={listingForm.area}
								onChange={(e) => setListingForm({...listingForm, area: e.target.value})}
								style={styles.input}
								placeholder="Enter area in acres"
								required
							/>
						</div>

						<div style={styles.formGroup}>
							<label>Price (₹):</label>
							<input
								type="number"
								value={listingForm.price}
								onChange={(e) => setListingForm({...listingForm, price: e.target.value})}
								style={styles.input}
								placeholder="Enter price"
								required
							/>
						</div>

						<div style={styles.formGroup}>
							<label>Description:</label>
							<textarea
								value={listingForm.description}
								onChange={(e) => setListingForm({...listingForm, description: e.target.value})}
								style={{...styles.input, height: '100px'}}
								placeholder="Enter property description"
								required
							/>
						</div>

						<div style={styles.formGroup}>
							<label>Contact Information:</label>
							<input
								type="text"
								value={listingForm.contact}
								onChange={(e) => setListingForm({...listingForm, contact: e.target.value})}
								style={styles.input}
								placeholder="Enter contact details"
								required
							/>
						</div>

						<button 
							type="submit" 
							style={styles.submitButton}
							disabled={loading}
						>
							{loading ? 'Posting...' : 'Post Listing'}
						</button>
					</form>
				</div>

				<div style={styles.listingsSection}>
					<h2>Current Listings</h2>
					<div style={styles.listings}>
						{listings.map(listing => (
							<div key={listing.id} style={styles.listingCard} onClick={() => setSelectedListing(listing)}>
								<h3>{listing.type === 'sell' ? 'Land for Sale' : 'Looking to Buy'}</h3>
								<p><strong>Location:</strong> {listing.location}</p>
								<p><strong>Area:</strong> {listing.area} acres</p>
								<p><strong>Price:</strong> ₹{listing.price}</p>
								<p><strong>Description:</strong> {listing.description}</p>
								<p><strong>Contact:</strong> {listing.contact}</p>
							</div>
						))}
					</div>
				</div>
			</div>

			<div style={styles.accountSection}>
				<h2>Connected Account</h2>
				<p>{account || 'Not connected'}</p>
				{balance && <p>Balance: {balance} ETH</p>}
				<button onClick={handleTransaction}>Send Transaction</button>
				<button onClick={handlePayment}>Pay with Razorpay</button>
			</div>

			{selectedListing && (
				<div style={styles.selectedListing}>
					<h2>Selected Listing</h2>
					<p><strong>Location:</strong> {selectedListing.location}</p>
					<p><strong>Price:</strong> ₹{selectedListing.price}</p>
					<button onClick={handlePayment}>Pay with Razorpay</button>
				</div>
			)}
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
	},
	content: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
		gap: '40px',
	},
	formSection: {
		backgroundColor: '#ffffff',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		gap: '15px',
	},
	formGroup: {
		display: 'flex',
		flexDirection: 'column',
		gap: '5px',
	},
	input: {
		padding: '8px',
		borderRadius: '4px',
		border: '1px solid #ddd',
		fontSize: '16px',
	},
	submitButton: {
		backgroundColor: '#1976d2',
		color: 'white',
		padding: '10px',
		border: 'none',
		borderRadius: '4px',
		cursor: 'pointer',
		fontSize: '16px',
	},
	listingsSection: {
		backgroundColor: '#ffffff',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
	},
	listings: {
		display: 'flex',
		flexDirection: 'column',
		gap: '20px',
	},
	listingCard: {
		backgroundColor: '#f8f9fa',
		padding: '15px',
		borderRadius: '8px',
		border: '1px solid #dee2e6',
		cursor: 'pointer',
	},
	error: {
		color: '#dc3545',
		marginBottom: '15px',
		padding: '10px',
		backgroundColor: '#f8d7da',
		borderRadius: '4px',
		textAlign: 'center',
	},
	accountSection: {
		backgroundColor: '#ffffff',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
	},
	selectedListing: {
		backgroundColor: '#ffffff',
		padding: '20px',
		borderRadius: '10px',
		boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
		marginTop: '20px',
	},
};

export default LandMarketplace