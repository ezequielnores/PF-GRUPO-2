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

  const IMC = Math.floor(peso / Math.pow(altura2, 2));

  console.log(IMC);

  const data = [
    { name: "IMC", YourIMC: IMC, Low: 18, Normal: 22, High: 28, Obesity: 35 },
  ];

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <Typography variant="button" fontSize="1.5rem" sx={{color:"#42B6C6"}}>
        IMC
      </Typography>
      <BarChart
        width={500}
        height={400}
        data={data}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          minWidth: "2rem",
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
         <Bar dataKey="Low" fill="#F5B7B1" /> 
        <Bar dataKey="YourIMC" fill="#42B6C6" />
        <Bar dataKey="Normal" fill="#ABEBC6" /> 
        <Bar dataKey="High" fill="#F5CBA7" />
        <Bar dataKey="Obesity" fill="#F5B7B1" />
      </BarChart>
    </div>
  );
};

export default GraficIMC;
