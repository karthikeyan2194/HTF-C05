import React, { useState, useEffect } from 'react';

const SchoolRegistrationInfo = ({ state }) => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    console.log("SchoolRegistrationInfo received state:", state);
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
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>School/College Land Registration Process</h2>
      
      <div onClick={() => setActiveStep(1)} style={stepStyle(1)}>
        <h3 style={{ color: '#1976d2' }}>Step 1: Educational Institution Requirements</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ NOC from Education Department</li>
          <li>✓ AICTE approval (for technical institutions)</li>
          <li>✓ UGC approval (for colleges)</li>
          <li>✓ State Education Board approval</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(2)} style={stepStyle(2)}>
        <h3 style={{ color: '#1976d2' }}>Step 2: Infrastructure Requirements</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ Building plan approval from local authority</li>
          <li>✓ Fire safety clearance</li>
          <li>✓ Playground area certification</li>
          <li>✓ Sanitation and water supply certification</li>
          <li>✓ Accessibility compliance certificate</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(3)} style={stepStyle(3)}>
        <h3 style={{ color: '#1976d2' }}>Step 3: Required Documents</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>📄 Land ownership documents</li>
          <li>📄 Society/Trust registration certificate</li>
          <li>📄 Building safety certificate</li>
          <li>📄 Educational institution layout plan</li>
          <li>📄 Playground and facilities plan</li>
          <li>📄 Financial viability report</li>
          <li>📄 Teaching staff qualification documents</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(4)} style={stepStyle(4)}>
        <h3 style={{ color: '#1976d2' }}>Step 4: Fees and Charges</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>💰 Land registration: 5-7% of property value</li>
          <li>💰 Education board registration: ₹50,000 - ₹2,00,000</li>
          <li>💰 Infrastructure inspection fee: ₹25,000 - ₹50,000</li>
          <li>💰 Annual affiliation fee: Varies by board/university</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(5)} style={stepStyle(5)}>
        <h3 style={{ color: '#1976d2' }}>Step 5: Timeline</h3>
        <p>⏱️ Total process usually takes 6-12 months:</p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>• Land registration: 15-30 days</li>
          <li>• Education board approval: 3-4 months</li>
          <li>• Infrastructure verification: 1-2 months</li>
          <li>• Final approval: 1-2 months</li>
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
              <p style={{ margin: '10px 0 0 0' }}>Education Board Portal: Visit state education board website</p>
              <p style={{ margin: '10px 0 0 0' }}>AICTE/UGC Portal: www.aicte-india.org / www.ugc.ac.in</p>
            </>
          ) : (
            <p style={{ margin: 0 }}>Please select a location to see state-specific portal information</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchoolRegistrationInfo;
