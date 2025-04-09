import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const TRANSPORT_THRESHOLD = 5; 
const WATER_THRESHOLD = 2;      
const RESIDENTIAL_THRESHOLD = 3;

const industryTypes = {
  Copper: "Orange",
  Chemical: "Red",
  Textile: "Green",
  FoodProcessing: "Green",
};

const landUsageOptions = [
  "Industry",
  "Hospital",
  "Schools/Colleges",
  "Residential",
];

const guidelines = {
  Industry: {
    Copper: "Follow pollution control guidelines. Obtain environmental clearance.",
    Chemical: "Strict environmental regulations. Hazardous waste management required.",
    Textile: "Water treatment plant setup required before operations.",
    FoodProcessing: "Ensure compliance with FSSAI regulations.",
  },
  Hospital: "Obtain health department approval. Follow building codes for safety.",
  SchoolsColleges: "Follow educational board guidelines. Ensure accessibility compliance.",
  Residential: "Zoning approvals needed. Infrastructure availability should be verified.",
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

const LandSuitabilityChecker = () => {
  const [lat, setLat] = useState(28.7041);
  const [lon, setLon] = useState(77.1025);
  const [landUsage, setLandUsage] = useState("");
  const [industryType, setIndustryType] = useState("");
  const [result, setResult] = useState(null);

  const checkLocation = () => {
    if (!landUsage) {
      alert("Please select a land usage type.");
      return;
    }

    const distances = generateRandomDistances();
    const isSuitable = checkSuitability(distances);
    setResult({
      lat,
      lon,
      ...distances,
      isSuitable,
    });
  };

  return (
    <div>
      <h2>MAP-IN-DUST</h2>
      
      <div>
        <label>Latitude: </label>
        <input
          type="number"
          value={lat}
          onChange={(e) => setLat(parseFloat(e.target.value))}
        />
        <label>Longitude: </label>
        <input
          type="number"
          value={lon}
          onChange={(e) => setLon(parseFloat(e.target.value))}
        />
      </div>

      <div>
        <label>Select Land Usage: </label>
        <select
          value={landUsage}
          onChange={(e) => setLandUsage(e.target.value)}
        >
          <option value="">--Select--</option>
          {landUsageOptions.map((usage, index) => (
            <option key={index} value={usage}>
              {usage}
            </option>
          ))}
        </select>
      </div>

      {landUsage === "Industry" && (
        <div>
          <label>Select Industry Type: </label>
          <select
            value={industryType}
            onChange={(e) => setIndustryType(e.target.value)}
          >
            <option value="">--Select Industry--</option>
            {Object.keys(industryTypes).map((type, index) => (
              <option key={index} value={type}>
                {type} (Code: {industryTypes[type]})
              </option>
            ))}
          </select>
        </div>
      )}

      <button onClick={checkLocation}>Check Suitability</button>

      {result && (
        <div>
          <p>
            <strong>Result:</strong>
            <br />
            Transport Dist: {result.min_transport_distance} km
            <br />
            Water Dist: {result.min_water_distance} km
            <br />
            Residential Dist: {result.min_residential_distance} km
            <br />
            Suitability: {result.isSuitable ? "Suitable" : "Not Suitable"}
            <br />
          </p>

          {landUsage === "Industry" && industryType && (
            <p>
              <strong>Industry Code:</strong> {industryTypes[industryType]}{" "}
              <br />
              <strong>Guidelines:</strong> {guidelines["Industry"][industryType]}
            </p>
          )}

          {landUsage !== "Industry" && landUsage && (
            <p>
              <strong>Guidelines:</strong> {guidelines[landUsage.replace("/", "")]}
            </p>
          )}
        </div>
      )}

      <MapContainer
        center={[lat, lon]}
        zoom={14}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {result && (
          <Marker position={[lat, lon]}>
            <Popup>
              <b>Selected Location</b>
              <br />
              Transport Dist: {result.min_transport_distance} km
              <br />
              Water Dist: {result.min_water_distance} km
              <br />
              Residential Dist: {result.min_residential_distance} km
              <br />
              Suitability: {result.isSuitable ? "Suitable" : "Not Suitable"}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default LandSuitabilityChecker;
