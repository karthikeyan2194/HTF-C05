import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

const App = () => {
  const [account, setAccount] = useState(null);
  const [network, setNetwork] = useState(null);
  const [web3, setWeb3] = useState(null);

  // Function to request accounts and set up Web3
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        // Requesting access to the user's accounts
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const currentNetwork = await window.ethereum.request({ method: 'net_version' });
        
        // Set Web3 and account details
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        setNetwork(currentNetwork);

        console.log('Connected to MetaMask:', accounts[0]);
        console.log('Network ID:', currentNetwork);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
        alert('Failed to connect to MetaMask. Please try again.');
      }
    } else {
      console.log('MetaMask or Brave Wallet is not installed.');
      alert('Please install MetaMask or Brave Wallet to connect.');
    }
  };

  // Set up event listeners for account and network changes
  useEffect(() => {
    if (window.ethereum) {
      // Listener for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        console.log('Account changed to:', accounts[0]);
        setAccount(accounts[0]);
      });

      // Listener for network changes
      window.ethereum.on('chainChanged', (chainId) => {
        console.log('Network changed to:', chainId);
        setNetwork(chainId);
      });
    }

    // Clean up the event listeners on component unmount
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged');
        window.ethereum.removeListener('chainChanged');
      }
    };
  }, []);

  return (
    <div className="App">
      <h1>Ethereum Wallet Connection</h1>
      {!account ? (
        <button onClick={connectWallet}>Connect MetaMask</button>
      ) : (
        <div>
          <p>Connected Account: {account}</p>
          <p>Network ID: {network}</p>
        </div>
      )}
    </div>
  );
};

export default App;
