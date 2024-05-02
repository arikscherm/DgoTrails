import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Sidebar from './Sidebar';

//initialize vars
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const mapboxURL = process.env.REACT_APP_TILESET_URL;
mapboxgl.accessToken = mapboxToken;

export default function Map() {
  // initialize state vars
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-107.8647);
  const [lat, setLat] = useState(37.2857);
  const [zoom, setZoom] = useState(13);
  const [selectedTrail, setSelectedTrail] = useState(null);

  useEffect(() => {
    //if no current map exists, create a new one, add nav control and geolocator
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [lng, lat],
        zoom: zoom
      });

      //add nav controls for user and geolocation
      map.current.addControl(new mapboxgl.NavigationControl());
      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        })
      );

      //on style load, add layer from durango trail data
      map.current.on('style.load', () => {
        map.current.addSource('durango-trails', {
          type: 'vector',
          url: mapboxURL
        });

        map.current.addLayer({
          'id': 'durango-trails',
          'type': 'line',
          'source': 'durango-trails',
          'source-layer': 'Durango_Trails_Database',
          'paint': {
            'line-color': ['case',
              ['boolean', ['feature-state', 'selected'], false],
              '#FF0000',
              '#AA0000'
            ],
            'line-width': 2
          }
        });
      });
    map.current.on('click', 'durango-trails', (e) => {

      // Get all the features (trails)
      const features = e.features;
    
      // Get the clicked trail feature
      const clickedTrail = features[0];
      console.log('clicked trail: ', clickedTrail);
    
      // Highlight the clicked trail
      if (clickedTrail) {
        setSelectedTrail(clickedTrail);
        map.current.flyTo({
          center: e.lngLat,
          zoom: 15
        });
        map.current.setFeatureState(
          { source: 'durango-trails', sourceLayer: 'Durango_Trails_Database', id: clickedTrail.id },
          { selected: true }
        );
      }
    });

      // make trails clickable
      map.current.on('mouseenter', 'durango-trails', () => {
        map.current.getCanvas().style.cursor = 'pointer';
      });

      map.current.on('mouseleave', 'durango-trails', () => {
        map.current.getCanvas().style.cursor = '';
      });

      map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
      });
    }
  }, [selectedTrail, lng, lat, zoom]);

  return (
    <div className="map-wrap">
      <Sidebar trail={selectedTrail} />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}