import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const TRANSPORT_THRESHOLD = 5;
const WATER_THRESHOLD = 2;
const RESIDENTIAL_THRESHOLD = 3;

const INDUSTRY_GUIDELINES = {
  Copper: "Follow environmental guidelines and obtain necessary pollution control board approvals.",
  Textile: "Ensure waste management plans and labor safety regulations compliance.",
  Chemical: "Strict hazardous material handling guidelines must be followed.",
};


const calculateBoundingBox = (lat, lon, sizeKm) => {
 
  const kmToDegrees = sizeKm / 111;
  return [
    [lat - kmToDegrees/2, lon - kmToDegrees/2], 
    [lat + kmToDegrees/2, lon + kmToDegrees/2]  
  ];
};

const generateRandomDistances = () => ({

  min_transport_distance: (Math.random() * (10 - 0.1) + 0.1).toFixed(2),
  min_water_distance: (Math.random() * (5 - 0.1) + 0.1).toFixed(2),
  min_residential_distance: (Math.random() * (8 - 0.5) + 0.5).toFixed(2),
});

const checkSuitability = (features) => {
  return (
    features.min_transport_distance <= TRANSPORT_THRESHOLD &&
    features.min_water_distance <= WATER_THRESHOLD &&
    features.min_residential_distance <= RESIDENTIAL_THRESHOLD
  );
};

const findNearbySuitableLocations = (lat, lon, numSuggestions = 3) => {
  let suitableLocations = [];
  while (suitableLocations.length < numSuggestions) {
    let newLat = lat + (Math.random() * 0.04 - 0.02);
    let newLon = lon + (Math.random() * 0.04 - 0.02);
    let newDistances = generateRandomDistances();
    if (checkSuitability(newDistances)) {
      suitableLocations.push({
        lat: newLat,
        lon: newLon,
        ...newDistances,
      });
    }
  }
  return suitableLocations;
};

const LandSuitabilityChecker = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [result, setResult] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [landUse, setLandUse] = useState("Industry");
  const [industryType, setIndustryType] = useState("Copper");
  const [state, setState] = useState(null);
  const [sizeKm, setSizeKm] = useState(2);
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    if (lat && lon && sizeKm) {
      setBoundingBox(calculateBoundingBox(lat, lon, sizeKm));
    }
  }, [lat, lon, sizeKm]);

  const checkLocation = () => {
    const distances = generateRandomDistances();
    const isSuitable = checkSuitability(distances);

    if (!isSuitable) {
      const suggestions = findNearbySuitableLocations(lat, lon);
      setNearbyLocations(suggestions);
    } else {
      setNearbyLocations([]);
    }

    setResult({
      lat,
      lon,
      ...distances,
      isSuitable,
    });

    // Fetch state using reverse geocoding
    fetchState(lat, lon);
  };

  const fetchState = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const address = response.data.address;
      const stateName = address.state;
      setState(stateName);
    } catch (error) {
      console.error("Error fetching state:", error);
      setState("State not found");
    }
  };

  useEffect(() => {
    
    fetchState(lat, lon);
  }, [lat, lon]);

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Land Suitability Checker</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <h3>Location Details</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "15px" }}>
            <div>
              <label>Latitude: </label>
              <input
                type="number"
                value={lat}
                onChange={(e) => setLat(parseFloat(e.target.value))}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
            <div>
              <label>Longitude: </label>
              <input
                type="number"
                value={lon}
                onChange={(e) => setLon(parseFloat(e.target.value))}
                style={{ width: "100%", padding: "8px" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Size (km): </label>
            <input
              type="number"
              value={sizeKm}
              min="0.1"
              max="10"
              step="0.1"
              onChange={(e) => setSizeKm(parseFloat(e.target.value))}
              style={{ width: "100%", padding: "8px" }}
            />
            <small style={{ color: "#666" }}>Enter the size of your plot (0.1 - 10 km)</small>
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Land Use Type: </label>
            <select 
              value={landUse} 
              onChange={(e) => setLandUse(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="Industry">Industry</option>
              <option value="Hospital">Hospital</option>
              <option value="School">School/College</option>
              <option value="Residential">Residential</option>
            </select>
          </div>

          {landUse === "Industry" && (
            <div style={{ marginBottom: "15px" }}>
              <label>Industry Type: </label>
              <select
                value={industryType}
                onChange={(e) => setIndustryType(e.target.value)}
                style={{ width: "100%", padding: "8px" }}
              >
                <option value="Copper">Copper</option>
                <option value="Textile">Textile</option>
                <option value="Chemical">Chemical</option>
              </select>
            </div>
          )}

          <button 
            onClick={checkLocation} 
            style={{ 
              width: "100%",
              padding: "10px 20px", 
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              fontSize: "16px"
            }}
          >
            Check Suitability
          </button>
        </div>

        <div style={{ 
          padding: "20px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          {result && (
            <>
              <h3>Analysis Results</h3>
              <div style={{ marginBottom: "10px" }}>
                <p><strong>Location:</strong> {result.lat}, {result.lon}</p>
                <p><strong>State:</strong> {state}</p>
                <p><strong>Transport Distance:</strong> {result.min_transport_distance} km</p>
                <p><strong>Water Distance:</strong> {result.min_water_distance} km</p>
                <p><strong>Residential Distance:</strong> {result.min_residential_distance} km</p>
                <p style={{ 
                  color: result.isSuitable ? "#28a745" : "#dc3545", 
                  fontWeight: "bold",
                  padding: "10px",
                  backgroundColor: result.isSuitable ? "#d4edda" : "#f8d7da",
                  borderRadius: "4px"
                }}>
                  Suitability: {result.isSuitable ? "Suitable" : "Not Suitable"}
                </p>
              </div>

              {!result.isSuitable && nearbyLocations.length > 0 && (
                <div>
                  <h4>Alternative Locations:</h4>
                  {nearbyLocations.map((loc, index) => (
                    <div key={index} style={{ 
                      padding: "10px", 
                      marginBottom: "5px", 
                      backgroundColor: "#fff",
                      borderRadius: "4px"
                    }}>
                      <p><strong>Option {index + 1}:</strong> {loc.lat}, {loc.lon}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {landUse === "Industry" && (
        <div style={{ 
          marginBottom: "20px",
          padding: "15px",
          backgroundColor: "#e9ecef",
          borderRadius: "8px"
        }}>
          <h3>Guidelines for {industryType} Industry</h3>
          <p>{INDUSTRY_GUIDELINES[industryType]}</p>
        </div>
      )}

      <MapContainer
        center={[lat, lon]}
        zoom={14}
        style={{ height: "500px", width: "100%", borderRadius: "8px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {result && (
          <>
            <Marker position={[lat, lon]}>
              <Popup>
                <b>Selected Location</b>
                <br />
                Transport Dist: {result.min_transport_distance} km
                <br />
                Water Dist: {result.min_water_distance} km
                <br />
                Residential Dist: {result.min_residential_distance} km
              </Popup>
            </Marker>
            {boundingBox && (
              <Rectangle 
                bounds={boundingBox}
                pathOptions={{ 
                  color: result.isSuitable ? '#28a745' : '#dc3545',
                  weight: 2,
                  fillOpacity: 0.2
                }}
              >
                <Popup>
                  Plot Size: {sizeKm} x {sizeKm} km
                </Popup>
              </Rectangle>
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default LandSuitabilityChecker;
