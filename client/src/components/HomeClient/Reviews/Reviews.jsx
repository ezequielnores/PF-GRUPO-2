import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Modal from "react-modal";
import { docrtorGetAll } from "../../../redux/reducers/doctorReducer";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { postComments } from "../../../redux/reducers/commentsReducer";
import { Box, Container, Paper } from "@mui/material";
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
function Reviews() {
  const dispatch = useDispatch();
  const [modalAbierto, setModalAbierto] = useState(false);
  const doctors = useSelector((state) => state.doctor.list);
  const [name, setDoctor] = useState({ doctorId: "", name: "", lastName: "" });
  const [value, setValue] = React.useState(0);
  const patientIdLocal = localStorage.getItem("id");

  useEffect(() => {
    dispatch(docrtorGetAll());
  }, []);

  const handleSelectDoc = (event) => {
    const id = event.target.value;
    const doctor = doctors.find((e) => e.id === id);
    setDoctor({ doctorId: id, name: doctor.name, lastName: doctor.lastName });
  };

  const [fields, setFields] = useState({
    message: "",
    title: "",
  });

  const changeHandler = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    setFields({ ...fields, [property]: value });
  };

  const resetForm = () => {
    setFields({
      title: "",
      message: "",
    });

    setValue(0);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      postComments({
        message: fields.message,
        title: fields.title,
        doctorId: name.doctorId,
        patientId: patientIdLocal,
        doctorName: name.name,
        doctorLastName: name.lastName,
        rating: value,
      })
    );

    setModalAbierto(true);
    
  };

  const closeModal = () => {
    setModalAbierto(false);
    resetForm();
  };

  return (
    




    <Paper
      style={{
        marginLeft: "4px",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "45.5rem",
      }}
    >
      <form onSubmit={submitHandler}>

        <Typography
          variant="button"
          fontSize="2.5rem"
          color="#307196"
          fontWeight="bold"
          style={test}
        >
          Send us a review
        </Typography>
        <Paper
        elevation={6}
        sx={{ p: 4 }}
          style={{
           
            width: "fit-content",
            padding: 50,
            display: "flex",
            flexDirection: "column",
            margin: "auto",
            paddingLeft: 80,
            paddingRight: 150,
          }}
        >
          <InputLabel
            id="demo-simple-select-filled-label"
            sx={{ marginRight: 21 }}
          >
            Select the doctor:{" "}
          </InputLabel>
          <div>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleSelectDoc}
              sx={{ width: 200, marginLeft: 12 }}
              variant="filled"
            >
              <MenuItem value={name} name="date" label="Select"></MenuItem>
              {doctors?.map((doc) => {
                return (
                  <MenuItem value={doc.id}>
                    {doc.name} {doc.lastName}
                  </MenuItem>
                );
              })}
            </Select>
            <Rating
              name="simple-controlled"
              value={value}
              sx={{ marginLeft: 5 }}
              size="large"
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>
          <br />

          <div>
            <InputLabel
              id="demo-simple-select-filled-label"
              sx={{ marginRight: 32.5 }}
            >
              Title:{" "}
            </InputLabel>
            <TextField
              id="filled-basic"
              variant="filled"
              value={fields.title}
              name="title"
              sx={{ marginRight: 11, width: "fit-content" }}
              onChange={changeHandler}
            />
          </div>
          <br />
          <br />
          <div>
            <InputLabel
              id="demo-simple-select-filled-label"
              sx={{ marginRight: 27.8 }}
            >
              Comment:{" "}
            </InputLabel>
            <TextField
              id="filled-multiline-static"
              multiline
              rows={6}
              defaultValue="Default Value"
              variant="filled"
              value={fields.message}
              onChange={changeHandler}
              name="message"
              sx={{ width: 300,marginLeft: 0.5 }}
            />
          </div>
          <br />
          <br />

          <div style={{}}>
          {!name.name ||
          !name.lastName ||
          !doctors.length ||
          !value ||
          !fields.title ||
          !fields.message ? (
            <Button sx={{padding:1, paddingLeft:3, paddingRight:3}} variant="contained" disabled>
              Send
            </Button>
          ) : (
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              sx={{ backgroundColor: "#307196",padding:1, paddingLeft:3, paddingRight:3 }}
              type="submit"
            >
              Send
            </Button>
          )}
          </div>
        </Paper>

      </form>

      



      <Modal isOpen={modalAbierto} onRequestClose={closeModal}>
        <div
          style={{
            border: "solid",
            justifyContent: "center",
            marginTop: "5%",
            borderRadius: 10,
            paddingBottom: 50,
          }}
        >
          <h2
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              color: "#D9D9D9",
              backgroundColor: "#307196",
            }}
          >
            Your comment has been sent, thanks for your review
          </h2>
          <h3 style={{ marginLeft: 5 }}>
            Doctor: {name.name} {name.lastName}
          </h3>
          <h3 style={{ marginLeft: 5 }}>Rating: {value} stars</h3>
          <h3 style={{ marginLeft: 5 }}>Title: {fields.title}</h3>
          <h3 style={{ marginLeft: 5 }}>Comment: {fields.message}</h3>

          <Button
            variant="contained"
            onClick={closeModal}
            style={{ marginLeft: "10%", marginTop: "5%", scale: "1.2",backgroundColor: "#307196" }}
          >
            Cerrar
          </Button>
        </div>
      </Modal>
    </Paper>
  );
}

export default Reviews;
