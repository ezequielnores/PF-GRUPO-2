import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Medida 1', weight: 60, height: 1.70 },
  { name: 'Medida 2', weight: 62, height: 1.70 },
  { name: 'Medida 3', weight: 63, height: 1.70 },
  { name: 'Medida 4', weight: 65, height: 1.70 },
  { name: 'Medida 5', weight: 68, height: 1.70 },
  { name: 'Medida 6', weight: 70, height: 1.70 },
  { name: 'Medida 7', weight: 72, height: 1.70 },
];
  function calculateIMC(weight, height) {
    return weight / Math.pow(height, 2);
  }

  const imcData = data.map((d) => ({
    imc: calculateIMC(d.weight, d.height),
  }));


  

  
  function GraficIMC() {
    return (
      <LineChart
        width={600}
        height={300}
        data={imcData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" label={{ value: 'Peso', position: 'insideBottomRight' }} />
        <YAxis label={{ value: 'Altura', angle: -90, position: 'insideLeft' }} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="imc" stroke="red" activeDot={{ r: 8 }} />
      </LineChart>
    );
  }

  
  export default GraficIMC;
