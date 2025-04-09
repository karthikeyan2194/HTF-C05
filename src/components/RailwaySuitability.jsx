import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from 'leaflet';

const POPULATION_DENSITY_THRESHOLD = 2000;
const TERRAIN_GRADE_THRESHOLD = 2.5; 
const EXISTING_STATION_THRESHOLD = 10; 

const RAILWAY_GUIDELINES = {
  MainLine: "Follow railway safety standards and obtain necessary clearances.",
  SuburbanLine: "Ensure proper station spacing and passenger facilities.",
  HighSpeed: "Special track and signaling requirements apply.",
};

const calculateBoundingBox = (lat, lon, sizeKm) => {
  const kmToDegrees = sizeKm / 111;
  return [
    [lat - kmToDegrees/2, lon - kmToDegrees/2],
    [lat + kmToDegrees/2, lon + kmToDegrees/2]
  ];
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '30px',
    fontFamily: "'Segoe UI', sans-serif",
    color: '#333',
  },
  sectionBox: {
    background: 'linear-gradient(to bottom right, #f0f9ff, #d9eefa)',
    padding: '20px',
    marginBottom: '25px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    border: '1px solid #b3d4fc',
  },
  sectionTitle: {
    marginBottom: '15px',
    color: '#2c3e50',
  },
  inputGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontWeight: 600,
    color: '#1a3c63',
  },
  input: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
  },
  mapContainer: {
    height: '420px',
  },
  resultSection: (isSuitable) => ({
    background: isSuitable
      ? 'linear-gradient(to right, #e9fce9, #d4f8d4)'
      : 'linear-gradient(to right, #ffeaea, #fddada)',
    padding: '20px',
    borderRadius: '12px',
    borderLeft: `8px solid ${isSuitable ? '#28a745' : '#dc3545'}`,
    marginBottom: '25px',
  }),
  guidelinesBox: {
    background: '#eef7ff',
    padding: '10px',
    borderRadius: '6px',
    borderLeft: '4px solid #3399ff',
    marginTop: '10px',
    textAlign: 'center',
  },
  nearbyList: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  nearbyItem: {
    padding: '8px 0',
    borderBottom: '1px solid #ddd',
  },
};

const RailwaySuitability = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [result, setResult] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [railwayType, setRailwayType] = useState("MainLine");
  const [sizeKm, setSizeKm] = useState(2);
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
    if (lat && lon && sizeKm) {
      setBoundingBox(calculateBoundingBox(lat, lon, sizeKm));
      const distances = generateRandomDistances();
      const isSuitable = checkSuitability(distances);

      setResult({
        suitable: isSuitable,
        message: isSuitable 
          ? "This location is suitable for railway construction." 
          : "This location may not be ideal for railway construction."
      });

      fetchNearbyLocations();
    }
  }, [lat, lon, sizeKm, railwayType]);

  const generateRandomDistances = () => {
    return {
      populationDensity: Math.random() * 4000,
      terrainGrade: Math.random() * 5,
      existingStation: Math.random() * 20
    };
  };

  const checkSuitability = (distances) => {
    const { populationDensity, terrainGrade, existingStation } = distances;

    return (
      populationDensity >= POPULATION_DENSITY_THRESHOLD &&
      terrainGrade <= TERRAIN_GRADE_THRESHOLD &&
      existingStation >= EXISTING_STATION_THRESHOLD
    );
  };

  const fetchNearbyLocations = async () => {
    try {
      const response = {
        data: [
          { name: "City Center", distance: "5.2km" },
          { name: "Business District", distance: "3.5km" },
          { name: "Suburban Area", distance: "1.8km" }
        ]
      };
      setNearbyLocations(response.data);
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.sectionBox}>
        <h2 style={styles.sectionTitle}>Railway Construction Suitability Checker</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Latitude:</label>
          <input style={styles.input} type="number" value={lat} onChange={(e) => setLat(parseFloat(e.target.value))} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Longitude:</label>
          <input style={styles.input} type="number" value={lon} onChange={(e) => setLon(parseFloat(e.target.value))} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Railway Type:</label>
          <select style={styles.input} value={railwayType} onChange={(e) => setRailwayType(e.target.value)}>
            <option value="MainLine">Main Line</option>
            <option value="SuburbanLine">Suburban Line</option>
            <option value="HighSpeed">High Speed Rail</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Size (km):</label>
          <input style={styles.input} type="number" value={sizeKm} onChange={(e) => setSizeKm(parseFloat(e.target.value))} />
        </div>
      </div>

      <div style={styles.sectionBox}>
        <div style={styles.mapContainer}>
          <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }} ref={mapRef}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {boundingBox && (
              <Rectangle bounds={boundingBox} pathOptions={{ color: result?.suitable ? 'green' : 'red' }} />
            )}
          </MapContainer>
        </div>
      </div>

      {result && (
        <div style={styles.resultSection(result.suitable)}>
          <h3>Analysis Result</h3>
          <p>{result.message}</p>
          <div>
            <h4>Construction Guidelines:</h4>
            <p style={styles.guidelinesBox}>{RAILWAY_GUIDELINES[railwayType]}</p>
          </div>
        </div>
      )}

      {nearbyLocations.length > 0 && (
        <div style={styles.sectionBox}>
          <h3>Nearby Locations</h3>
          <ul style={styles.nearbyList}>
            {nearbyLocations.map((location, index) => (
              <li key={index} style={styles.nearbyItem}>
                {location.name} - {location.distance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RailwaySuitability;
