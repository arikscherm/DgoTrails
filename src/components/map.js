import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//import Sidebar from './Sidebar';

//move to env file
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const mapboxURL = process.env.REACT_APP_TILESET_URL;

mapboxgl.accessToken = mapboxToken;

export default function Map() {
  //initialize state vars
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-107.8647);
  const [lat, setLat] = useState(37.2857);
  const [zoom, setZoom] = useState(13);
  //const [loading, setLoading] = useState(true);
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

        //setLoading(false);
      });

      //when a trail is clicked, show popup info and zoom
      map.current.on('click', 'durango-trails', (e) => {
        const trailInfoHTML = `
          <h3>Trail Information</h3>
          <p><strong>Trail name:</strong> ${e.features[0].properties.TRAILNAME}</p>
          <p><strong>Length:</strong> ${parseFloat(e.features[0].properties.LENGTH_MILES).toFixed(2)} miles</p>
          <p><strong>Trail system:</strong> ${e.features[0].properties.SYSTEM}</p>
          <p><strong>Trail use:</strong> ${e.features[0].properties.USAGE}</p>
          <p><strong>Difficulty rating:</strong> ${e.features[0].properties.RATING}</p>
        `;

        new mapboxgl.Popup()
          .setLngLat(e.lngLat)
          .setHTML(trailInfoHTML)
          .addTo(map.current);

        if (selectedTrail) {
          // map.current.setFeatureState({ source: 'durango-trails', id: selectedTrail }, { selected: false });
          map.current.setFeatureState(
            { source: 'durango-trails', sourceLayer: 'Durango_Trails_Database', id: selectedTrail },
            { selected: false }
          );
        }

        // map.current.setFeatureState({ source: 'durango-trails', id: e.features[0].id }, { selected: true });
        map.current.setFeatureState(
          { source: 'durango-trails', sourceLayer: 'Durango_Trails_Database', id: e.features[0].id },
          { selected: true }
        );

        //zoom map to where clicked trail is
        map.current.flyTo({
          center: e.lngLat,
          zoom: 15
        });

        setSelectedTrail(e.features[0].id);
      });

      //make trails clickable
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
  }, [lng, lat, zoom, selectedTrail]);

  return (
    <div className="map-wrap">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        {/* {loading ? (
          <div>Loading...</div>
        ) : (
          <Sidebar />
        )} */}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
