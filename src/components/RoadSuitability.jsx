import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const POPULATION_THRESHOLD = 1000;
const TERRAIN_SLOPE_THRESHOLD = 15;
const EXISTING_ROAD_THRESHOLD = 2;

const ROAD_GUIDELINES = {
  Highway: "Follow national highway construction standards and environmental clearance.",
  LocalRoad: "Ensure proper drainage and pedestrian facilities.",
  Bridge: "Conduct thorough geological and hydrological surveys.",
};

const calculateBoundingBox = (lat, lon, sizeKm) => {
  const kmToDegrees = sizeKm / 111;
  return [
    [lat - kmToDegrees / 2, lon - kmToDegrees / 2],
    [lat + kmToDegrees / 2, lon + kmToDegrees / 2],
  ];
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "2rem",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    borderRadius: "24px",
    color: "white",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.2)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  inputSection: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "1.5rem",
    borderRadius: "16px",
    marginBottom: "2rem",
  },
  heading: {
    textAlign: "center",
    marginBottom: "1rem",
    color: "#fff",
  },
  inputGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "10px 0",
  },
  label: {
    flex: 1,
    fontWeight: "bold",
    marginRight: "1rem",
  },
  input: {
    flex: 2,
    padding: "8px",
    borderRadius: "8px",
    border: "none",
    fontSize: "1rem",
  },
  mapContainer: {
    borderRadius: "16px",
    overflow: "hidden",
    marginBottom: "2rem",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
    height: "400px",
    width: "100%",
  },
  resultSection: {
    padding: "1rem",
    borderRadius: "12px",
    marginBottom: "2rem",
    background: "rgba(255, 255, 255, 0.15)",
  },
  guidelines: {
    marginTop: "1rem",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "1rem",
    borderRadius: "8px",
  },
  nearbySection: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "1rem",
    borderRadius: "12px",
  },
  list: {
    listStyle: "none",
    paddingLeft: "1rem",
  },
  listItem: {
    marginBottom: "0.5rem",
  },
};

const RoadSuitability = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [result, setResult] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [roadType, setRoadType] = useState("Highway");
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
          ? "This location is suitable for road construction."
          : "This location may not be ideal for road construction.",
      });

      fetchNearbyLocations();
    }
  }, [lat, lon, sizeKm, roadType]);

  const generateRandomDistances = () => {
    return {
      population: Math.random() * 2000,
      terrainSlope: Math.random() * 30,
      existingRoad: Math.random() * 5,
    };
  };

  const checkSuitability = ({ population, terrainSlope, existingRoad }) =>
    population >= POPULATION_THRESHOLD &&
    terrainSlope <= TERRAIN_SLOPE_THRESHOLD &&
    existingRoad >= EXISTING_ROAD_THRESHOLD;

  const fetchNearbyLocations = async () => {
    try {
      const response = {
        data: [
          { name: "Town Center", distance: "1.2km" },
          { name: "Industrial Area", distance: "2.5km" },
          { name: "Residential Zone", distance: "0.8km" },
        ],
      };
      setNearbyLocations(response.data);
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.inputSection}>
        <h2 style={styles.heading}>Road Construction Suitability Checker</h2>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Latitude:</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Longitude:</label>
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(parseFloat(e.target.value))}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Road Type:</label>
          <select
            value={roadType}
            onChange={(e) => setRoadType(e.target.value)}
            style={styles.input}
          >
            <option value="Highway">Highway</option>
            <option value="LocalRoad">Local Road</option>
            <option value="Bridge">Bridge</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Size (km):</label>
          <input
            type="number"
            value={sizeKm}
            onChange={(e) => setSizeKm(parseFloat(e.target.value))}
            style={styles.input}
          />
        </div>
      </div>

      <div style={styles.mapContainer}>
        <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: "100%", width: "100%" }} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {boundingBox && (
            <Rectangle bounds={boundingBox} pathOptions={{ color: result?.suitable ? "lime" : "red" }} />
          )}
        </MapContainer>
      </div>

      {result && (
        <div style={{
          ...styles.resultSection,
          borderLeft: `6px solid ${result.suitable ? "#4caf50" : "#f44336"}`
        }}>
          <h3>Analysis Result</h3>
          <p>{result.message}</p>
          <div style={styles.guidelines}>
            <h4>Construction Guidelines:</h4>
            <p>{ROAD_GUIDELINES[roadType]}</p>
          </div>
        </div>
      )}

      {nearbyLocations.length > 0 && (
        <div style={styles.nearbySection}>
          <h3>Nearby Locations</h3>
          <ul style={styles.list}>
            {nearbyLocations.map((location, index) => (
              <li key={index} style={styles.listItem}>
                {location.name} - {location.distance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default RoadSuitability;
