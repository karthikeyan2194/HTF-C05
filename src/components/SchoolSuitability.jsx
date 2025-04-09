import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import SchoolRegistrationInfo from './SchoolRegistrationInfo';

const TRANSPORT_THRESHOLD = 2;
const RESIDENTIAL_THRESHOLD = 1;
const NOISE_THRESHOLD = 3;
const POLLUTION_THRESHOLD = 2;

const SCHOOL_GUIDELINES = {
  Primary: "Must have safe pedestrian access and playground facilities.",
  Secondary: "Requires sports facilities and science lab infrastructure.",
  College: "Need extensive campus space and research facilities.",
};

const calculateBoundingBox = (lat, lon, sizeAcres) => {
  
  const sizeKmEquivalent = Math.sqrt(sizeAcres * 0.004047);
  const kmToDegrees = sizeKmEquivalent / 111;
  return [
    [lat - kmToDegrees/2, lon - kmToDegrees/2],
    [lat + kmToDegrees/2, lon + kmToDegrees/2]
  ];
};

const SchoolSuitability = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [result, setResult] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [schoolType, setSchoolType] = useState("Primary");
  const [state, setState] = useState(null);
  const [sizeAcres, setSizeAcres] = useState(2);
  const [soilType, setSoilType] = useState("");
  const [budget, setBudget] = useState("");
  const [boundingBox, setBoundingBox] = useState(null);

  useEffect(() => {
    if (lat && lon && sizeAcres) {
      setBoundingBox(calculateBoundingBox(lat, lon, sizeAcres));
    }
  }, [lat, lon, sizeAcres]);

  const checkSuitability = (features) => {
    return (
      features.min_transport_distance <= TRANSPORT_THRESHOLD &&
      features.min_residential_distance <= RESIDENTIAL_THRESHOLD &&
      features.noise_level <= NOISE_THRESHOLD &&
      features.pollution_level <= POLLUTION_THRESHOLD
    );
  };

  const generateRandomDistances = () => ({
    min_transport_distance: (Math.random() * (4 - 0.1) + 0.1).toFixed(2),
    min_residential_distance: (Math.random() * (3 - 0.1) + 0.1).toFixed(2),
    noise_level: (Math.random() * (5 - 0.1) + 0.1).toFixed(2),
    pollution_level: (Math.random() * (4 - 0.1) + 0.1).toFixed(2),
  });

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

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>Educational Institution Land Suitability Checker</h2>
      
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
            <label>Plot Size (acres): </label>
            <input
              type="number"
              value={sizeAcres}
              min="0.5"
              max="25"
              step="0.25"
              onChange={(e) => setSizeAcres(parseFloat(e.target.value))}
              style={{ width: "100%", padding: "8px" }}
            />
            <small style={{ color: "#666" }}>Enter the size of your school plot (0.5 - 25 acres)</small>
            </div>

            <div style={{ marginBottom: "15px" }}>
            <label>Soil Type: </label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="">Select Soil Type</option>
              <option value="clay">Clay</option>
              <option value="sandy">Sandy</option>
              <option value="loam">Loam</option>
              <option value="silt">Silt</option>
            </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
            <label>Budget (₹): </label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
              min="0"
            />
            </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Institution Type: </label>
            <select
              value={schoolType}
              onChange={(e) => setSchoolType(e.target.value)}
              style={{ width: "100%", padding: "8px" }}
            >
              <option value="Primary">Primary School</option>
              <option value="Secondary">Secondary School</option>
              <option value="College">College</option>
            </select>
          </div>

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
                <p><strong>Residential Distance:</strong> {result.min_residential_distance} km</p>
                <p><strong>Noise Level:</strong> {result.noise_level} (threshold: {NOISE_THRESHOLD})</p>
                <p><strong>Pollution Level:</strong> {result.pollution_level} (threshold: {POLLUTION_THRESHOLD})</p>
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

      {result && result.isSuitable && (
        <div style={{ marginBottom: "20px" }}>
          <SchoolRegistrationInfo state={state} />
        </div>
      )}

      <div style={{ 
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#e9ecef",
        borderRadius: "8px"
      }}>
        <h3>Guidelines for {schoolType}</h3>
        <p>{SCHOOL_GUIDELINES[schoolType]}</p>
      </div>

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
                Residential Dist: {result.min_residential_distance} km
                <br />
                Noise Level: {result.noise_level}
                <br />
                Pollution Level: {result.pollution_level}
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
                    Plot Size: {sizeAcres} acres
                </Popup>
              </Rectangle>
            )}
          </>
        )}
      </MapContainer>
    </div>
  );
};

export default SchoolSuitability;
