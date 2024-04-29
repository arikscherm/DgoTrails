// import React, { useRef, useEffect, useState } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

// mapboxgl.accessToken = 'pk.eyJ1IjoiZXRlZXJpbmciLCJhIjoiY2t2cmE4aXU1MjYybzJvcW40Z25vMjZueCJ9.z1f5zqvMbHhvJj-mZS_RTg';

// export default function App() {

//   //set default states
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng, setLng] = useState(-107.8647);
//   const [lat, setLat] = useState(37.2857);
//   const [zoom, setZoom] = useState(13);

//   useEffect(() => {

//     //if no map present, create new map with specified properties
//     if (!map.current) {
//       map.current = new mapboxgl.Map({
//         container: mapContainer.current,
//         style: 'mapbox://styles/mapbox/satellite-streets-v12',
//         center: [lng, lat],
//         zoom: zoom
//       });

//       map.current.on('move', () => {
//         setLng(map.current.getCenter().lng.toFixed(4));
//         setLat(map.current.getCenter().lat.toFixed(4));
//         setZoom(map.current.getZoom().toFixed(2));
//       });
//     }

//     // Add markers
//     geojson.features.forEach((feature) => {
//       const el = document.createElement('div');
//       el.className = 'marker';
//       new mapboxgl.Marker(el)
//         .setLngLat(feature.geometry.coordinates)
//         .setPopup(new mapboxgl.Popup().setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`))
//         .addTo(map.current);
//     });

//   }, [lng, lat, zoom]);

//   const geojson = {
//     type: 'FeatureCollection',
//     features: [
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [-107.88026565317828, 37.27158829270832]
//         },
//         properties: {
//           title: 'Location',
//           description: 'Leland House/Lola\'s Place'
//         }
//       },
//       {
//         type: 'Feature',
//         geometry: {
//           type: 'Point',
//           coordinates: [-107.84826936137434, 37.29866330413408]
//         },
//         properties: {
//           title: 'Location',
//           description: 'Bread!'
//         }
//       }
//     ]
//   };

//   return (
//     <div>
//       <div className="sidebar">
//         Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//       </div>
//       <div ref={mapContainer} className="map-container" />
//     </div>
//   );
// }

// App.js
import React from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar />
      <Map />
    </div>
  );
}

export default App;
