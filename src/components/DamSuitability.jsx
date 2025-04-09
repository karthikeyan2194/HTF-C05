import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Rectangle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const RIVER_FLOW_THRESHOLD = 1000;
const GEOLOGICAL_STABILITY_THRESHOLD = 0.8;
const POPULATION_IMPACT_THRESHOLD = 5000;

const DAM_GUIDELINES = {
  Hydroelectric:
    "Follow environmental impact assessment and power generation standards.",
  Irrigation: "Ensure proper water distribution and management systems.",
  FloodControl: "Implement flood monitoring and emergency response systems.",
};

const calculateBoundingBox = (lat, lon, radiusMeters) => {
  const kmToDegrees = radiusMeters / 1000 / 111;
  return [
    [lat - kmToDegrees / 2, lon - kmToDegrees / 2],
    [lat + kmToDegrees / 2, lon + kmToDegrees / 2],
  ];
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  box: {
    background: "linear-gradient(135deg, #d4fc79, #96e6a1)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#333",
    marginBottom: "15px",
  },
  inputGroup: {
    marginBottom: "15px",
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  select: {
    padding: "8px",
    fontSize: "14px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "5px",
  },
  resultBox: {
    background: "linear-gradient(135deg, #84fab0, #8fd3f4)",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  guidelines: {
    marginTop: "10px",
    fontStyle: "italic",
    textAlign: "center",
  },
  nearbyBox: {
    background: "linear-gradient(135deg, #fddb92, #d1fdff)",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "30px",
  },
  ul: {
    listStyleType: "none",
    padding: 0,
  },
  li: {
    margin: "8px 0",
  },
};

const DamSuitability = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [result, setResult] = useState(null);
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [damType, setDamType] = useState("Hydroelectric");
  const [radius, setRadius] = useState(2000);
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
    if (lat && lon && radius) {
      setBoundingBox(calculateBoundingBox(lat, lon, radius));
      const conditions = generateRandomConditions();
      const isSuitable = checkSuitability(conditions);

      setResult({
        suitable: isSuitable,
        message: isSuitable
          ? "This location is suitable for dam construction."
          : "This location may not be ideal for dam construction.",
      });

      fetchNearbyLocations();
    }
  }, [lat, lon, radius, damType]);

  const generateRandomConditions = () => {
    return {
      riverFlow: Math.random() * 2000,
      geologicalStability: Math.random(),
      populationImpact: Math.random() * 10000,
    };
  };

  const checkSuitability = (conditions) => {
    const { riverFlow, geologicalStability, populationImpact } = conditions;

    return (
      riverFlow >= RIVER_FLOW_THRESHOLD &&
      geologicalStability >= GEOLOGICAL_STABILITY_THRESHOLD &&
      populationImpact <= POPULATION_IMPACT_THRESHOLD
    );
  };

  const fetchNearbyLocations = async () => {
    try {
      const response = {
        data: [
          { name: "River Basin", distance: "0.5km" },
          { name: "Forest Area", distance: "3.2km" },
          { name: "Settlement", distance: "4.8km" },
        ],
      };
      setNearbyLocations(response.data);
    } catch (error) {
      console.error("Error fetching nearby locations:", error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.heading}>Dam Construction Suitability Checker</h2>
        <div style={styles.inputGroup}>
          <label>Latitude:</label>
          <input
            type="number"
            value={lat}
            onChange={(e) => setLat(parseFloat(e.target.value))}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Longitude:</label>
          <input
            type="number"
            value={lon}
            onChange={(e) => setLon(parseFloat(e.target.value))}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Dam Type:</label>
          <select
            value={damType}
            onChange={(e) => setDamType(e.target.value)}
            style={styles.select}
          >
            <option value="Hydroelectric">Hydroelectric</option>
            <option value="Irrigation">Irrigation</option>
            <option value="FloodControl">Flood Control</option>
          </select>
        </div>
        <div style={styles.inputGroup}>
          <label>Dam Radius (meters):</label>
          <input
            type="number"
            value={radius}
            onChange={(e) => setRadius(parseFloat(e.target.value))}
            min="100"
            max="10000"
            step="100"
            style={styles.input}
          />
          <small style={{ color: "#666", padding:"5px 5px" }}>
            Enter the radius of the dam (100m - 10,000m)
          </small>
        </div>
      </div>

      <div style={{ ...styles.box, padding: 0, overflow: "hidden" }}>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "400px", width: "100%", borderRadius: "12px" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {boundingBox && (
            <Rectangle
              bounds={boundingBox}
              pathOptions={{ color: result?.suitable ? "green" : "red" }}
            />
          )}
        </MapContainer>
      </div>

      {result && (
        <div style={styles.resultBox}>
          <h3>Analysis Result</h3>
          <p>{result.message}</p>
          <div style={styles.guidelines}>
            <h4>Construction Guidelines:</h4>
            <p>{DAM_GUIDELINES[damType]}</p>
          </div>
        </div>
      )}

      {nearbyLocations.length > 0 && (
        <div style={styles.nearbyBox}>
          <h3 style={{ textAlign: "center" }}>Nearby Locations</h3>
          <ul style={styles.ul}>
            {nearbyLocations.map((location, index) => (
              <li key={index} style={styles.li}>
                {location.name} - {location.distance}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DamSuitability;
