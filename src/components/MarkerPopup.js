// MarkerPopup.js
import React from 'react';
import ReactDOM from 'react-dom';

function MarkerPopup() {
  return ReactDOM.createPortal(
    <div className="mapboxgl-popup">
      <h3>Sweetgreen</h3>
      <h4>Location Address</h4>
    </div>,
    document.body
  );
}

export default MarkerPopup;
