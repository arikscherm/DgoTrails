import React from 'react';

export default function Sidebar({ trail, totalMiles }) {
  return (
    <div className="sidebar">
      <h3>Trail Information</h3>
      {trail && (
        <>
        <p><strong>Trail Name:</strong> {trail.properties.name_left}</p>
        <p><strong>Length:</strong> {parseFloat(trail.properties.length_miles).toFixed(2)} miles</p>
        <p><strong>Status: </strong>Open</p>
        <p><strong>Trail System:</strong> {trail.properties.name_right}</p>
        <p><strong>Bike:</strong> {trail.properties.bicycle}</p>
        <p><strong>Website:</strong> {trail.properties.website}</p>
        <p><strong>ID:</strong> {trail.properties.osmid}</p>

        <p><strong>Total Trip Length:</strong> {parseFloat(totalMiles).toFixed(2)}</p>

      </>
      )}
    </div>
  );
};