import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = 'pk.eyJ1IjoiZXRlZXJpbmciLCJhIjoiY2x2bGh2N3R5MmNwbDJqczIwOW41eG83diJ9.VHctcEQpaf5jumCjZVoBkA';

export default function Map() {

  //set default states
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-107.8647);
  const [lat, setLat] = useState(37.2857);
  const [zoom, setZoom] = useState(13);

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-107.88026565317828, 37.27158829270832]
        },
        properties: {
          title: 'Location',
          description: 'Leland House/Lola\'s Place'
        }
      },
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-107.84826936137434, 37.29866330413408]
        },
        properties: {
          title: 'Location',
          description: 'Bread!'
        }
      }
    ]
  };

  useEffect(() => {
    //if no map present, create new map with specified properties
    if (!map.current) {
      console.log('no map to display')
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [lng, lat],
        zoom: zoom
      });

      map.current.on('style.load', () => {
        map.current.addSource('durango-trails', {
            'type': 'vector',
            'url': 'mapbox://eteering.ckvraxe0z00iq22nlvb2aowpq-75urt'
        });

        map.current.addLayer({
            'id': 'durango-trails-line',
            'type': 'line',
            //'slot': 'middle',
            'source': 'durango-trails',
            'source-layer': 'Durango_Trails_Database',
            "paint": {
              "line-color": "#AA0000",
              "line-width": 2
            },        
            'layout': {},
        });
    });

  
      map.current.on('load', () => {
        // Add markers
        geojson.features.forEach((feature) => {
          const el = document.createElement('div');
          el.className = 'marker';
          new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(new mapboxgl.Popup().setHTML(`<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`))
            .addTo(map.current);
        });
      });
  
      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, [geojson.features, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}