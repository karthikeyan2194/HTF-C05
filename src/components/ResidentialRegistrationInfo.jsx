import React, { useState, useEffect } from 'react';

const ResidentialRegistrationInfo = ({ state }) => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    console.log("ResidentialRegistrationInfo received state:", state);
  }, [state]);

  const getStatePortal = (stateName) => {
    if (!stateName) return 'Portal information not available';
    
    const portals = {
      'Andhra Pradesh': 'Meebhoomi',
      'Karnataka': 'Bhoomi',
      
    };
    return portals[stateName] || 'Portal information not available for this state';
  };

  const stepStyle = (step) => ({
    backgroundColor: activeStep === step ? '#e3f2fd' : '#f8f9fa',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '15px',
    cursor: 'pointer',
    border: '1px solid',
    borderColor: activeStep === step ? '#90caf9' : '#dee2e6',
    transition: 'all 0.3s ease'
  });

  return (
    <div style={{ 
      backgroundColor: 'white', 
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Residential Land Registration Process</h2>
      
      <div onClick={() => setActiveStep(1)} style={stepStyle(1)}>
        <h3 style={{ color: '#1976d2' }}>Step 1: Pre-Registration Verification</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ Title verification</li>
          <li>✓ Encumbrance certificate</li>
          <li>✓ Property tax payment status</li>
          <li>✓ RERA registration (for projects)</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(2)} style={stepStyle(2)}>
        <h3 style={{ color: '#1976d2' }}>Step 2: Municipal Requirements</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ Building plan approval</li>
          <li>✓ Zoning certificate</li>
          <li>✓ Municipal NOC</li>
          <li>✓ Water and electricity connection feasibility</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(3)} style={stepStyle(3)}>
        <h3 style={{ color: '#1976d2' }}>Step 3: Required Documents</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>📄 Sale deed/title deed</li>
          <li>📄 Property tax receipts</li>
          <li>📄 Identity proof (Aadhaar/PAN)</li>
          <li>📄 Address proof</li>
          <li>📄 Photographs</li>
          <li>📄 NOC from housing society (if applicable)</li>
          <li>📄 Bank loan documents (if applicable)</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(4)} style={stepStyle(4)}>
        <h3 style={{ color: '#1976d2' }}>Step 4: Fees and Charges</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>💰 Stamp duty: 5-7% of property value</li>
          <li>💰 Registration fee: 1% of property value</li>
          <li>💰 Legal charges: ₹10,000 - ₹50,000</li>
          <li>💰 Municipal charges: Varies by location</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(5)} style={stepStyle(5)}>
        <h3 style={{ color: '#1976d2' }}>Step 5: Timeline</h3>
        <p>⏱️ Total process usually takes 1-2 months:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>• Document verification: 7-10 days</li>
          <li>• NOC processing: 15-20 days</li>
          <li>• Registration process: 7-10 days</li>
          <li>• Mutation entry: 15-20 days</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(6)} style={stepStyle(6)}>
        <h3 style={{ color: '#1976d2' }}>Step 6: Online Portals</h3>
        <div style={{ 
          backgroundColor: '#e8f5e9', 
          padding: '15px', 
          borderRadius: '4px',
          marginTop: '10px'
        }}>
          {state ? (
            <>
              <h4 style={{ margin: '0 0 10px 0' }}>Your State: {state}</h4>
              <p style={{ margin: 0 }}>Land Portal: {getStatePortal(state)}</p>
              <p style={{ margin: '10px 0 0 0' }}>RERA Portal: Visit state RERA website</p>
              <p style={{ margin: '10px 0 0 0' }}>Municipal Portal: Visit local municipal corporation website</p>
            </>
          ) : (
            <p style={{ margin: 0 }}>Please select a location to see state-specific portal information</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResidentialRegistrationInfo;
