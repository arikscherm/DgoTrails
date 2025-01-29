import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Sidebar from './Sidebar';

// Initialize vars
const mapboxToken = process.env.REACT_APP_MAPBOX_TOKEN;
const mapboxURL = process.env.REACT_APP_TILESET_URL;
const mapboxVectorLayer = process.env.REACT_APP_VECTOR_LAYER;
mapboxgl.accessToken = mapboxToken;

export default function Map() {
  // Initialize state vars
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-107.8647);
  const [lat, setLat] = useState(37.2857);
  const [zoom, setZoom] = useState(13);
  const [selectedTrail, setSelectedTrail] = useState(null);
  const selectedTrailsRef = useRef([]);

  useEffect(() => {
    // If no current map exists, create a new one, add nav control and geolocator
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12',
        center: [lng, lat],
        zoom: zoom,
      });

      // Add nav controls for user and geolocation
      map.current.addControl(new mapboxgl.NavigationControl());
      const userLocation = map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
          showUserLocation: true,
        })
      );

      //On style load, add layer from Durango trail data
      map.current.on('style.load', () => {
        map.current.addSource('durango-trails', {
          type: 'vector',
          url: mapboxURL,
        });

        map.current.addLayer({
          id: 'durango-trails',
          type: 'line',
          source: 'durango-trails',
          'source-layer': mapboxVectorLayer,
          paint: {
            'line-color': ['case', ['boolean', ['feature-state', 'selected'], false], '#FF0000', '#AA0000'],
            'line-width': 2,
          },
        });
      });

      map.current.on('click', function(e) {

        //Query the map for features at the clicked trail
        var features = map.current.queryRenderedFeatures(e.point, { layers: ['durango-trails'] });
        
        //If no features are found, return early (exit the function)
        if (!features.length) {
            return;
        }
    
        //Check if a layer with the ID 'selectedTrail' already exists
        if (typeof map.current.getSource('selectedTrail') !== "undefined" ){         
            //If it exists, remove the 'selectedTrail' layer
            map.current.removeLayer('selectedTrail');
            
            //Also remove the 'selectedTrail' source
            map.current.removeSource('selectedTrail');   
        }
    
        //Get the first feature from the queried features
        var feature = features[0];
        
        // If selected trail was previously selected, exit function
        const idExists = selectedTrailsRef.current.some(existingTrail => existingTrail.id === feature.id);
        if (idExists) {
          return;
        }

        //Fly to selected trail
        map.current.flyTo({
          center: e.lngLat,
          zoom: 15,
        });

        // Add selected data to trails ref variable
        selectedTrailsRef.current.push(feature.toJSON());

        // Update GeoJSON to include new trail
        const selectedTrailsGeoJSON = {
          type : 'FeatureCollection',
          features : selectedTrailsRef.current
        }

        // If id "selectedTrailsSet" already exists, update source data with new GeoJSON
        if (map.current.getSource("selectedTrailsSet")) {
          map.current.getSource('selectedTrailsSet').setData(selectedTrailsGeoJSON);
        }

        // Otherwise add new source/layer to visualize every trail that has been selected
        else {
          map.current.addSource("selectedTrailsSet", {
            type: "geojson",
            data: selectedTrailsGeoJSON,
          });
          map.current.addLayer({
            "id": "selectedTrailsSet",
            "type": "line",
            "source": "selectedTrailsSet",
            "layout": {
              "line-join": "round",
              "line-cap": "round"
            },
            "paint": {
              "line-color": "khaki",
              "line-width": 8
            }
          });
        }
        
        

        //Selected data into state variable
        setSelectedTrail(feature);
    
        //Add a new source to the map with the ID 'selectedTrail' using GeoJSON data
        map.current.addSource('selectedTrail', {
            "type": "geojson",
            "data": feature.toJSON()
        });
    
        //Add a new layer to the map to visualize the selected trail
        map.current.addLayer({
            "id": "selectedTrail",
            "type": "line",
            "source": "selectedTrail",
            "layout": {
                "line-join": "round", // Defines how lines join
                "line-cap": "round"   // Defines how line ends look
            },
            "paint": {
                "line-color": "yellow", // Color of the line
                "line-width": 8         // Width of the line
            }
        });
    });



      // Make trails clickable
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
  }, [lng, lat, zoom]);


  const calculateTotalMiles = () => {
    return selectedTrailsRef.current.reduce(
      (total, segment) => total + segment.properties.length_miles, 
      0
    );
  }

  const totalMiles = calculateTotalMiles();

  return (
    <div className="map-wrap">
      <Sidebar trail={selectedTrail} totalMiles={totalMiles} />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}