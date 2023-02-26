import React from "react";
import { useEffect, useState } from "react";
import { Button, TextField, Typography } from "@mui/material";

const EditPlanForm = ({ plan, handleEditPlan, handleClose, isOpenForEdit }) => {
  const [data, setData] = useState({
    name: plan.name,
    price: plan.price,
    detail: plan.detail,
    durationMonths: plan.durationMonths,
  });

  const handleInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditPlan(plan.id, data);
    handleClose();
  };

  const handlerDetail = (str) => {
    const detailParts = str.split("- ");
    const first = detailParts[0];
    const second = detailParts[1];
    return { first, second };
  };

  return (
    <>
      {isOpenForEdit && (
        <form onSubmit={handleSubmit}>
          <Typography variant="h5" style={{ marginBottom: "2rem" }}>
            Edit plan
          </Typography>

          <TextField
            label="Name"
            name="name"
            value={data.name}
            onChange={handleInput}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Price"
            name="price"
            value={data.price}
            onChange={handleInput}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Detail"
            name="detail"
            value={data.detail}
            onChange={handleInput}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Duration (months)"
            name="durationMonths"
            value={data.durationMonths}
            onChange={handleInput}
            required
            fullWidth
            margin="normal"
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="outlined" onClick={handleClose}>
              CANCEL
            </Button>
            <Button type="submit" variant="outlined">
              SAVE
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default EditPlanForm;
