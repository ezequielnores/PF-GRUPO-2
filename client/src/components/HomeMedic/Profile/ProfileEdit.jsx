import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
//styles
const padreDiv = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: " center",
  alignItems: "center",
};
const carde = {
  width: "30rem",
  padding: "1rem",
  textAlign: "start",
  marginBottom: "2rem",
};
const typoTitle = {
  fontSize: "20px",
  fontWeight: "bold",
  marginTop: "5px",
  marginBottom: "10px",
  width: "100%",
};

const ProfileEdit = () => {
  // const detailPatient = useSelector((state) => state.patientDetail);
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    name: "",
    lastName: "",
    mail: "",
    clinicMail: "",
    phone: "",
    birthdate: "",
    image: "",
  });
  const handleChange = (evento) => {
    evento.preventDefault();
    setInfo({
      ...info,
      [evento.target.name]: evento.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(putPatient(info))
    alert("Information updated");
    navigate("/HomeMedic/Profile");
  };
  console.log(info);
  return (
    <div style={padreDiv}>
      <Typography
        variant="h2"
        gutterBottom
        style={{
          color: "#147bf4",
          fontWeight: "bold",
          fontSize: "2.5rem",
        }}
      >
        Edit information
      </Typography>
      <Link to="/HomeMedic/Profile">
        <Button underline="hover" color="inherit">
          Back
        </Button>
      </Link>
      <Card style={carde}>
        <TextField
          name="name"
          label="Name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="lastName"
          label="Last name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="birthdate"
          label="Date of birth"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="phone"
          label="Phone"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="clinicMail"
          label="Clinic email"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="mail"
          label="Email"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="image"
          label="Image"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
      </Card>
      <Button variant="contained" onClick={(e) => handleSubmit(e)}>
        Update information
      </Button>
    </div>
  );
};

export default ProfileEdit;
