import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

const resourceTypes = {
  cement: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    name: 'Cement Company'
  },
  quarry: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png',
    name: 'Quarry'
  },
  refinery: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    name: 'Refinery'
  },
  mining: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png',
    name: 'Mining Company'
  },
  water: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    name: 'Water Resource'
  },
  steel: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    name: 'Steel Manufacturer'
  },
  plastic: {
    icon: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
    name: 'Plastic Manufacturer'
  }
};

const ResourceMarkers = ({ resources }) => {
  const createIcon = (type) => {
    return new L.Icon({
      iconUrl: resourceTypes[type].icon,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <>
      {resources.map((resource, index) => (
        <Marker
          key={index}
          position={[resource.lat, resource.lon]}
          icon={createIcon(resource.type)}
        >
          <Popup>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{resource.name}</h4>
              <p style={{ margin: '0 0 5px 0' }}><strong>Type:</strong> {resourceTypes[resource.type].name}</p>
              <p style={{ margin: '0 0 5px 0' }}><strong>Distance:</strong> {resource.distance.toFixed(2)} km</p>
              {resource.contact && (
                <p style={{ margin: '0' }}><strong>Contact:</strong> {resource.contact}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default ResourceMarkers;
