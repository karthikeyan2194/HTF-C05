import L from 'leaflet';

export const resourceIcons = {
  cement: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/8861/8861420.png',
    name: 'Cement Company'
  },
  quarry: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/2991/2991442.png',
    name: 'Quarry'
  },
  refinery: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/1785/1785210.png',
    name: 'Refinery'
  },
  mining: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/2991/2991448.png',
    name: 'Mining Company'
  },
  water: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/606/606797.png',
    name: 'Water Resource'
  },
  steel: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/1785/1785296.png',
    name: 'Steel Manufacturer'
  },
  plastic: {
    iconUrl: 'https://cdn-icons-png.flaticon.com/32/1554/1554591.png',
    name: 'Plastic Manufacturer'
  }
};

export const createResourceIcon = (type) => {
  return new L.Icon({
    iconUrl: resourceIcons[type].iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

export const companyNames = {
  cement: ['UltraTech Cement', 'ACC Limited', 'Ambuja Cements', 'JK Cement', 'Shree Cement'],
  quarry: ['Stone Quarry', 'Granite Quarry', 'Limestone Quarry', 'Marble Quarry', 'Sand Quarry'],
  refinery: ['Indian Oil', 'Bharat Petroleum', 'Hindustan Petroleum', 'Reliance Refinery', 'Nayara Energy'],
  mining: ['Coal India', 'NMDC', 'Vedanta', 'Hindalco', 'Adani Mining'],
  water: ['Lake', 'River', 'Reservoir', 'Water Treatment Plant', 'Natural Spring'],
  steel: ['Tata Steel', 'JSW Steel', 'SAIL', 'Jindal Steel', 'Essar Steel'],
  plastic: ['Supreme Industries', 'Nilkamal', 'Finolex Industries', 'Prince Pipes', 'Jain Irrigation']
};
