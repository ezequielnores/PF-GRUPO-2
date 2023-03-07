
import { Typography } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const GraficIMC = () => {
  const patientDetail = useSelector((state) => state.patient.detail);

  const peso = patientDetail?.weight;

  const altura = patientDetail?.height;

  const altura2 = altura / 100;

  const IMC =Math.floor( peso / Math.pow(altura2, 2));

  console.log(IMC);

  const data = [
    { name: "IMC", YourIMC: IMC, Low: 18, Normal: 22, High: 28, Obesity: 35 },
  ];

  return (
    <div style={{ height: "36.35rem" }}>
      <Typography variant="button" fontSize="1.5rem">
        Control your IMC
      </Typography>
      <BarChart
        width={600}
        height={400}
        data={data}
        style={{ marginTop: "2rem" }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Low" fill="#F1948A" />
        <Bar dataKey="YourIMC" fill="#5D6D7E" />
        <Bar dataKey="Normal" fill="#82E0AA" />
        <Bar dataKey="High" fill="#F0B27A" />
        <Bar dataKey="Obesity" fill="#F1948A" />
      </BarChart>
      
    </div>
  );
};

export default GraficIMC;
