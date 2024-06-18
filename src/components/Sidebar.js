import React from 'react';

export default function Sidebar({ trail }) {
  return (
    <div className="sidebar">
      <h3>Trail Information</h3>
      {trail && (
        <>
        <p><strong>Trail name:</strong> {trail.properties.TRAILNAME}</p>
        <p><strong>Length:</strong> {parseFloat(trail.properties.LENGTH_MILES).toFixed(2)} miles</p>
        <p><strong>Status: </strong>Open</p>
        <p><strong>Trail system:</strong> {trail.properties.SYSTEM}</p>
        <p><strong>Trail use:</strong> {trail.properties.USAGE}</p>
        <p><strong>Difficulty rating:</strong> {trail.properties.RATING}</p>
        <p><strong>ID:</strong> {trail.properties.OBJECTID}</p>

      </>
      )}
    </div>
  );
};