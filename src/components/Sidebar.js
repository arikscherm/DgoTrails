// Sidebar.js
import React from 'react';
import LocationItem from './LocationItem';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="heading">
        <h1>Our locations</h1>
      </div>
      <div id="listings" className="listings">
        <LocationItem />
        {/* Render other location items here */}
      </div>
    </div>
  );
}

export default Sidebar;
