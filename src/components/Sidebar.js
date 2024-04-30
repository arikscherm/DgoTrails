// // Sidebar.js
// import React from 'react';
// import LocationItem from './LocationItem';

// function Sidebar({ dgoTrailData }) {

// // Assign a unique id to each store. You'll use this `id`
// // later to associate each point on the map with a listing
// // in the sidebar.  
// console.log('dgotrails: ', dgoTrailData);

// const trails = dgoTrailData ? dgoTrailData.features : []; // Handle undefined dgoTrailData

// // Only proceed if dgoTrailData is defined
// if (!dgoTrailData) {
//   return <div>Loading...</div>;
// }
// dgoTrailData.features.forEach((trail, i) => {
//   trail.properties.id = i;
// });

//   return (
//     <div className="sidebar">
//       <div className="heading">
//         <h1>Trails Near You!</h1>
//       </div>
//       <div id="listings" className="listings">
//       {dgoTrailData.features[0].map(trail => (
//           <LocationItem key={trail.properties.id} trail={trail} />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;

// Sidebar.js
import React from 'react';
import LocationItem from './LocationItem';

function Sidebar({ dgoTrailData }) {
  //console.log('traildata: ', dgoTrailData);

  // Handle undefined dgoTrailData
  if (!dgoTrailData || !dgoTrailData.features) {
    return <div>Loading...</div>;
  }
console.log('traildata: ', dgoTrailData);
  // Map over the trail features and assign unique ids
  const trails = dgoTrailData.features.map((trail, i) => {
    return {
      ...trail,
      properties: {
        ...trail.properties,
        id: i
      }
    };
  });

  return (
    <div className="sidebar">
      <div className="heading">
        <h1>Trails Near You!</h1>
      </div>
      <div id="listings" className="listings">
        {trails.map(trail => (
          <LocationItem key={trail.properties.id} trail={trail} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;


