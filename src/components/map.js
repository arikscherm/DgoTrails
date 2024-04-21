import React, { useRef, useEffect, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import './map.css';
import './markers.css';

export default function Map() {
  const api_key = '8klodUSY7uqQuezf04fm';
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng] = useState(-107.87931772249397);
  const [lat] = useState(37.274073712177284);
  const [zoom] = useState(16);
  //const [API_KEY] = useState(api_key);

  useEffect(() => {
    // stops map from intializing more than once
    if (map.current) return;

    //initialize new map
    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${api_key}`,
      center: [lng, lat],
      zoom: zoom,
    });

    //create new controls and add to current map
    map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
    map.current.addControl(new maplibregl.FullscreenControl());
    map.current.addControl(new maplibregl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true
    }));

    //add marker to current map, set color and location
    new maplibregl.Marker({color: "#FF0080"})
    .setLngLat([-107.88019551656059, 37.271466528490556])
    .addTo(map.current);

    // icon size: 47 x 69px, shadow adds: 6px
    // lat: 47.46101649104483, lon: 8.551922366826949
    var cityHallIcon = document.createElement('div');
    cityHallIcon.classList.add("cityHall");

    var cityHallPopup = new maplibregl.Popup({
      anchor: 'bottom',
      offset: [0, -640] // height - shadow
    })
    .setText('Durango city hall!');

    const cityHall = new maplibregl.Marker(cityHallIcon, {
        anchor: 'bottom',
        offset: [0, 6]
      })
      .setLngLat([-107.87928551528198, 37.27414208360733])
      .setPopup(cityHallPopup)
      .addTo(map.current);

      cityHallIcon.onclick = (event) => {
        // you can add custom logic here. For example, modify popup.
        cityHallPopup.setHTML("<h3>I'm clicked!</h3>");
      }
      
      cityHallIcon.onmouseenter = () => cityHall.togglePopup(); // show/hide popup on mouse hover
      cityHallIcon.onmouseleave = () => cityHall.togglePopup();
    
  }, [api_key, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}

// import React, { useRef, useEffect, useState } from 'react';
// import maplibregl from 'maplibre-gl';
// import 'maplibre-gl/dist/maplibre-gl.css';
// import './map.css';

// export default function Map() {
//   const api_key = '8klodUSY7uqQuezf04fm';
//   const mapContainer = useRef(null);
//   const map = useRef(null);
//   const [lng] = useState(-107.87931772249397);
//   const [lat] = useState(37.274073712177284);
//   const [zoom] = useState(16);

//   useEffect(() => {
//     if (map.current) return;

//     map.current = new maplibregl.Map({
//       container: mapContainer.current,
//       style: `https://api.maptiler.com/maps/streets-v2/style.json?key=${api_key}`,
//       center: [lng, lat],
//       zoom: zoom,
//     });

//     map.current.on('load', () => {
//       const geojson = {
//         type: 'FeatureCollection',
//         features: [
//           {
//             type: 'Feature',
//             properties: {
//               message: 'Foo',
//               iconSize: [60, 60]
//             },
//             geometry: {
//               type: 'Point',
//               coordinates: [-66.324462890625, -16.024695711685304]
//             }
//           },
//           {
//             type: 'Feature',
//             properties: {
//               message: 'Bar',
//               iconSize: [50, 50]
//             },
//             geometry: {
//               type: 'Point',
//               coordinates: [-61.2158203125, -15.97189158092897]
//             }
//           },
//           {
//             type: 'Feature',
//             properties: {
//               message: 'Baz',
//               iconSize: [40, 40]
//             },
//             geometry: {
//               type: 'Point',
//               coordinates: [-63.29223632812499, -18.28151823530889]
//             }
//           }
//         ]
//       };

//       geojson.features.forEach(marker => {
//         const el = document.createElement('div');
//         el.className = 'marker';
//         el.style.backgroundImage = `url(https://placekitten.com/g/${marker.properties.iconSize.join('/')})`;
//         el.style.width = `${marker.properties.iconSize[0]}px`;
//         el.style.height = `${marker.properties.iconSize[1]}px`;

//         el.addEventListener('click', () => {
//           window.alert(marker.properties.message);
//         });

//         new maplibregl.Marker({ element: el })
//           .setLngLat(marker.geometry.coordinates)
//           .addTo(map.current);
//       });
//     });

//     map.current.addControl(new maplibregl.NavigationControl(), 'top-right');
//     map.current.addControl(new maplibregl.FullscreenControl());
//     map.current.addControl(new maplibregl.GeolocateControl({
//       positionOptions: {
//         enableHighAccuracy: true
//       },
//       trackUserLocation: true
//     }));

//     return () => {
//       if (map.current) {
//         map.current.remove();
//         map.current = null;
//       }
//     };
//   }, [api_key, lng, lat, zoom]);

//   return (
//     <div className="map-wrap">
//       <div ref={mapContainer} className="map" />
//     </div>
//   );
// }
