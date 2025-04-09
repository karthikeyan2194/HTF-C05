import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from 'leaflet';
import { defaultIcon } from '../utils/leafletConfig';

const ParkSuitability = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [radius, setRadius] = useState(500); 
  const [result, setResult] = useState(null);
  const [state, setState] = useState(null);
  const [parkType, setParkType] = useState("neighborhood");
  const [mapCenter, setMapCenter] = useState([28.7041, 77.1025]);
  const [mapZoom, setMapZoom] = useState(14);
  const mapRef = useRef(null);

  const parkTypes = {
    neighborhood: {
      name: "Neighborhood Park",
      minArea: "2-4 acres",
      facilities: ["Playground", "Walking Paths", "Benches", "Small Garden"],
      requirements: ["Accessible within 10-minute walk", "Well-lit areas", "Safety features"]
    },
    community: {
      name: "Community Park",
      minArea: "10-50 acres",
      facilities: ["Sports Fields", "Community Center", "Picnic Areas", "Parking"],
      requirements: ["Central location", "Multiple access points", "Event spaces"]
    },
    regional: {
      name: "Regional Park",
      minArea: "50+ acres",
      facilities: ["Nature Trails", "Water Features", "Amphitheater", "Visitor Center"],
      requirements: ["Natural preservation", "Educational facilities", "Tourism infrastructure"]
    },
    specialty: {
      name: "Specialty Park",
      minArea: "Varies",
      facilities: ["Theme-based Attractions", "Specialized Equipment", "Unique Features"],
      requirements: ["Specific purpose design", "Special maintenance", "Unique attractions"]
    }
  };

  const handleMapClick = (e) => {
    const { lat: newLat, lng: newLon } = e.latlng;
    setLat(newLat);
    setLon(newLon);
    checkSuitability(newLat, newLon);
  };

  const checkSuitability = async (latitude, longitude) => {
    try {
      const populationDensity = Math.random() * 10000;
      const greenCoverage = Math.random() * 100;
      const noiseLevel = Math.random() * 100;
      const airQuality = Math.random() * 100;
      const accessibility = Math.random() * 100;

      const isSuitable = 
        (parkType === "neighborhood" && populationDensity > 5000 && greenCoverage > 20) ||
        (parkType === "community" && populationDensity > 2000 && greenCoverage > 30) ||
        (parkType === "regional" && greenCoverage > 40 && accessibility > 70) ||
        (parkType === "specialty" && accessibility > 80);

      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      setState(response.data.address.state);

      setResult({
        isSuitable,
        factors: {
          populationDensity: populationDensity.toFixed(2),
          greenCoverage: greenCoverage.toFixed(2),
          noiseLevel: noiseLevel.toFixed(2),
          airQuality: airQuality.toFixed(2),
          accessibility: accessibility.toFixed(2)
        }
      });
    } catch (error) {
      console.error("Error checking suitability:", error);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", color: "white", padding: "5px 3px", }}>Park Infrastructure Suitability Checker</h2>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
        <div style={{ 
          padding: "20px", 
          backgroundColor: "white", 
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Park Type:</label>
            <select
              value={parkType}
              onChange={(e) => setParkType(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd"
              }}
            >
              {Object.keys(parkTypes).map(type => (
                <option key={type} value={type}>
                  {parkTypes[type].name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>Park Radius (meters):</label>
            <input
              type="number"
              value={radius}
              onChange={(e) => setRadius(Number(e.target.value))}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ddd"
              }}
            />
          </div>

          {result && (
            <div style={{ marginTop: "20px" }}>
              <h3>Suitability Results</h3>
              <div style={{
                padding: "15px",
                backgroundColor: result.isSuitable ? "#e6ffe6" : "#ffe6e6",
                borderRadius: "4px",
                marginBottom: "15px",
                textAlign: "center"
              }}>
                <strong>Status:</strong> {result.isSuitable ? "Suitable" : "Not Suitable"}
              </div>
              <div>
                <h4>Factors:</h4>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  <li>Population Density: {result.factors.populationDensity} per km²</li>
                  <li>Green Coverage: {result.factors.greenCoverage}%</li>
                  <li>Noise Level: {result.factors.noiseLevel} dB</li>
                  <li>Air Quality: {result.factors.airQuality}/100</li>
                  <li>Accessibility: {result.factors.accessibility}%</li>
                </ul>
              </div>
            </div>
          )}

          {parkType && (
            <div style={{ marginTop: "20px" }}>
              <h3 style={{ textAlign: "center" }}>Park Requirements</h3>
              <div style={{
                backgroundColor: "#f8f9fa",
                padding: "20px",
                borderRadius: "4px",
                textAlign: "center"
              }}>
                <p><strong>Minimum Area:</strong> {parkTypes[parkType].minArea}</p>
                <p><strong>Required Facilities:</strong></p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {parkTypes[parkType].facilities.map((facility, index) => (
                    <li key={index}>{facility}</li>
                  ))}
                </ul>
                <p><strong>Requirements:</strong></p>
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {parkTypes[parkType].requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div>
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "500px", width: "100%", borderRadius: "8px" }}
            ref={mapRef}
            onClick={handleMapClick}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <Marker position={[lat, lon]} icon={defaultIcon}>
              <Popup>
                Selected Location
                <br />
                Lat: {lat.toFixed(4)}, Lon: {lon.toFixed(4)}
              </Popup>
            </Marker>

            <Circle
              center={[lat, lon]}
              radius={radius}
              pathOptions={{
                color: result?.isSuitable ? "green" : "red",
                fillColor: result?.isSuitable ? "#90EE90" : "#FFB6C1",
                fillOpacity: 0.3
              }}
            />

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
              Click on the map to select location
            </div>
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default ParkSuitability;
