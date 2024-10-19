import React from 'react';
   import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
   import { scaleLinear } from "d3-scale";
   import { Typography, Box } from '@mui/material';

   const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-10m.json";


   const WorldMap = ({ data }) => {
     const countryData = data.reduce((acc, item) => {
       if (item.country) {
         if (!acc[item.country]) {
           acc[item.country] = { count: 0, intensity: 0 };
         }
         acc[item.country].count += 1;
         acc[item.country].intensity += item.intensity || 0;
       }
       return acc;
     }, {});

     const maxIntensity = Math.max(...Object.values(countryData).map(d => d.intensity / d.count));
     const colorScale = scaleLinear().domain([0, maxIntensity]).range(["#CFD8DC", "#01579B"]);

     return (
       <Box>
         <Typography variant="h6" align="center" gutterBottom>
           Global Intensity Distribution
         </Typography>
         <ComposableMap projectionConfig={{ scale: 140 }}>
           <Geographies geography={geoUrl}>
             {({ geographies }) =>
               geographies.map((geo) => {
                 const d = countryData[geo.properties.name];
                 return (
                   <Geography
                     key={geo.rsmKey}
                     geography={geo}
                     fill={d ? colorScale(d.intensity / d.count) : "#EEE"}
                     stroke="#FFF"
                     strokeWidth={0.5}
                   />
                 );
               })
             }
           </Geographies>
         </ComposableMap>
       </Box>
     );
   };

   export default WorldMap;