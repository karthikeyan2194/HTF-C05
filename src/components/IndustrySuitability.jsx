import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from 'leaflet';
import LandRegistrationInfo from './LandRegistrationInfo';

const TRANSPORT_THRESHOLD = 5;
const WATER_THRESHOLD = 2;
const RESIDENTIAL_THRESHOLD = 3;

const INDUSTRY_GUIDELINES = {
  Copper: "Follow environmental guidelines and obtain necessary pollution control board approvals.",
  Textile: "Ensure waste management plans and labor safety regulations compliance.",
  Chemical: "Strict hazardous material handling guidelines must be followed.",
};

const calculateBoundingBox = (lat, lon, sizeAcres) => {
  
  const sizeKm = Math.sqrt(sizeAcres * 0.004047);
  const kmToDegrees = sizeKm / 111;
  return [
    [lat - kmToDegrees/2, lon - kmToDegrees/2],
    [lat + kmToDegrees/2, lon + kmToDegrees/2]
  ];
};

const IndustrySuitability = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [result, setResult] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [industryType, setIndustryType] = useState("Copper");
  const [state, setState] = useState(null);
  const [sizeAcres, setSizeAcres] = useState(1);
  const [boundingBox, setBoundingBox] = useState(null);
  const [mapCenter, setMapCenter] = useState([28.7041, 77.1025]);
  const [mapZoom, setMapZoom] = useState(14);
  const mapRef = useRef(null);

  useEffect(() => {
    setMapCenter([lat, lon]);
    if (mapRef.current) {
      mapRef.current.setView([lat, lon], mapZoom);
    }
  }, [lat, lon, mapZoom]);

  useEffect(() => {
    if (lat && lon && sizeAcres) {
      setBoundingBox(calculateBoundingBox(lat, lon, sizeAcres));
      const distances = generateRandomDistances();
      const isSuitable = checkSuitability(distances);

      setResult({
        lat,
        lon,
        ...distances,
        isSuitable,
      });

      fetchState(lat, lon);
    }
  }, [lat, lon, sizeAcres]);

  useEffect(() => {
    if (result && !result.isSuitable) {
      const suggestions = findNearbySuitableLocations(lat, lon);
      setNearbyLocations(suggestions);
    } else {
      setNearbyLocations([]);
    }
  }, [result]);

  useEffect(() => {
    console.log("Current state value:", state); // Debug log
  }, [state]);

  const handleMapClick = (e) => {
    const { lat: newLat, lng: newLon } = e.latlng;
    setLat(parseFloat(newLat.toFixed(6)));
    setLon(parseFloat(newLon.toFixed(6)));
  };

  const checkSuitability = (features) => {
    return (
      features.min_transport_distance <= TRANSPORT_THRESHOLD &&
      features.min_water_distance <= WATER_THRESHOLD &&
      features.min_residential_distance <= RESIDENTIAL_THRESHOLD
    );
  };

  const generateRandomDistances = () => ({
    min_transport_distance: (Math.random() * (10 - 0.1) + 0.1).toFixed(2),
    min_water_distance: (Math.random() * (5 - 0.1) + 0.1).toFixed(2),
    min_residential_distance: (Math.random() * (8 - 0.5) + 0.5).toFixed(2),
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

  const fetchState = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const address = response.data.address;
      const stateFromResponse = address.state;
      console.log("State from API:", stateFromResponse); // Debug log
      setState(stateFromResponse);
    } catch (error) {
      console.error("Error fetching state:", error);
      setState(null);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "white" }}>Industrial Land Suitability Checker</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ 
          padding: "20px", 
          backgroundColor: "#f8f9fa", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgb(0, 0, 0)"
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
              min="0.25"
              max="100"
              step="0.25"
              onChange={(e) => setSizeAcres(parseFloat(e.target.value))}
              style={{ width: "100%", padding: "8px" }}
            />
            <small style={{ color: "#666" }}>Enter the size of your industrial plot (0.25 - 100 acres)</small>
          </div>

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

          <button 
            onClick={() => {
              const distances = generateRandomDistances();
              const isSuitable = checkSuitability(distances);

              setResult({
                lat,
                lon,
                ...distances,
                isSuitable,
              });

              fetchState(lat, lon);
            }}
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
            <div style={{
              padding: "15px",
              backgroundColor: result.isSuitable ? "#e8f5e9" : "#ffebee",
              borderRadius: "8px",
              marginTop: "20px"
            }}>
              <h3 style={{ 
                color: result.isSuitable ? "#2e7d32" : "#c62828",
                marginTop: 0 
              }}>
                {result.isSuitable ? "Location is Suitable! " : "Location is Not Suitable "}
              </h3>
              <div style={{ marginBottom: "10px" }}>
                <p><strong>Selected Location:</strong> ({result.lat}, {result.lon})</p>
                <p><strong>State:</strong> {state || "Loading..."}</p>
                <p><strong>Transport Distance:</strong> {result.min_transport_distance} km</p>
                <p><strong>Water Source Distance:</strong> {result.min_water_distance} km</p>
                <p><strong>Residential Distance:</strong> {result.min_residential_distance} km</p>
              </div>
              
              {result.isSuitable && (
                <div style={{ marginTop: "20px" }}>
                  <h3 style={{ color: "#1976d2", marginBottom: "15px" }}>Next Steps: Land Registration Process</h3>
                  <LandRegistrationInfo state={state} />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {result && !result.isSuitable && nearbyLocations.length > 0 && (
        <div>
          <h3 style={{ color: 'white' }}>Alternative Locations:</h3>
          {nearbyLocations.map((loc, index) => (
            <div key={index} style={{ 
              padding: "10px", 
              marginBottom: "5px", 
              backgroundColor: "#fff",
              borderRadius: "4px",
            }}>
              <p><strong>Option {index + 1}:</strong> {loc.lat}, {loc.lon}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ 
        marginBottom: "20px",
        padding: "15px",
        backgroundColor: "#e9ecef",
        borderRadius: "8px"
      }}>
        <h3>Guidelines for {industryType} Industry</h3>
        <p>{INDUSTRY_GUIDELINES[industryType]}</p>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "500px", width: "100%", borderRadius: "8px" }}
        ref={mapRef}
        onClick={handleMapClick}
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
                    Plot Size: {sizeAcres} acres
                </Popup>
              </Rectangle>
            )}
          </>
        )}
        {nearbyLocations.map((loc, index) => (
          <Marker 
            key={index} 
            position={[loc.lat, loc.lon]}
            icon={new L.Icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            })}
          >
            <Popup>
              <b>Suggested Location {index + 1}</b>
              <br />
              Transport Dist: {loc.min_transport_distance} km
              <br />
              Water Dist: {loc.min_water_distance} km
              <br />
              Residential Dist: {loc.min_residential_distance} km
            </Popup>
          </Marker>
        ))}
        <div className="map-instructions" style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'white',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          Click on the map to select a location
        </div>
      </MapContainer>
    </div>
  );
};

export default IndustrySuitability;
