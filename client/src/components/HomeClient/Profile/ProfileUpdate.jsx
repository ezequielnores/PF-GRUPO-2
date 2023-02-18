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
    surname: "",
    mail: "",
    password: "",
    birthday: new Date(),
    photo: "",
    weight: "",
    height: "",
    bmi: "",
    allergies: "",
    chronicDiseases: "",
    location: "",
    phone: "",
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
    alert("Personal information updated");
    navigate("/HomeClient/Profile");
  };


  // useEffect(() => {
  //   const doctorId = localStorage.getItem("id");
  //   if (doctorId) {
  //     dispatch(doctorGetDetail(doctorId));
  //   }
  // }, []);

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
      <Link to="/HomeClient/Profile">
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
          name="surname"
          label="Last name"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="birthday"
          label="Date of birth"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />

        <TextField
          name="mail"
          label="Mail"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="password"
          label="Password"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="photo"
          label="Photo"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="weight"
          label="Weight"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="height"
          label="Height"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="allergies"
          label="Allergies"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="chronicDiseases"
          label="Chronic diseases"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
        <TextField
          name="location"
          label="Location"
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
          name="bmi"
          label="BMI"
          style={typoTitle}
          gutterBottom
          onChange={(e) => handleChange(e)}
        />
      </Card>
      <Button variant="contained" onClick={(e) => handleSubmit(e)}>
        Update information
      </Button>
      <br/><br/>
    </div>
  );
};

export default ProfileEdit;
