import React from 'react';

export default function Export({ selectedTrails }) {
    
    const exportGeoJSON = () => {
        const blob = new Blob([JSON.stringify(selectedTrails, null, 2)], { type: 'application/geo+json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'export.geojson';
        link.click();       

    }
    
    return (
      <div className="export-button-container">
        <button onClick={exportGeoJSON} className="export-button">Export!</button>
      </div>
    );
  };

