import React, { useState, useEffect } from 'react';

const LandRegistrationInfo = ({ state }) => {
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    console.log("LandRegistrationInfo received state:", state);
  }, [state]);

  const getStatePortal = (stateName) => {
    if (!stateName) return 'Portal information not available';
    
    console.log("Getting portal for state:", stateName);
    const portals = {
      'Andhra Pradesh': 'Meebhoomi',
      'Arunachal Pradesh': 'Arunachal Pradesh Land Record',
      'Assam': 'Dharitee',
      'Bihar': 'Bhulekh',
      'Chattisgarh': 'Bhuiyan',
      'Goa': 'Goa Land Records',
      'Gujarat': 'AnyRoR',
      'Haryana': 'Jamabandi',
      'Himachal Pradesh': 'Himbhoomi',
      'Jammu & Kashmir': 'Jammu & Kashmir Land Record',
      'Jharkhand': 'Jharbhoomi',
      'Karnataka': 'Bhoomi',
      'Kerala': 'E-Rekha',
      'Madhya Pradesh': 'Bhulekh',
      'Maharashtra': 'Bhulekh Mahabhumi',
      'Manipur': 'Louchapathap',
      'Meghalaya': 'Meghalaya Land Records',
      'Mizoram': 'Mizoram Land Records',
      'Nagaland': 'Directorate of Land Records and Survey',
      'Odisha': 'Bhulekh',
      'Punjab': 'Punjab Land Record Society',
      'Rajasthan': 'Apna Katha/E-Dharti',
      'Sikkim': 'Land Revenue and Disaster Management',
      'Tamil Nadu': 'Patta Chitta',
      'Telangana': 'Dharani',
      'Tripura': 'Jami Tripura',
      'Uttar Pradesh': 'Bhulekh',
      'Uttarakhand': 'Bhulekh/Devbhoomi',
      'West Bengal': 'Bangla Bhumi',
      'Delhi': 'Delhi Loan Record'
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
      <h2 style={{ color: '#2c3e50', marginBottom: '20px' }}>Land Registration Process</h2>
      
      <div onClick={() => setActiveStep(1)} style={stepStyle(1)}>
        <h3 style={{ color: '#1976d2' }}>Step 1: Initial Registration</h3>
        <p>Visit the sub-registrar's office and pay the stamp duty and registration charges (₹300-₹2000).</p>
      </div>

      <div onClick={() => setActiveStep(2)} style={stepStyle(2)}>
        <h3 style={{ color: '#1976d2' }}>Step 2: Required Steps</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>✓ Verify the property title</li>
          <li>✓ Estimate the property's value</li>
          <li>✓ Prepare the sale deed</li>
          <li>✓ Prepare stamp papers</li>
          <li>✓ Pay the stamp duty and registration charges</li>
          <li>✓ Submit the required documents</li>
          <li>✓ Get approval from the sub-registrar</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(3)} style={stepStyle(3)}>
        <h3 style={{ color: '#1976d2' }}>Step 3: Required Documents</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>📄 Identity proof (Aadhaar card, PAN card, or driving license)</li>
          <li>📷 Passport-size photos</li>
          <li>📄 Original sale deed copy</li>
          <li>📄 NOC according to land ceiling Act</li>
          <li>📄 Latest property register card</li>
          <li>📄 Municipal tax bill</li>
          <li>📄 Khata certificate</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(4)} style={stepStyle(4)}>
        <h3 style={{ color: '#1976d2' }}>Step 4: Fees</h3>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li>💰 Stamp duty: 5-7% of property's market value</li>
          <li>💰 Registration charges: 1% of property's market value</li>
        </ul>
      </div>

      <div onClick={() => setActiveStep(5)} style={stepStyle(5)}>
        <h3 style={{ color: '#1976d2' }}>Step 5: Timeline</h3>
        <p>⏱️ Process usually takes 7-15 days, depending on local sub-registrar's office and document completeness.</p>
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
              <p style={{ margin: 0 }}>Portal Name: {getStatePortal(state)}</p>
            </>
          ) : (
            <p style={{ margin: 0 }}>Please select a location to see state-specific portal information</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandRegistrationInfo;
