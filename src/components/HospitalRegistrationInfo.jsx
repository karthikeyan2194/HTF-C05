import React, { useState, useEffect } from 'react';

const HospitalRegistrationInfo = ({ state }) => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    console.log("HospitalRegistrationInfo received state:", state);
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
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Hospital Land Registration Process</h2>
      
      <div onClick={() => setActiveStep(1)} style={stepStyle(1)}>
        <h3 style={{ color: '#1976d2' }}>Step 1: Initial Requirements</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ Obtain NOC from State Pollution Control Board</li>
          <li>✓ Fire safety clearance</li>
          <li>✓ Building plan approval</li>
          <li>✓ Environmental clearance (if applicable)</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(2)} style={stepStyle(2)}>
        <h3 style={{ color: '#1976d2' }}>Step 2: Healthcare Specific Requirements</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ Clinical Establishment Registration</li>
          <li>✓ Medical Council Registration</li>
          <li>✓ Biomedical Waste Management Authorization</li>
          <li>✓ Radiation Safety License (if applicable)</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(3)} style={stepStyle(3)}>
        <h3 style={{ color: '#1976d2' }}>Step 3: Required Documents</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>📄 Land ownership documents</li>
          <li>📄 Environmental Impact Assessment Report</li>
          <li>📄 Building safety certificate</li>
          <li>📄 Medical equipment layout plan</li>
          <li>📄 Parking plan as per medical council norms</li>
          <li>📄 Hospital waste management plan</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(4)} style={stepStyle(4)}>
        <h3 style={{ color: '#1976d2' }}>Step 4: Fees and Charges</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>💰 Land registration charges: 5-7% of property value</li>
          <li>💰 Clinical establishment fee: ₹25,000 - ₹1,00,000</li>
          <li>💰 Environmental clearance fee: ₹10,000 - ₹50,000</li>
          <li>💰 Fire safety NOC fee: ₹15,000 - ₹30,000</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(5)} style={stepStyle(5)}>
        <h3 style={{ color: '#1976d2' }}>Step 5: Timeline</h3>
        <p>⏱️ Total process usually takes 3-6 months:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>• Land registration: 15-30 days</li>
          <li>• Clinical establishment approval: 45-60 days</li>
          <li>• Environmental clearance: 30-45 days</li>
          <li>• Other NOCs: 30-45 days</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(6)} style={stepStyle(6)}>
        <h3 style={{ color: '#1976d2' }}>Step 6: Online Portal</h3>
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
              <p style={{ margin: '10px 0 0 0' }}>Clinical Establishment Portal: Visit state medical council website</p>
            </>
          ) : (
            <p style={{ margin: 0 }}>Please select a location to see state-specific portal information</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HospitalRegistrationInfo;
